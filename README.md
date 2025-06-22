# Bahnar-English Translation System

This project is a low-resource Neural Machine Translation (NMT) system for the Bahnar-English language pair, developed as a capstone project at VinUniversity. The goal of this project is to address the absence of publicly available translation tools for the endangered Bahnar language, providing a resource for the Bahnar community, linguists, and researchers.

The web application provides a user-friendly interface for translating text between Bahnar and English and includes a searchable Bahnar-English dictionary.

## Features

* **Bilingual Translation:** Translate text from Bahnar to English and vice-versa.
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

2.  **Create a `.env` file** in the root directory and add your ngrok authentication tokens and desired domains:
    ```
    NGROK_BACKEND_AUTHTOKEN=<YOUR_NGROK_AUTHTOKEN>
    NGROK_BACKEND_DOMAIN=<your-desired-backend-domain>.ngrok-free.app
    NGROK_FRONTEND_AUTHTOKEN=<YOUR_NGROK_AUTHTOKEN>
    NGROK_FRONTEND_DOMAIN=<your-desired-frontend-domain>.ngrok-free.app
    ```

3.  **Build and run the services** using Docker Compose:
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