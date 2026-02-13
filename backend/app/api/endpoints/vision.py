from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from backend.app.services.vision_service import vision_service

router = APIRouter()

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    result = await vision_service.analyze_image(file)
    if "error" in result:
        # If API key is missing, we might want to return a mock response for testing if requested,
        # but for now we'll return the error or a 503
        if "Missing API Key" in result["error"]:
             raise HTTPException(status_code=503, detail="Vision service unconfigured")
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result

@router.post("/simplify")
async def simplify_text(text: str = Form(...)):
    result = await vision_service.simplify_text(text)
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result
