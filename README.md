# AarogyaMitra: AI-Powered Health Assistant

AarogyaMitra is a comprehensive, multilingual health assistant application designed to provide verified health guidance, accessibility features, and computer vision capabilities. It leverages advanced AI (RAG with Google Gemini) to deliver safe and accurate information.

## 🏗️ Architecture Diagram Description

This section describes the high-level architecture of the AarogyaMitra solution. This description can be used to generate a system architecture diagram.

**Components:**

1.  **Frontend (Client Layer)**:
    - **Technology**: Next.js 16 (App Router), React 19, Tailwind CSS.
    - **Key Modules**:
      - `ChatInterface`: User interface for health Q&A.
      - `VisionAssistant`: Camera interface for object/scene analysis.
      - `AccessibilityContext`: Global state for managing UI preferences (font size, contrast, reducing motion).
      - `HeroOrb`: 3D visual element (Three.js/Drei).
    - **Interaction**: Communicates with the Backend via HTTP/REST API.

2.  **Backend (API Layer)**:
    - **Technology**: FastAPI (Python).
    - **Key Endpoints**:
      - `/api/v1/chat`: Handles text-based health queries.
      - `/api/v1/vision/analyze`: Processes image data.
      - `/api/v1/vision/simplify`: Simplifies complex text.
    - **Middleware**: CORS functionality for secure client-server communication.

3.  **Application Logic & Services**:
    - **RAG Service**:
      - **Orchestrator**: LangChain.
      - **LLM**: Google Gemini (via `langchain-google-genai`).
      - **Vector Store**: FAISS (for retrieving safety protocols and knowledge context).
      - **Safety Layer**: Integration of clinical guidelines and risk assessment constraints.
    - **Vision Service**: Handles image processing and prompt engineering for visual analysis.

4.  **Data & External APIs**:
    - **Google Gemini API**: For text generation and vision capabilities.
    - **Vector Database**: Local FAISS index storing medical knowledge and safety protocols.

**Data Flow Summary**:
User (Frontend) <--> FastAPI Router <--> Services (RAG/Vision) <--> LLM/Vector DB.

---

## 🔄 Process Flow & Use-Case Diagrams

### 1. Health Inquiry (RAG Chat) Flow

**Actor**: User
**Goal**: Get verified health advice.
**Steps**:

1.  **Start**: User enters a query (text or voice) in the `ChatInterface`.
2.  **Request**: Frontend sends `POST` request to `/api/v1/chat`.
3.  **Processing (Backend)**:
    - `RAG Service` receives the query.
    - **Retrieval**: System queries FAISS vector store for relevant safety protocols and medical context.
    - **Augmentation**: Query is augmented with retrieved context and safety system instructions.
    - **Generation**: Augmented prompt is sent to Google Gemini LLM.
4.  **Response**:
    - LLM generates a response citing sources.
    - Backend sends the response back to Frontend.
5.  **Display**: Frontend renders the response, potentially generating audio (planned) or displaying related images.

### 2. Vision Analysis Flow

**Actor**: User (Visually Impaired / General User)
**Goal**: Identify objects or read text from the environment.
**Steps**:

1.  **Start**: User navigates to `/vision` and grants camera permissions.
2.  **Capture**: User captures an image/frame.
3.  **Request**: Frontend sends `POST` request to `/api/v1/vision/analyze` with the image file.
4.  **Processing**:
    - `Vision Service` receives the image.
    - Service constructs a prompt context (analyzing for safety/identification).
    - Image + Prompt sent to Google Gemini Vision model.
5.  **Response**: Model returns description/analysis (e.g., "This is a bottle of Aspirin, 500mg").
6.  **Display**: Frontend displays text result and acts as a Screen Reader (TTS).

### 3. Accessibility Customization Flow

**Actor**: User
**Goal**: Adjust UI for better readability/accessibility.
**Steps**:

1.  User clicks "Accessibility Controls".
2.  User toggles options (e.g., "High Contrast", "Large Text").
3.  `AccessibilityContext` updates global state.
4.  Tailwind classes dynamically update across the application (e.g., `text-xl`, `contrast-more`).

---

## 📱 Wireframes / Mockups Description

**1. Landing Page (Home)**

- **Header**: Clean navigation bar with logo.
- **Hero Section**:
  - Background: Interactive, flowing particle animation or 3D Orb.
  - Title: "Trusted Health Guidance. In Your Language." (Large, gradient text).
  - Subtext: Brief value proposition.
- **Main Interaction Area**:
  - Central Chat Input: A prominent text box floating above the fold.
  - Quick Actions: Buttons for "Voice Mode", "Upload Report".
- **Floating Controls**: Accessibility widget (icon) fixed to the side or corner.

**2. Chat Interface**

- **Layout**: Split view or centered chat column.
- **Message List**:
  - User Message: Right-aligned bubbles.
  - AI Response: Left-aligned, distinct background. Includes "Sources" footprint and "Safety Disclaimer" banner if risk is detected.
- **Input Area**: Text field, Microphone icon, Send button.

**3. Vision Assistant Page**

- **Viewfinder**: Large central video feed from device camera.
- **Overlay**: Semi-transparent layover instructions ("Point at medication or text").
- **Controls**: deeply contrasted buttons for "Capture", "Switch Camera", "Read Aloud".
- **Result Panel**: Slide-up sheet or dedicated area showing text results (e.g., "Medicine Name: Paracetamol").

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Google Gemini API Key

### Installation

**1. Backend Setup**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Create .env file with GOOGLE_API_KEY
uvicorn main:app --reload
```

**2. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Three.js
- **Backend**: FastAPI, Python, Pydantic
- **AI/ML**: LangChain, Google Gemini, FAISS, Sentence Transformers
