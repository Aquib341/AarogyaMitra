import os
import google.generativeai as genai
from PIL import Image
import io
from fastapi import UploadFile

from backend.app.core.config import get_settings

class VisionService:
    def __init__(self):
        # Configure Gemini
        settings = get_settings()
        api_key = settings.GOOGLE_API_KEY
        
        # Check for placeholder or missing key
        if not api_key or api_key == "YOUR_GEMINI_API_KEY_HERE":
            self.model = None
            self.text_model = None
            print("Warning: GOOGLE_API_KEY not found or is default. Vision service will not function.")
        else:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.text_model = genai.GenerativeModel('gemini-1.5-flash')

    async def analyze_image(self, file: UploadFile) -> dict:
        if not self.model:
            return {"error": "Vision service not configured. Please set a valid GOOGLE_API_KEY in .env file."}

        try:
            # Read file bytes
            contents = await file.read()
            image = Image.open(io.BytesIO(contents))

            # Prompt for navigation/tour guide mode
            prompt = (
                "You are a smart, real-time vision assistant for a visually impaired person. "
                "Analyze the scene instantly and provide a structured, spoken-style response for safe navigation.\n\n"
                "Focus on these 4 priorities:\n"
                "1. **Navigation Path**: Is the path clear? Give direct commands (e.g., 'Walk forward typically', 'Stop, obstacle ahead', 'Veer left').\n"
                "2. **Obstacles & Hazards**: Identify objects in the path (e.g., 'Chair in front', 'Stairs descending 5 feet away').\n"
                "3. **People**: Detect if any persons are present, their approximate location, and action (e.g., 'A person standing to your right').\n"
                "4. **Scene & Text**: Briefly describe where we are and read any critical signs (e.g., 'Office corridor', 'Exit sign ahead').\n\n"
                "Keep the response concise, prioritizing safety first. "
                "Use natural language suitable for text-to-speech."
            )
            
            response = await self.model.generate_content_async([prompt, image])
            
            return {
                "description": response.text,
                "objects": [], # Could parse if needed, but description covers it
                "text_content": "" 
            }
        except Exception as e:
            print(f"Vision Service Error: {e}")
            return {"error": f"AI Processing Failed: {str(e)}"}

    async def simplify_text(self, text: str) -> dict:
        if not self.text_model:
             return {"error": "API Key missing"}
        
        try:
            prompt = f"Simplify the following text for easier reading/understanding:\n\n{text}"
            response = await self.text_model.generate_content_async(prompt)
            return {"simplified_text": response.text}
        except Exception as e:
            return {"error": str(e)}

vision_service = VisionService()
