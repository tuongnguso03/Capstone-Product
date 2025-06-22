from fastapi import APIRouter, HTTPException, Depends, Request # Added Request
from pydantic import BaseModel, Field
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
from typing import Dict, Any, Optional # Added Optional

load_dotenv()
# --- Firebase Initialization ---
# This section can be kept here or moved to your main application's entry point (e.g., main.py)
# If moved, ensure Firebase is initialized before this router is loaded.
SERVICE_ACCOUNT_KEY = os.getenv("SERVICE_ACCOUNT_KEY")

# Global variable to hold the initialized Firebase app, to avoid re-initialization if this module is reloaded
_firebase_app_initialized = False
cred = None # Define cred in a broader scope

if not firebase_admin._apps:
    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
        firebase_admin.initialize_app(cred)
        _firebase_app_initialized = True
        print("Firebase Admin SDK initialized successfully in router module.")
    except ValueError as e: # Catches if already initialized by another part of the app
        if "already initialized" in str(e).lower():
            print("Firebase Admin SDK was already initialized.")
            _firebase_app_initialized = True
            # Attempt to get the default app's credential if needed, or assume db is available
            if firebase_admin.get_app().credential: # Check if default app exists and has a credential
                 cred = firebase_admin.get_app().credential # Get existing credential
        else:
            print(f"Error initializing Firebase Admin SDK during ValueError: {e}")
            # cred remains None
    except FileNotFoundError:
        print(f"Service account key file not found at: {SERVICE_ACCOUNT_KEY_PATH}. Firebase Admin SDK not initialized.")
        # cred remains None
    except Exception as e:
        print(f"An unexpected error occurred during Firebase Admin SDK initialization: {e}")
        # cred remains None
else:
    # If firebase_admin._apps is not empty, it means an app (default or named) is already initialized.
    print("Firebase Admin SDK was already initialized (detected by firebase_admin._apps).")
    _firebase_app_initialized = True
    # Try to get the default app's credential if cred is still None
    if not cred and firebase_admin.get_app():
        app_instance = firebase_admin.get_app()
        if app_instance.credential:
            cred = app_instance.credential


db = firestore.client() if _firebase_app_initialized and firebase_admin._apps else None # Ensure app is initialized before getting client
if db:
    print(f"Firestore client obtained in router: {db}")
else:
    print("Failed to obtain Firestore client in router. Firebase might not be initialized or initialization failed.")


# --- Pydantic Model for Review Data ---
class Review(BaseModel):
    src: str = Field(..., example="Hello")
    tgt: str = Field(..., example="Xin chào")
    rate: int = Field(..., ge=1, le=5, example=5) # Rating between 1 and 5

# --- FastAPI Router ---
# Initialize an APIRouter instance
router = APIRouter(
    prefix="/reviews",  # Optional: sets a prefix for all routes in this router
    tags=["Reviews"]    # Optional: groups routes in the OpenAPI docs
)

# --- Dependency to get Firestore client ---
async def get_firestore_client() -> firestore.Client: # Added type hint for clarity
    if not _firebase_app_initialized or not db:
        print("Firestore client is not available. Firebase SDK might not have been initialized correctly.")
        raise HTTPException(status_code=503, detail="Firestore service is not available. Initialization failed.")
    return db

# --- API Endpoint to Submit a Review ---
@router.post("/", response_model=Dict[str, Any])
def create_review(
    review: Review,
    request: Request, # Added Request parameter
    firestore_client: firestore.Client = Depends(get_firestore_client)
):
    """
    Receives review data and stores it in Firestore, including the sender's IP address.

    - **src**: Source text of the review/translation.
    - **tgt**: Target text (e.g., translation) of the review.
    - **rate**: Integer rating from 1 to 5.
    """
    client_ip: Optional[str] = request.client.host if request.client else None
    print(f"Received review submission from IP: {client_ip}")

    try:
        doc_ref = firestore_client.collection("reviews").document()
        review_data = {
            "src": review.src,
            "tgt": review.tgt,
            "rate": review.rate,
            "timestamp": firestore.SERVER_TIMESTAMP,
            "ip_address": client_ip # Added client IP address
        }
        doc_ref.set(review_data)
        print(f"Review stored successfully with ID: {doc_ref.id}, Data: {review_data}")
        return {"status": "success", "review_id": doc_ref.id, "message": "Review submitted successfully."}
    except Exception as e:
        print(f"Error submitting review: {e}")
        # import traceback
        # print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"An error occurred while submitting the review: {str(e)}")