# HealthHub: Health Data Management and AI-Assisted Analysis Platform

This project is a comprehensive health data management and AI-assisted analysis platform. It combines personal health record management with advanced AI capabilities for data analysis and medical information retrieval.

## Features

### Health Records Management
- Secure upload and storage of personal health records
- File preview and download functionality
- Rename and delete options for uploaded files
- Organized display of health records with a user-friendly interface
- Automatic transcription of uploaded medical records (PDF and images)
- Creation of embeddings from transcribed text using Cohere
- Storage of embeddings in Supabase's vector database for efficient retrieval

### AI-Powered Chat Interface
- Conversational AI interface for querying personal health data
- Support for multiple language models (LLMs) including OpenAI's GPT models
- Conversation history management with options to create, rename, and delete conversations

### RAG (Retrieval-Augmented Generation) Pipeline
- Utilizes Langchain for efficient document processing and retrieval
- Implements Cohere embeddings for semantic understanding of health data
- Enhances AI responses with relevant information from personal health records
- Improves accuracy and relevance of AI-generated answers

### Perplexity-like Medical Web Search
- Integrated medical search functionality powered by the Tavily API
- Provides up-to-date medical information from reputable online sources
- Displays search results with source attribution and relevance ranking
- Generates comprehensive reports based on search results using OpenAI's GPT-4o

### Real-time Data Analysis
- Connects to external databases for real-time health data analysis
- Supports SQL query generation for complex data inquiries
- Visualizes query results for easy interpretation

### Medical Records Processing
- Automatic transcription of uploaded medical records (PDF and images)
- Creation of embeddings from transcribed text using Cohere
- Storage of embeddings in Supabase's vector database for efficient retrieval

## Technical Stack

- Frontend: Next.js with TypeScript
- Backend: FastAPI (Python)
- Database: Supabase (PostgreSQL with pgvector extension)
- AI/ML: Langchain, OpenAI GPT models, Cohere embeddings
- External APIs: Tavily for medical web search

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Python (v3.8 or later)
- Supabase account
- OpenAI API key
- Gemini API key
- Tavily API key
- Cohere API key
- Resend API key
- Nutritionix API key

### Installation

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/CubeStar1/health-monitor-next.git
   cd health-monitor-next
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Clone the Python backend repository:
   ```bash
   git clone https://github.com/CubeStar1/health-monitor-api.git
   cd healthhub-backend
   ```

4. Set up the Python backend:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   Create a `.env` file in the frontend root directory and a `.env` file in the backend directory with the following contents:

   ```bash
   # Frontend .env (in health-monitor-next directory)

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABAE_ADMIN=your_supabase_service_role_key

   # FastAPI
   NEXT_PUBLIC_API_URL=http://localhost:8000
   API_URL=http://localhost:8000

   # Resend
   RESEND_API_KEY=your_resend_api_key
   RESEND_DOMAIN=your_resend_domain

   # Nutritionix API
   NUTRITIONIX_API_URL=https://trackapi.nutritionix.com/v2
   NUTRITIONIX_APP_ID=your_nutritionix_app_id
   NUTRITIONIX_API_KEY=your_nutritionix_api_key

   # DB Credentials
   NEXT_PUBLIC_DB_USER=<your_db_user>
   NEXT_PUBLIC_DB_PASSWORD=<your_db_password>
   NEXT_PUBLIC_DB_HOST=<your_db_host>
   NEXT_PUBLIC_DB_PORT=<your_db_port>
   NEXT_PUBLIC_DB_NAME=<your_db_name>


   # Backend .env (in health-monitor-api directory)
   OPENAI_API_KEY=<your_openai_api_key>
   LOCAL_LLM_URL=<your_local_llm_url>
   GOOGLE_API_KEY=<your_google_api_key>
   COHERE_API_KEY=<your_cohere_api_key>
   TAVILY_API_KEY=<your_tavily_api_key>

   SUPABASE_URL=<your_supabase_project_url>
   SUPABASE_KEY=<your_supabase_service_role_key>

   ```


6. Start the development servers:
   ```bash
   # In the frontend directory
   cd health-monitor-next
   npm run dev

   # In a new terminal, navigate to the backend directory
   cd path/to/health-monitor-api
   uvicorn main:app --reload
   ```

## Usage

1. Upload health records through the Health Records interface
2. Use the Chat interface to query your health data or ask medical questions
3. Utilize the Medical Search feature for up-to-date medical information

## Medical Records Processing

When a medical record is uploaded:

1. The file is sent to the backend for processing.
2. If it's a PDF, it's converted to text using PyPDF2. If it's an image, OCR is performed using Tesseract.
3. The extracted text is then sent to Cohere to generate embeddings.
4. The embeddings, along with the original text and metadata, are stored in the Supabase vector database.

This process allows for efficient semantic search and retrieval of relevant information during chat interactions.

