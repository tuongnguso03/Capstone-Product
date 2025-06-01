from fastapi import HTTPException
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer, AutoTokenizer, AutoModelForSeq2SeqLM

import torch
import os
from fastapi import APIRouter
import asyncio

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

    en_ba_model_dir = "21uyennt/sixtyfour"
    en_ba_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-vi")
    en_ba_model = MarianMTModel.from_pretrained(en_ba_model_dir)
    en_ba_model.to(device)
    en_ba_model.eval()
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


@router.post("/translate_en_ba", summary="Translate text En-Ba")
async def translate_en_ba(request: TranslationRequest):
    try:
        input_ids = en_ba_tokenizer.encode(request.text, return_tensors="pt")
        output_ids = en_ba_model.generate(input_ids)
        ba_text = en_ba_tokenizer.batch_decode(output_ids, skip_special_tokens=True)
        return {"translation": ba_text[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")
    
@router.get("/translate_debug")
async def translate_debug():
    return {"cuda_available": torch.cuda.is_available(), "device": str(model.device)}