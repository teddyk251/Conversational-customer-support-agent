# Conversational Customer Support Agent

Accessing government services is an essential and frequent part of many people's lives. We are working to make these services more accessible to individuals from diverse linguistic backgrounds, providing them in their native languages.

## Installation Instructions

1. **Clone the Repository**:
```bash
git clone --branch front_backend https://github.com/teddyk251/Conversational-customer-support-agent.git
```
2. **Install Dependencies**:
    Navigate to the project directory and install the dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
3. **Set Up Docker** (Optional):
    Build and run the Docker container:
    ```bash
    docker build -t support-agent .
    docker run -d -p 5000:5000 support-agent
    ```
4. **Run the Application**:
    Run the main application script:
    ```bash
    python app.py
    ```

## Code Organization 
### backend
```
backend/
├── ocr/
├── rag/
├── speech/
├── translate/
├── Dockerfile
├── app.py
├── requirements.txt
├── test_api.py
└── utils.py
```

- **ocr/**: This directory contains the modules for Optical Character Recognition (OCR), responsible for extracting form fields from the 
  
- **rag/**: Contains code related to retrieval-augmented generation (RAG), which grounds the LLM's responses on Irembo's support docs.
  
- **speech/**: This directory handles the speech-to-text (STT) and text-to-speech (TTS) functionalities, which allow the agent to process spoken language and respond with synthesized speech.
  
- **translate/**: Houses modules for translation between different languages, making the system accessible to users from diverse linguistic backgrounds.

- **Dockerfile**: Defines the configuration for containerizing the application using Docker, ensuring consistent deployment across different environments.
  
- **app.py**: The main application file that orchestrates the interaction between the various components (OCR, RAG, speech, translation) and provides the interface for the conversational agent.
  
- **requirements.txt**: Specifies the dependencies and libraries required to run the application, used to ensure the correct environment is set up.

- **test_api.py**: This script is used for testing the API endpoints to verify that the different functionalities (like OCR, speech, translation) are working correctly.
  
- **utils.py**: Contains utility functions used across the project.

### frontend
```bash
├── public/
├── src/
├── eslint.config.js
├── index.html
├── irembo.svg
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└──  vite.config.ts
```

- **public/**: Contains static assets
  
- **src/**: The core directory for all the front-end code such as components, utilities, and services related to the customer support agent interface.
  
- **index.html**: The entry point HTML file for the frontend.

- **irembo.svg**: Logo or branding for Irembo, used in the frontend interface.

- **package.json**: Specifies the Node.js dependencies and scripts for the frontend project, making it easier to manage packages.
  
- **postcss.config.js**: Config file for PostCSS, a tool used to process CSS (used often with Tailwind CSS for advanced functionality).
  
- **tailwind.config.js**: Tailwind CSS configuration file where you can customize the framework to suit the styling needs of the project.
  
- **tsconfig.json**: TypeScript configuration file for managing TypeScript options and compiler settings for the whole project.
  
- **vite.config.ts**: Configuration file for Vite.

---

## Workflow Overview

### Text
1. **Input**: The user inputs a query via text in any of the supported languages.
2. **Source language to English Translation (Optional)**: The input from the user is converted to English which is the language used to interact with the LLM and support documents.
3. **Retrieval-Augmented Generation (RAG)**: The query is processed by the RAG system to retrieve relevant information from support documents.
4. **Response Generation**: Based on the retrieved data, the LLM generates a response, which is translated back to the user's language.
5. **English to Source language Translation (Optional)**: The LLM response is translated back to the user's source language.
6. **Output**: The response is provided as text in the user's language.

### Speech
1. **Input**: The user inputs a query via speech, in any of the supported languages.
2. **Speech Recognition**: The speech is decoded into text in the user's language.
3. **Source language to English Translation (Optional)**: The recognized input from the user is converted to English which is the language used to interact with the LLM and support documents.
3. **Retrieval-Augmented Generation (RAG)**: The query is processed by the RAG system to retrieve relevant information from support documents.
4. **Response Generation**: Based on the retrieved data, the LLM generates a response, which is translated back to the user's language.
5. **English to Source language Translation (Optional)**: The LLM response is translated back to the user's language.
6. **Speech Synthesis**: We synthesize the text from the LLM into speech.
7. **Output**: The response is provided as speech in the user's language.
