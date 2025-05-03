<h1 align="center">Grammify: Score Your Grammar</h1>
<p align="center">
  <strong>An AI-powered application to analyze and score your grammar from audio inputs.</strong>
</p>

---

## About the App

Grammify is a web application that allows users to upload audio files, transcribe the content, and analyze the grammar of the transcribed text. It leverages the following technologies:

- **Frontend**: Built with React and Vite for a fast and modern user experience.
- **Backend**: Powered by Flask, with integrations for AssemblyAI (for transcription) and LanguageTool (for grammar analysis).
- **Styling**: Tailwind CSS for responsive and clean design.
- **Animations**: Framer Motion for smooth animations.

---

## Features

- Upload audio files for transcription.
- Analyze grammar and receive a score out of 100.
- Highlight grammatical errors with suggestions for improvement.
- Responsive and visually appealing UI.

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or later)
- **Python** (v3.8 or later)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

---

### Installation Instructions

#### 1. Clone the Repository
git clone https://github.com/your-username/Grammify.git
cd Grammify

#### 2. Set Up the Backend

1. Navigate to the backend directory:
   cd backend/app

2. Install required Python packages:
    pip install -r requirements.txt

3. Create a .env file in backend/app directore and add the following:
    ASSEMBLY_API_KEY=your_assembly_api_key
    LANGUAGETOOL_API_URL=https://api.languagetool.org/v2/check

5. Start the backend server:
    python main.py

#### 3. Set Up the Frontend

1. Navigate to the frontend directory:
    cd ../../frontend

2. Install the pacages:
    npm i

3. Start the development server:
    npm run dev
