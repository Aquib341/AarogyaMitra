# AarogyaMitra 

AarogyaMitra is an advanced AI-powered health assistant designed to provide intelligent medical guidance and visual analysis. It combines the power of Large Language Models (LLMs) with Computer Vision to assist users in understanding their health concerns, analyzing medical reports, and providing accessible health information.

## 🌟 Key Features

- **Intelligent Health Chat**: engaging, context-aware conversations about health topics using advanced LLMs (Google Gemini).
- **RAG Engine**: Retrieval-Augmented Generation system powered by FAISS and LangChain to provide accurate, grounded medical information.
- **Visual Analysis**: Ability to analyze medical images and reports using computer vision capabilities.
- **Interactive 3D UI**: A modern, engaging user interface featuring 3D elements built with Three.js and React Three Fiber.
- **Accessibility Focused**: Built-in accessibility controls for text scaling, high contrast, and screen reader support.
- **Real-time Processing**: Fast and efficient backend using FastAPI for real-time responses.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Orchestration**: [LangChain](https://www.langchain.com/)
- **LLM Provider**: [Google Gemini](https://deepmind.google/technologies/gemini/)
- **Vector Store**: [FAISS](https://github.com/facebookresearch/faiss) (CPU version)
- **Embeddings**: Sentence Transformers
- **Server**: Uvicorn

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- Python (3.9 or higher)
- Google Cloud API Key (for Gemini)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AarogyaMitra.git
cd AarogyaMitra
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
# .venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory with your API keys:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`. API documentation is available at `http://localhost:8000/docs`.

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📖 Usage

1.  **Home Page**: Access the main interface with the 3D visual assistant.
2.  **Health Chat**: Use the chat interface to ask health-related questions.
3.  **Visual Analysis**: Upload medical images or reports for AI analysis.
4.  **Accessibility**: Use the controls to adjust the UI to your needs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
