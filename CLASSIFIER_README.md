# Artist Classifier Integration

## Overview

This project now includes an AI-powered artist classifier that can identify the artist style of uploaded artwork images. The system uses a Keras deep learning model trained on 51 renowned artists.

## Features

- **AI Classification**: Upload artwork images to identify the artist style
- **51 Artists**: Recognizes styles from Van Gogh, Picasso, Leonardo da Vinci, Monet, and 47 more masters
- **Top 5 Predictions**: Shows confidence scores for the most likely artists
- **Artist Portraits**: AI-generated portraits enhance the gallery collection
- **Modern UI**: Beautiful drag-and-drop interface with animations

## Running the Application

### Prerequisites

- Node.js and npm (for frontend)
- Python 3.8+ (for backend)

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:8080`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements-backend.txt

# Start Flask server
python app.py
```

The backend API will run on `http://localhost:5000`

## Using the Classifier

1. Navigate to the "Classify" page from the main navigation
2. Drag and drop an artwork image or click to browse
3. Click "Identify Artist"
4. View the top 5 artist predictions with confidence scores
5. Click on artist names to learn more

## Model Information

- **Model File**: `art_artist_classifier.keras` (244MB)
- **Input Size**: 224x224 RGB images
- **Architecture**: Convolutional Neural Network
- **Classes**: 51 artists from various periods and styles
- **Training Data**: Thousands of artworks per artist

## API Endpoints

### `GET /api/health`
Health check endpoint

### `POST /api/classify`
Classify an uploaded artwork image
- **Input**: Form data with 'image' file
- **Output**: JSON with top 5 predictions and confidence scores

### `GET /api/artists`
Get list of all recognizable artists

## Artist Portraits

The `/public/artists/` directory contains AI-generated portraits for:
- Vincent van Gogh
- Pablo Picasso
- Leonardo da Vinci
- Claude Monet
- Frida Kahlo
- Salvador Dalí
- Michelangelo
- Andy Warhol
- Edvard Munch
- Gustav Klimt
- Henri Matisse
- Wassily Kandinsky

## Technology Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- shadcn/ui components

### Backend
- Flask (Python web framework)
- TensorFlow/Keras (deep learning)
- Pillow (image processing)
- Flask-CORS (cross-origin requests)

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000
```

## Notes

- The model file is large (244MB) - ensure it's in the root directory
- Backend must be running for classification to work
- Supported image formats: JPG, PNG, WebP
- Best results with clear, well-lit artwork images
