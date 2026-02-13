from fastapi import APIRouter
from backend.app.api.endpoints import health, chat, vision

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(vision.router, prefix="/vision", tags=["vision"])
