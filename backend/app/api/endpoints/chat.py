from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from backend.app.services.rag_service import rag_service

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = []
    image_url: Optional[str] = None

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        if not request.messages:
             raise HTTPException(status_code=400, detail="No messages provided")

        # Convert Pydantic models to list of dicts for the service
        messages_dicts = [msg.dict() for msg in request.messages]

        result = await rag_service.generate_response(messages_dicts, request.language)
        
        return ChatResponse(
            response=result["response"],
            sources=result["sources"],
            image_url=result["image_url"]
        )
            
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
