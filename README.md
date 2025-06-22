# Bahnar-English Translation System

This project is a low-resource Neural Machine Translation (NMT) system for the Bahnar-English language pair, developed as a capstone project at VinUniversity. The goal of this project is to address the absence of publicly available translation tools for the endangered Bahnar language, providing a resource for the Bahnar community, linguists, and researchers.

The web application provides a user-friendly interface for translating text between Bahnar and English and includes a searchable Bahnar-English dictionary.

## Features

* **Bilingual Translation:** Translate text from Bahnar to English and and vice-versa.
* **Interactive Dictionary:** Look up word meanings with an integrated Bahnar-English dictionary.
* **User-Friendly Interface:** A clean and intuitive web interface built for ease of use.
* **Community-Driven:** The system is designed to be improved over time with user feedback and contributions.

## Tech Stack

### Frontend
* **HTML/CSS:** For structuring and styling the web interface.
* **Vite.js:** A modern frontend build tool for fast and efficient development.

### Backend
* **FastAPI:** A high-performance Python web framework for building the API.
* **Hugging Face Transformers:** For loading and serving the machine translation models.
* **Pandas:** For managing and accessing the dictionary data.

### Machine Learning Models
* **MarianMT:** The core translation model, fine-tuned for the Bahnar-English language pair.
* **NLLB, Meta-LLaMA3, and other LLMs:** Explored and benchmarked for their translation capabilities.

### Deployment
* **Docker:** For containerizing the frontend and backend services.
* **ngrok:** For exposing the local services to the internet.

## Setup and Installation

To run this project locally, you will need to have Docker and Docker Compose installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Obtain your Google Cloud Service Account Key:**
    Download your service account key JSON file from Google Cloud Platform. Rename it to `service_account_key.json` and place it in the root directory of this project. **Ensure this file is NOT committed to your version control system.**

3.  **Create a `.env` file** in the root directory and add your ngrok authentication tokens and desired domains. You will also need to reference your service account key file here:
    ```
    # .env example
    SERVICE_ACCOUNT_KEY=./service_account_key.json

    # Backend NGROK settings (Account 1)
    NGROK_BACKEND_AUTHTOKEN=<YOUR_BACKEND_NGROK_AUTHTOKEN>
    NGROK_BACKEND_DOMAIN=<your-desired-backend-domain>.ngrok-free.app

    # Frontend NGROK settings (Account 2)
    NGROK_FRONTEND_AUTHTOKEN=<YOUR_FRONTEND_NGROK_AUTHTOKEN>
    NGROK_FRONTEND_DOMAIN=<your-desired-frontend-domain>.ngrok-free.app
    ```
    **Note:** Replace `<YOUR_BACKEND_NGROK_AUTHTOKEN>`, `<your-desired-backend-domain>`, `<YOUR_FRONTEND_NGROK_AUTHTOKEN>`, and `<your-desired-frontend-domain>` with your actual values.

4.  **Build and run the services** using Docker Compose:
    ```bash
    docker-compose up --build
    ```

## Usage

Once the containers are running, you can access the translation web app through the ngrok URL you specified for the frontend (e.g., `https://<your-desired-frontend-domain>.ngrok-free.app`).

* **For Translation:** Select the "Translator" tab, enter your text in the input box, and click "Translate".
* **For Dictionary Lookup:** Switch to the "Dictionary" tab and use the search bar to find word definitions.

## Team Members

This project was developed by:

* **Nguyen Thai Uyen (V202100395)** - Dataset Lead & Model Optimization Specialist
* **Dao Chi Tuong (V202100399)** - Data Engineer & System Developer
* **Nguyen Mau Hoang Hiep (V202100595)** - Dictionary Developer & LLM Evaluation Lead

Under the supervision of **Doan Dang Khoa**.