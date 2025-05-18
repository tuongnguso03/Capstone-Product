from fastapi import APIRouter, Query
import pandas as pd
from typing import List, Dict
import os

router = APIRouter()

# Path to the CSV file
CSV_FILE = "data/dictionary.csv"

@router.get("/dictionary", response_model=List[Dict])
async def get_dictionary(
    page: int = Query(1, ge=1),  # Page number, minimum 1
    per_page: int = Query(50, ge=1, le=2000)  # Items per page, max 100
):
    if not os.path.exists(CSV_FILE):
        return {"error": "CSV file not found"}

    # Read only the required rows using pandas
    skip = (page - 1) * per_page
    try:
        df = pd.read_csv(CSV_FILE, skiprows=range(1, skip + 1), nrows=per_page)
        if df.empty:
            return []
        return df.to_dict(orient="records")
    except Exception as e:
        return {"error": f"Failed to read CSV: {str(e)}"}

@router.get("/dictionary/search", response_model=List[Dict])
async def search_dictionary(
    q: str = Query(..., min_length=1),  # Search query, required
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100)
):
    if not os.path.exists(CSV_FILE):
        return {"error": "CSV file not found"}

    # Read CSV in chunks to handle large files
    results = []
    chunk_size = 1000  # Adjust based on your dataset size
    for chunk in pd.read_csv(CSV_FILE, chunksize=chunk_size):
        # Case-insensitive search in 'word' and 'definition' columns
        mask = (chunk['word'].str.contains(q, case=False, na=False) |
                chunk['definition'].str.contains(q, case=False, na=False))
        results.append(chunk[mask])
    
    # Combine results
    result_df = pd.concat(results) if results else pd.DataFrame()
    
    # Apply pagination
    start = (page - 1) * per_page
    end = start + per_page
    paginated_df = result_df.iloc[start:end]
    
    return paginated_df.to_dict(orient="records")