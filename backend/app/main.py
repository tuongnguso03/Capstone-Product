from fastapi import FastAPI
from routers import translate, baendict, review
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MarianMT Translation API", description="API for translating text using a pretrained MarianMT model")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend URL (e.g., Render.com frontend URL)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translate.router)
app.include_router(baendict.router)
app.include_router(review.router)


@app.get("/health", summary="Check API health")
async def health():
    return {"status": "healthy"}