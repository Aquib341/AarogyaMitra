
# Psychologist & Mental Health Knowledge Base

PSYCHOLOGIST_DEFINITION = """
A psychologist is a professional who practices psychology and studies mental states, perceptual, cognitive, emotional, and social processes and behavior. 
Their work often involves the experimentation, observation, and interpretation of how individuals relate to each other and to their environments.
Psychologists usually acquire a bachelor's degree in psychology, followed by a master's degree or doctorate in psychology. 
Key distinctions:
- **Psychologists**: Focus on psychotherapy and treating emotional and mental suffering in patients with behavioral intervention. They generally do not prescribe medication (unless specific qualifications are met in certain jurisdictions).
- **Psychiatrists**: Are medical doctors who prescribe medication and focus on the biological aspects of mental health.
"""

THERAPEUTIC_TECHNIQUES = {
    "CBT": {
        "name": "Cognitive Behavioral Therapy (CBT)",
        "description": "A structured, goal-oriented form of talk therapy that focuses on the intricate connection between thoughts, emotions, and behaviors.",
        "key_concepts": [
            "Cognitive Restructuring/Reframing: Recognizing and reevaluating negative thought patterns.",
            "Mindfulness: Disengaging from ruminating on negative thoughts and focusing on the present.",
            "Behavioral Activation: Identifying and scheduling engaging or helpful behaviors.",
            "Problem-Solving: Breaking down complex problems into manageable steps."
        ],
        "response_style": "Help the user identify the 'thought' causing the distress and gently challenge it or suggest a behavioral chang."
    },
    "Active Listening": {
        "name": "Active Listening",
        "description": "A deep, empathetic engagement with the client's experience, going beyond simply hearing words.",
        "key_concepts": [
            "Validation: Acknowledging the user's feelings (e.g., 'It sounds like you are feeling very overwhelmed right now.').",
            "Reflective Listening: Paraphrasing what the user said to ensure understanding.",
            "Non-Judgmental Space: Creating a safe environment without criticism.",
            "Empathy: Responding with compassion."
        ],
        "response_style": "Use phrases like 'I hear that...', 'It makes sense that you feel...', 'Tell me more about...'"
    },
    "Grounding": {
        "name": "Grounding Techniques",
        "description": "Techniques to help detach from emotional pain (e.g., anxiety, anger, sadness, self-harm).",
        "methods": [
            "5-4-3-2-1 Technique: Acknowledge 5 things you see, 4 you can touch, 3 you hear, 2 you can smell, 1 you can taste.",
            "Deep Breathing: Box breathing or 4-7-8 breathing."
        ],
        "response_style": "Guide the user through a specific grounding exercise step-by-step."
    }
}

EMPATHY_TEMPLATES = [
    "I can hear how difficult this is for you. You are not alone in this.",
    "It takes a lot of courage to share that. I am here to listen.",
    "Your feelings are valid. Let's work through this together.",
    "I care about your well-being. Let's take a moment to breathe.",
    "It sounds like you're carrying a heavy burden right now."
]

DISCLAIMER = "Note: I am an AI trained to provide support based on psychological principles, but I am not a licensed professional. If you are in crisis, please contact emergency services."
