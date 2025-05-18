from fastapi import HTTPException
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer
import torch
import os
from fastapi import APIRouter

router = APIRouter()

# Define input schema
class TranslationRequest(BaseModel):
    text: str

# Path to local model folder
model_dir = "./model"

# Load model and tokenizer from local folder
try:
    if not os.path.exists(model_dir):
        raise Exception(f"Model directory {model_dir} not found")
    tokenizer = MarianTokenizer.from_pretrained(model_dir)
    model = MarianMTModel.from_pretrained(model_dir)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    model.eval()
except Exception as e:
    raise Exception(f"Failed to load model or tokenizer: {str(e)}")

@router.post("/translate", summary="Translate text using the local MarianMT model")
async def translate(request: TranslationRequest):
    try:
        # Tokenize input text
        inputs = tokenizer(request.text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        # Generate translation
        with torch.no_grad():
            translated = model.generate(**inputs)
        
        # Decode output
        translation = tokenizer.decode(translated[0], skip_special_tokens=True)
        return {"translation": translation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")
@router.get("/translate_debug")
async def translate_debug():
    return {"cuda_available": torch.cuda.is_available(), "device": str(model.device)}