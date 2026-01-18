# కళ | Kala: Deep Learning Artist Recognition Platform

> **"Where Art Finds Itself."**

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18-20232A?logo=react) ![TensorFlow](https://img.shields.io/badge/TensorFlow-20.4M_Params-FF6F00?logo=tensorflow) ![Latency](https://img.shields.io/badge/Latency-113.5ms-success)

![Kala Banner](public/starry-night.jpg)

## 📖 About The Project

Kala (కళ) is an AI-powered art style classifier designed to bridge the gap between artificial intelligence and human creativity. Named after the Sanskrit word for "art," this application serves as a digital museum that can identify the stylistic DNA of **51 legendary masters**—from the swirling strokes of *Van Gogh* to the geometric abstractions of *Picasso*—with sub-perceptual latency.

Unlike standard classifiers, Kala offers a **premium, museum-grade user experience**, featuring immersive animations, real-time Wikipedia integration, and a responsive glassmorphism UI.

---

## ✨ Key Features

*   **🧠 Deep Learning Intelligence:** Powered by a customized **EfficientNet CNN** with **20.4M parameters** to recognize 51 distinct artistic styles with high accuracy.
*   **⚡ Sub-Perceptual Performance:** Optimized inference engine serving predictions in **113.5ms** (CPU average), processing **~9 images/second**.
*   **🏛️ Museum-Grade UI:** A sophisticated "Dark/Light" thematic design featuring **Glassmorphism**, smooth **Framer Motion** transitions, and a curated **Golden/Terracotta** color palette.
*   **🌐 Wikipedia API "Magic":** Dynamically fetches artist portraits and biographies using the **MediaWiki API**, keeping the app lightweight and content-rich.
*   **📱 Mobile-First Architecture:** Fully responsive design with touch-optimized navigation, adaptive typography, and a custom hamburger menu.

---

## 🛠️ Technical Architecture

### 1. The Intelligence (Model)
We bypassed standard implementations for a custom transfer-learning approach.

*   **Backbone:** EfficientNet (Fine-Tuned)
*   **Head:** Custom 6-layer classification block
*   **Complexity:** $20.4 \times 10^6$ parameters ($20.1$M trainable)
*   **Footprint:** 233MB (`.keras` v3 format)
*   **Training Pipeline:** Implemented robust data augmentation (Rotation $\pm 20^{\circ}$, Zoom $0.2$, Flips) achieving an **8x data multiplier** for better generalization.

### 2. Inference Performance (CPU)
Benchmarks conducted on production hardware (No GPU acceleration).

| Metric | Measurement |
| :--- | :--- |
| **Average Latency** | **113.5 ms** |
| **P95 Stability** | **138.1 ms** |
| **Throughput** | **~9 req/sec** |

---

## 💻 Technology Stack

### **Frontend**
*   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 18** (UI Library)
*   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript** (Type Safety)
*   ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (Styling)
*   ![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white) **Vite** (Build Tool)
*   **Framer Motion** (Animations)

### **Backend & ML**
*   ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) **Python** (Model Training & Inference)
*   ![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white) **TensorFlow / Keras** (Deep Learning)
*   **Flask** (Rest API)
*   **Wikipedia API** (Live Data Fetching)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python (v3.9+)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/kala-art-gallery.git
    cd kala-art-gallery
    ```

2.  **Ignite Frontend**
    ```bash
    npm install
    npm run dev
    # Server active at http://localhost:5173
    ```

3.  **Ignite Backend**
    ```bash
    pip install -r requirements-backend.txt
    cd backend
    python app.py
    # Inference engine active at http://localhost:5000
    ```

---

## 📂 Project Structure

```bash
kala-art-gallery/
├── public/
│   ├── data/
│   │   └── artists.csv          # Single Source of Truth for artist metadata
│   └── model/                   # Model binaries
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Glassmorphism Nav
│   │   ├── Hero.tsx             # "Starry Night" Landing Section
│   │   ├── ArtistCard.tsx       # Smart component fetching Wikipedia data
│   │   └── ClassificationResult.tsx
│   ├── pages/
│   │   ├── Collection.tsx       # Grid of 50 Masters
│   │   └── About.tsx            # Documentation
│   └── utils/
│       └── artistStyles.ts      # Art movement mapping
└── backend/
    ├── app.py                   # Flask Inference API
    └── scripts/                 # Analysis and Evaluation tools
```

---

## License

Distributed under the MIT License. See `LICENSE` for details.
