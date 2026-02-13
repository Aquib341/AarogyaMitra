
# Safety protocols and templates for AarogyaMitra AI
# Strictly follows provided clinical guidelines.

# --- CRISIS TEMPLATES (T001-T010) ---
# MUST be used verbatim for high/imminent risk.

TEMPLATES = {
    "T001": {
        "id": "T001",
        "text": "I’m really concerned for your safety. Do you have a specific plan right now to hurt or end your life? (Yes / No)",
        "trigger": "explicit_plan_means_timeline",
        "action": "log_imminent_notify_clinician"
    },
    "T002": {
        "id": "T002",
        "text": "You said you have a plan and the means. If you are in immediate danger, call your local emergency number right now. If you want, I can help connect you to emergency services or your local crisis line. Are you in a safe place right now? (Yes / No)",
        "trigger": "imminent_plan_confirmed",
        "action": "offer_emergency_call"
    },
    "T003": {
        "id": "T003",
        "text": "I’m so sorry you’re struggling. Let’s make a short safety plan together — one step at a time. First: what are things that keep you safe or distract you when you feel like harming yourself?",
        "trigger": "high_risk_no_imminent_plan",
        "action": "start_safety_plan"
    },
    "T004": {
        "id": "T004",
        "text": "Thank you for telling me this. Have you had thoughts of killing yourself in the past month? (Yes/No). If yes, have you had any history of attempts?",
        "trigger": "suicidal_ideation_no_plan",
        "action": "cssrs_screen_flow"
    },
    "T005": {
        "id": "T005",
        "text": "Thank you for telling me about hurting yourself before. It’s important we make a plan to keep you safe — would you like to start a safety plan now or be connected to someone to talk to?",
        "trigger": "self_harm_history",
        "action": "safety_plan_clinician_flag"
    },
    "T006": {
        "id": "T006",
        "text": "Drinking or drugs can make things feel worse and increase risk. Are you safe right now? Would you like emergency help or a followup with a clinician?",
        "trigger": "substance_risk",
        "action": "harm_reduction_resources"
    },
    "T007": {
        "id": "T007",
        "text": "Because you said the means are available, please remove access to them if you can and ask someone you trust to stay with you. Do you have someone who can stay with you now?",
        "trigger": "active_plan_means_home",
        "action": "safety_plan_notify_hotline"
    },
    "T008": {
        "id": "T008",
        "text": "I’m concerned for your safety. If you’re comfortable, can you tell me if an adult at home knows how you’re feeling? If not, are you somewhere safe right now?",
        "trigger": "pediatric_risk",
        "action": "mandatory_reporting_flag"
    },
    "T009": {
        "id": "T009",
        "text": "Hearing voices telling you to hurt yourself is serious. Are the voices telling you to act right now? If yes, I want to help you get emergency care.",
        "trigger": "psychosis_command_hallucinations",
        "action": "urgent_clinician_contact"
    },
    "T010": {
        "id": "T010",
        "text": "I’m glad you’re here. How are you feeling since the last time you reached out? Any thoughts of harming yourself?",
        "trigger": "post_crisis_checkin",
        "action": "schedule_followup"
    }
}

# --- RISK LOGIC & KEYWORDS ---

RISK_KEYWORDS = {
    "imminent": [
        "kill myself now", "end it tonight", "have a gun", "have pills", "jumping off", "hanging myself", 
        "overdose now", "cut my wrists deep", "goodbye forever", "taking them all"
    ],
    "high": [
        "want to die", "better off dead", "kill myself", "suicide", "ending it all", "hurt myself", 
        "cutting myself", "slash my", "don't want to live", "hopeless", "worthless", "burden",
        "wish i was see dead"
    ],
    "self_harm": [
        "cut", "burn", "scratch", "hit myself", "bang head", "bite myself"
    ],
    "substance": [
        "drunk", "high", "wasted", "pills", "drugs", "alcohol", "drinking", "cocaine", "weed"
    ]
}

HELPLINES = {
    "India": {
        "Tele-MANAS": "14416",
        "Vandrevala Foundation": "+91 9999 666 555",
        "iCALL": "022-25521111",
        "Emergency": "112"
    },
    "US": {
        "988 Lifeline": "988",
        "Emergency": "911"
    },
    "Global": {
        "Emergency": "112" # Common standard, or placeholder
    }
}

SAFETY_DISCLAIMER = "If you are in immediate danger, please call your local emergency number (112 in India/Europe, 911 in US) or go to the nearest hospital."
