import os
import json
import csv
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO

# --- 1. Robust Environment Setup ---
# Initialize Flask
app = Flask(__name__)

# Enable CORS (Critical for React Frontend)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Configure TensorFlow to avoid CPU warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=all, 1=info, 2=warning, 3=error

# Define Base Directory for Robust Path Handling
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define Paths
MODEL_PATH = os.path.join(BASE_DIR, 'art_artist_classifier.keras')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'class_names.json')
ARTISTS_CSV_PATH = os.path.join(BASE_DIR, 'artists.csv')

# --- 2. Load Resources (Global Scope) ---
print("🔄 Loading resources...")

# Load Model with Error Handling
model = None
try:
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully!")
    
    # Check for Rescaling layer
    has_rescaling = any('rescaling' in layer.name.lower() for layer in model.layers)
    if has_rescaling:
        print("ℹ️  Model has built-in Rescaling layer")
    else:
        print("ℹ️  Model expects manual normalization (0-255)")
        
except Exception as e:
    print(f"❌ Error loading model: {e}")

# CORRECTED, ALPHABETICAL CLASS LIST (Hardcoded to match model training order)
class_names = [
    'Albrecht_Durer', 'Alfred_Sisley', 'Amedeo_Modigliani', 'Andy_Warhol', 'Artemisia_Gentileschi',
    'Berthe_Morisot', 'Camille_Pissarro', 'Canaletto', 'Caravaggio', 'Claude_Monet',
    'Diego_Velazquez', 'Edgar_Degas', 'Edouard_Manet', 'Edvard_Munch', 'El_Greco',
    'Eugene_Delacroix', 'Francisco_Goya', 'Frida_Kahlo', 'Georges_Seurat', 'Giotto_di_Bondone',
    'Gustav_Klimt', 'Gustave_Courbet', 'Henri_Matisse', 'Henri_Rousseau', 'Henri_de_Toulouse-Lautrec',
    'Hieronymus_Bosch', 'Jackson_Pollock', 'Jan_van_Eyck', 'Joan_Miro', 'Kazimir_Malevich',
    'Leonardo_da_Vinci', 'Marc_Chagall', 'Michelangelo', 'Mikhail_Vrubel', 'Pablo_Picasso',
    'Paul_Cezanne', 'Paul_Gauguin', 'Paul_Klee', 'Peter_Paul_Rubens', 'Pierre-Auguste_Renoir',
    'Piet_Mondrian', 'Pieter_Bruegel', 'Raphael', 'Rembrandt', 'René_Magritte',
    'Salvador_Dali', 'Sandro_Botticelli', 'Titian', 'Vasiliy_Kandinsky', 'Vincent_van_Gogh',
    'William_Turner'
]
print(f"✅ Loaded {len(class_names)} artist classes (hardcoded alphabetical)")

# Startup Verification Check
print("--------------------------------------------------")
print("!!! SECURITY CHECK: VERIFYING CLASS MAPPING !!!")
print(f"Index 49 is currently: {class_names[49]}")
print("SHOULD BE: Vincent_van_Gogh")
if class_names[49] == 'Vincent_van_Gogh':
    print("✅ MAPPING CORRECT!")
else:
    print("❌ MAPPING WRONG! Fix required!")
print("--------------------------------------------------\n")

# Load Wikipedia Data
artist_wikipedia_map = {}
try:
    if os.path.exists(ARTISTS_CSV_PATH):
        with open(ARTISTS_CSV_PATH, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                artist_name = row['name']
                wikipedia_url = row['wikipedia']
                artist_wikipedia_map[artist_name] = wikipedia_url
        print(f"✅ Loaded Wikipedia URLs for {len(artist_wikipedia_map)} artists")
    else:
        print(f"⚠️ Artists CSV not found at {ARTISTS_CSV_PATH}")
except Exception as e:
    print(f"⚠️ Warning: Could not load artists CSV: {e}")

# --- 3. Helper Functions ---
IMG_SIZE = 224

def preprocess_image(image):
    """Preprocess the image for model prediction"""
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize to model's expected input size
    image = image.resize((IMG_SIZE, IMG_SIZE))
    
    # Convert to numpy array - keep raw pixel values (0-255)
    img_array = np.array(image).astype('float32')
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def clean_artist_name(name):
    """Clean artist name for better display"""
    name = name.replace('_', ' ')
    name = name.replace('тХа├а', 'ü').replace('а', '')
    replacements = {
        'Du rer': 'Dürer',
        'Duerer': 'Dürer',
        'Vasiliy Kandinskiy': 'Wassily Kandinsky',
    }
    for old, new in replacements.items():
        name = name.replace(old, new)
    return name.strip()

# --- 4. API Routes ---

@app.route('/', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Kala Art AI Backend is Live! 🎨',
        'model_loaded': model is not None,
        'num_classes': len(class_names)
    })

@app.route('/predict', methods=['POST'])  # Alias for compatibility
@app.route('/api/classify', methods=['POST'])
def classify_artwork():
    """Classify an uploaded artwork image"""
    if model is None:
        return jsonify({'error': 'Model not loaded on server'}), 500

    try:
        # Check if image file is present (handle both 'image' and 'file' keys)
        file = None
        if 'image' in request.files:
            file = request.files['image']
        elif 'file' in request.files:
            file = request.files['file']
        
        if not file or file.filename == '':
            return jsonify({'error': 'No image file provided'}), 400
        
        # Read and preprocess the image
        image = Image.open(BytesIO(file.read()))
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        
        # --- DEBUG LOGGING ---
        # Get top prediction index
        predicted_index = np.argmax(predictions[0])
        mapped_name = class_names[predicted_index] if predicted_index < len(class_names) else "Unknown"
        
        print("\n" + "="*40)
        print(f"🧐 PREDICTION DEBUG LOG")
        print("="*40)
        print(f"First 5 Classes: {class_names[:5]}")
        print(f"Predicted Index: {predicted_index}")
        print(f"Mapped Name:     {mapped_name}")
        print(f"Confidence:      {predictions[0][predicted_index]:.4f}")
        print(f"Raw Probabilities (Overview): Min={predictions[0].min():.4f}, Max={predictions[0].max():.4f}")
        print("="*40 + "\n")
        # ---------------------

        # Get top 5 predictions
        top_k = min(5, len(class_names))
        
        # Sort indices by confidence (descending)
        all_indices = np.argsort(predictions[0])[::-1]
        
        results = []
        for idx in all_indices:
            if idx >= len(class_names):
                continue
                
            artist_name = class_names[idx]
            confidence = float(predictions[0][idx])
            
            # Debug inference mapping
            if idx == predicted_index:
                print(f"🔍 DEBUG: Model predicted Index {idx}, which maps to: {artist_name}")
            
            cleaned_name = clean_artist_name(artist_name)
            
            # Get Wikipedia URL
            wikipedia_url = artist_wikipedia_map.get(cleaned_name, '')
            
            results.append({
                'artist': cleaned_name,
                'raw_name': artist_name,
                'confidence': confidence,
                'percentage': round(confidence * 100, 2),
                'wikipedia': wikipedia_url
            })
            
            if len(results) >= top_k:
                break
        
        if not results:
            return jsonify({'error': 'No predictions generated'}), 500

        # Return format matching frontend expectations
        return jsonify({
            'success': True,
            'predictions': results,
            'top_artist': results[0]['artist'],
            'top_confidence': results[0]['percentage'],
            # Add simple fields for potential other clients
            'class': results[0]['artist'],
            'confidence': results[0]['percentage']
        })
    
    except Exception as e:
        print(f"Error during classification: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/artists', methods=['GET'])
def get_artists():
    """Get list of all artists the model can recognize"""
    artists = [clean_artist_name(name) for name in class_names]
    return jsonify({
        'artists': sorted(artists),
        'count': len(artists)
    })

# --- 5. Server Entry Point ---
if __name__ == '__main__':
    # Render provides 'PORT' env var, default to 5000 for local dev
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting Flask server on http://0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port)
