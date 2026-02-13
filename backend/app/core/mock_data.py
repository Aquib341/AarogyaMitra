# Mock database of health images
HEALTH_IMAGES = {
    "headache": "https://images.unsplash.com/photo-1544116462-8417d477813a?w=800&auto=format&fit=crop&q=60", # Placeholder for brain/headache
    "fever": "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&auto=format&fit=crop&q=60", # Thermometer
    "stomach": "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60", # Stomach/anatomy
    "default": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60" # Doctor/Medical generic
}

# Mock multilingual responses
MULTILINGUAL_RESPONSES = {
    "hi": {
        "greeting": "नमस्ते! मैं आरोग्यमित्र हूँ। मैं आपकी कैसे सहायता कर सकता हूँ?",
        "disclaimer": "अस्वीकरण: मैं एक एआई हूँ, डॉक्टर नहीं।",
        "default": "मुझे खेद है, मुझे अभी सर्वर से कनेक्ट करने में समस्या हो रही है."
    },
    "es": {
        "greeting": "¡Hola! Soy AarogyaMitra. ¿Cómo puedo ayudarte hoy?",
        "disclaimer": "Descargo de responsabilidad: Soy una IA, no un médico.",
        "default": "Lo siento, tengo problemas para conectarme al servidor."
    },
    "fr": {
        "greeting": "Bonjour! Je suis AarogyaMitra. Comment puis-je vous aider?",
        "disclaimer": "Avis de non-responsabilité: Je suis une IA, pas un médecin.",
        "default": "Désolé, j'ai du mal à me connecter au serveur."
    }
}
