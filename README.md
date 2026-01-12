# కళ | Kala Art Gallery 🎨

> **"Where Art Finds Itself."**

![Kala Banner](public/starry-night.jpg)

## 📖 About The Project

**Kala (కళ)** is an AI-powered art style classifier designed to bridge the gap between artificial intelligence and human creativity. Named after the Sanskrit word for "art," this application serves as a digital museum that can identify the stylistic DNA of **50 legendary masters**—from the swirling strokes of *Van Gogh* to the geometric abstractions of *Picasso*.

Unlike standard classifiers, Kala offers a **premium, museum-grade user experience**, featuring immersive animations, real-time Wikipedia integration, and a responsive glassmorphism UI.

---

## ✨ Key Features

* **🧠 Deep Learning Intelligence:** Powered by a custom Convolutional Neural Network (CNN) trained on thousands of artworks to recognize 50 distinct artistic styles with high accuracy.
* **🏛️ Museum-Grade UI:** A sophisticated "Dark/Light" thematic design featuring **Glassmorphism**, smooth **Framer Motion** transitions, and a curated **Golden/Terracotta** color palette.
* **🌐 Wikipedia API "Magic":** Instead of storing heavy static images, the app dynamically fetches artist portraits and biographies using the **MediaWiki API**, ensuring content is always up-to-date and lightweight.
* **📱 Mobile-First Architecture:** Fully responsive design with a custom **Hamburger Menu**, touch-optimized navigation, and adaptive typography that looks perfect on any device.
* **⚡ Modern Tech Stack:** Built with **React 18 + Vite** for lightning-fast performance and deployed on **Vercel** with SPA routing.

---

## 🛠️ Technology Stack

### **Frontend**
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 18** (UI Library)
* ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript** (Type Safety)
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** (Styling)
* ![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white) **Vite** (Build Tool)
* **Framer Motion** (Animations)
* **Lucide React** (Iconography)

### **Backend & ML**
* ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) **Python** (Model Training & Inference)
* ![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white) **TensorFlow / Keras** (Deep Learning)
* **Flask** (API Server)
* **Wikipedia API** (Data Fetching)

---

## 🚀 Getting Started

Follow these steps to run Kala locally on your machine.

### **Prerequisites**
* Node.js (v18+)
* Python (v3.9+)

### **Installation**

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/kala-art-gallery.git](https://github.com/your-username/kala-art-gallery.git)
    cd kala-art-gallery
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

---

## 📂 Project Structure

```bash
kala-art-gallery/
├── public/
│   ├── data/
│   │   └── artists.csv          # The "Single Source of Truth" for artist metadata
│   └── model/                   # TensorFlow.js / Keras Model files
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Glassmorphism Nav with Mobile Dropdown
│   │   ├── Hero.tsx             # "Starry Night" Landing Section
│   │   ├── ArtistCard.tsx       # Fetches images via Wikipedia API
│   │   └── ClassificationResult.tsx  # Displays probability & "Master's Journey" link
│   ├── pages/
│   │   ├── Collection.tsx       # Grid of 50 Masters
│   │   └── About.tsx            # Project Documentation
│   └── utils/
│       └── artistStyles.ts      # Mapping artists to movements (Cubism, Baroque, etc.)
└── vercel.json                  # SPA Routing Configuration
