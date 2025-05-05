# Health Data Management and Analysis Platform

This project is a health data management and analysis platform. It combines personal health record management with advanced artificial intelligence capabilities for data analysis and medical information retrieval using RAG.

## Medical Records Processing

When a medical record is uploaded:

1. The file is sent to the backend for processing.
2. If it's a PDF, it's converted to text using PyPDF2. If it's an image, OCR is performed using Tesseract.
3. The extracted text is then sent to Cohere to generate embeddings.
4. The embeddings, along with the original text and metadata, are stored in the Supabase vector database.

This process allows for efficient semantic search and retrieval of relevant information during chat interactions

