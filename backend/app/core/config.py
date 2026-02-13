from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    APP_NAME: str = "AarogyaMitra API"
    API_V1_STR: str = "/api/v1"
    
    # Placeholder vector DB path
    VECTOR_DB_PATH: str = "faiss_index"
    
    # API Keys
    GOOGLE_API_KEY: str = None

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
