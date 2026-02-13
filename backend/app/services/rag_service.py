from typing import List, Optional, Dict
from backend.app.core.mock_data import MULTILINGUAL_RESPONSES
from backend.app.core.psychologist_data import PSYCHOLOGIST_DEFINITION, THERAPEUTIC_TECHNIQUES, EMPATHY_TEMPLATES, DISCLAIMER as PSYCH_DISCLAIMER
from backend.app.core.safety_data import TEMPLATES as SAFETY_TEMPLATES, RISK_KEYWORDS, HELPLINES, SAFETY_DISCLAIMER
import random

class RAGService:
    def __init__(self):
        # Placeholder for vector store
        self.vector_store = None

    def _assess_risk(self, text: str) -> Dict:
        """
        Determines risk level based on keywords and returns {level, template_id, action}.
        Levels: imminent, high, moderate, low, none.
        """
        text = text.lower()
        
        # 1. Imminent Risk (Plan + Means + Timeline)
        # Simplified keyword matching for strict triggers
        if any(k in text for k in RISK_KEYWORDS["imminent"]):
            return {"level": "imminent", "template": "T002", "alert": True}
        
        # 2. High Risk (Suicidal Ideation)
        if any(k in text for k in RISK_KEYWORDS["high"]):
            # Check if it's a "plan" specific query
            if "plan" in text or "method" in text:
                 return {"level": "imminent", "template": "T001", "alert": True}
            return {"level": "high", "template": "T004", "alert": True}

        # 3. Self Harm
        if any(k in text for k in RISK_KEYWORDS["self_harm"]):
             return {"level": "high", "template": "T005", "alert": True}
             
        # 4. Substance
        if any(k in text for k in RISK_KEYWORDS["substance"]):
             return {"level": "moderate", "template": "T006", "alert": False}

        return {"level": "none", "template": None, "alert": False}

    async def generate_response(self, messages: List[dict], language: str = "en") -> Dict:
        """
        Generates a professional, text-only response (Mock Mode).
        Supports English, Hindi, Hinglish, Marathi, Bengali, Tamil (Mock). 
        Formatting: Plain text (No markdown **).
        """
        if not messages:
            return {"response": "No messages provided.", "image_url": None, "sources": []}

        last_message = messages[-1].get("content", "").lower()
        
        # --- 1. STRICT SAFETY LAYER (Deterministic) ---
        risk_assessment = self._assess_risk(last_message)
        
        if risk_assessment["level"] in ["imminent", "high"]:
            template_id = risk_assessment["template"]
            template_data = SAFETY_TEMPLATES.get(template_id)
            
            response_text = template_data["text"]
            
            # Append local helplines
            helpline_text = "\n\nCRISIS RESOURCES:\n"
            if language == "hi" or "india" in last_message: # Simple locale check
                 for name, num in HELPLINES["India"].items():
                     helpline_text += f"- {name}: {num}\n"
            else:
                 for name, num in HELPLINES["US"].items():
                     helpline_text += f"- {name}: {num}\n"
            
            return {
                "response": response_text + helpline_text,
                "image_url": None,
                "sources": ["Safety Protocol", "Tele-MANAS"],
                "alert": True # Signal frontend to show red border
            }
        
        # --- End Safety Layer ---

        # 2. Language Detection Override (Hinglish/Hindi/Others detection)
        hinglish_keywords = ["hai", "kru", "kya", "kaise", "batao", "mujhe", "bukhar", "dard", "main", "kaisa", "sirdard", "tension", "exam"]
        psych_keywords = ["depressed", "anxiety", "sad", "lonely", "stress", "worry", "panic", "fear", "scared", "hopeless", "mental", "brain", "emotion"]
        
        # Simple keyword matching for other languages (Mock)
        is_marathi = any(k in last_message for k in ["ahe", "kay", "kasa", "dukh"])
        is_bengali = any(k in last_message for k in ["hobe", "kemon", "jwar"])
        is_tamil = any(k in last_message for k in ["irukku", "enna", "vali"])
        is_hinglish = any(k in last_message for k in hinglish_keywords)
        is_psych_query = any(k in last_message for k in psych_keywords)
        
        if is_marathi:
            detected_lang = "mr"
        elif is_bengali:
            detected_lang = "bn"
        elif is_tamil:
            detected_lang = "ta"
        elif is_hinglish or language == "hi":
            detected_lang = "hi" 
        else:
            detected_lang = language

        # 3. Smart Mock Logic
        response_text = ""
        sources = ["WHO Guidelines", "Verified Psychology Protocols"]
        
        # Intro - Clean text, no markdown
        intro_en = random.choice(EMPATHY_TEMPLATES)
        intro_hi = "Main samajh sakta hoon ki yeh pareshani wala ho sakta hai. Ek AI hone ke naate, main kuch sujhaav de sakta hoon:"

        # Detect intent
        # --- EXAM STRESS SCENARIO (Comprehensive) ---
        if "exam" in last_message or "stress" in last_message or "tension" in last_message or "padhai" in last_message:
             if detected_lang == "hi":
                 response_text = "Main sun raha hoon. Exam ka stress bahut aam hai aur ise sambhala ja sakta hai. Chaliye ise shanti se handle karte hain.\n\nTurant Rahat (Quick Relief):\n1. Gehri Saans (Deep Breathing): 4 second saans lein, 4 second rokein, 6 second chhodein. Ise 5 bar karein.\n2. Grounding: Apne aas-paas 5 cheezein dekhein aur unka naam lein. Yeh dimaag ko shant karta hai.\n\nExam ke liye Sujhaav:\n- Nayi cheezein padhna band karein. Sirf revise karein.\n- Kam se kam 6-7 ghante ki neend lein. Yeh yaadakaasht (memory) ke liye zaroori hai.\n- Khud se kahein: 'Meri body mujhe perform karne ke liye taiyar kar rahi hai.'\n\nAap akele nahi hain. Aapne jitna padha hai, vah kaafi hai. Pani piyein aur thoda aaram karein."
             else:
                 response_text = "I hear you. Stress is very common and manageable. Let's handle this calmly.\n\nQuick Relief (Right Now):\n1. Slow Breathing: Inhale for 4s, hold for 4s, exhale for 6s. Repeat 5 times.\n2. Grounding: Name 5 things you see around you. This lowers stress hormones immediately.\n\nExam Strategy:\n- Stop heavy studying now. Only light revision of headings/formulas.\n- Sleep is non-negotiable (6-7 hours) to lock in your memory.\n- Psychological Trick: Instead of 'I am stressed', tell yourself 'My body is preparing me to perform.'\n\nRemember: Stress does not erase memory, it just blocks it temporarily. Calm breathing unlocks it. You have done enough."

        # --- HEADACHE ---
        elif "headache" in last_message or "sir dard" in last_message or "sar dard" in last_message or "sirdard" in last_message:
            if detected_lang == "hi":
                response_text = f"{intro_hi}\n\n'Sir Dard' (Headache) aksar tanav (stress), pani ki kami (dehydration) ya thakan ke karan hota hai.\n\nSujhaav (Recommendations):\n1. Pani piyein: Sharir ko hydrated rakhein.\n2. Aaram karein: Shant aur kam roshni wale kamre mein let jayein.\n3. Tanav kam karein: Gehri saans lene ka prayas karein.\n\nYadi dard bahut tez hai ya lagatar bana rehta hai, toh kripya kisi doctor se sampark karein."
            else:
                response_text = "Headaches are commonly caused by stress, dehydration, or eye strain.\n\nProfessional Advice:\n1. Hydration: Drink plenty of water immediately.\n2. Rest: Lie down in a quiet, darkened room to reduce sensory load.\n3. Relaxation: Try stress-reduction techniques like deep breathing.\n\nIf the headache is severe or persists, I strongly recommend consulting a healthcare provider."
        
        # --- PSYCHOLOGIST MODE ---
        elif is_psych_query:
            if detected_lang == "hi":
                 response_text = f"{intro_hi}\n\nMain aapki baat sun raha hoon. Yeh mehsus karna valid hai.\n\nKuch takneekein jo madad kar sakti hain:\n1. **{THERAPEUTIC_TECHNIQUES['Active Listening']['name']}**: Apni bhavnaon ko bina judge kiye samjhein.\n2. **{THERAPEUTIC_TECHNIQUES['Grounding']['name']}**: Agar aap panic feel kar rahe hain, to box breathing try karein (4 sec in, 4 sec hold, 4 sec out).\n\nAap chahein to aur vistar mein bata sakte hain."
            else:
                 technique = random.choice(list(THERAPEUTIC_TECHNIQUES.values()))
                 response_text = f"{intro_en}\n\n{technique['response_style']}\n\nStrategy: **{technique['name']}**\n{technique['description']}\n\nTry this: {technique['key_concepts'][0]}"
        
        # --- FEVER ---
        elif "fever" in last_message or "bukhar" in last_message:
            if detected_lang == "hi":
                response_text = f"{intro_hi}\n\n'Bukhar' (Fever) aamtaur par sharir dwara kisi infection se ladne ka sanket hota hai.\n\nDekhbhaal ke upay (Care Instructions):\n1. Hydration: Bharpoor pani aur taral padarth piyein.\n2. Aaram: Sharir ko theek hone ke liye pura samay dein.\n3. Taapmaan: Yadi bukhar 102°F (39°C) se upar hai, toh doctor se salah lein.\n\nKripya apni sthiti par nazar rakhein aur yadi lakshan bigadte hain, toh turant chikitsa sahayata lein."
            else:
                response_text = f"{intro_en}\n\nFever is typically a physiological response to an infection or inflammation.\n\nClinical Care Suggestions:\n1. Hydration: Maintain fluid intake to prevent dehydration.\n2. Rest: Ensure adequate rest to allow your immune system to function effectively.\n3. Monitoring: Monitor your body temperature regularly.\n\nPlease Note: If your temperature exceeds 102°F (39°C) or persists for more than 3 days, seek professional medical attention."
        
        else:
            # Generic Response
            if detected_lang == "hi":
                 response_text = "Namaste. Main aapka Health Assistant hoon.\n\nKripya mujhe batayein ki aap kaisa mehsoos kar rahe hain? Udaharan ke liye, aap 'bukhar' ya 'sir dard' ya 'exam stress' ke baare mein pooch sakte hain."
            elif detected_lang == "mr":
                 response_text = "Namaskar. Me tumcha Health Assistant ahe. Tumhala kay tras hot ahe te sanga? (Marathi Support Mock Mode)"
            elif detected_lang == "bn":
                 response_text = "Nomoshkar. Ami apnar Health Assistant. Apnar ki somossha hochche bolun? (Bengali Support Mock Mode)"
            elif detected_lang == "ta":
                 response_text = "Vanakkam. Naan ungal Health Assistant. Ungalukku enna udambu sari illai? (Tamil Support Mock Mode)" 
            else:
                 response_text = "Hello. I am your AI Health Assistant.\n\nPlease describe your symptoms so I can provide relevant information. For example, you can ask about 'fever', 'headache', or 'stress'. I am here to help guide you."

        final_response = response_text

        return {
            "response": final_response,
            "image_url": None, 
            "sources": sources
        }

    def _check_safety(self, text: str) -> Optional[str]:
        # Old method replaced by new strict layer, keeping for compatibility if referenced elsewhere
        return None

rag_service = RAGService()
