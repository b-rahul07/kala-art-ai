"""
Reverse Engineering Script for Model Label Mapping
===================================================
This script helps identify the TRUE mapping between model output indices
and artist names by testing known images.

Usage:
    python reverse_engineer_labels.py <image_path> <known_artist_name>

Examples:
    python reverse_engineer_labels.py test_vangogh.jpg "Vincent van Gogh"
    python reverse_engineer_labels.py test_davinci.jpg "Leonardo da Vinci"
    python reverse_engineer_labels.py test_pollock.jpg "Jackson Pollock"
"""

import os
import json
import sys
import numpy as np
import tensorflow as tf
from PIL import Image

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'art_artist_classifier.keras')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'class_names.json')

IMG_SIZE = 224

def preprocess_image(image_path):
    """Preprocess image exactly as app.py does"""
    image = Image.open(image_path)
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    image = image.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(image).astype('float32')
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def reverse_engineer(image_path, known_artist):
    """Test a known image and print its raw prediction index"""
    
    print("\n" + "="*60)
    print("🔍 REVERSE ENGINEERING MODEL LABEL MAPPING")
    print("="*60)
    
    # Load model
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded")
    
    # Load class names (both sorted and unsorted)
    with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
        original_classes = json.load(f)
        sorted_classes = sorted(original_classes)
    
    print(f"\nTotal classes: {len(original_classes)}")
    
    # Preprocess image
    print(f"\nProcessing image: {image_path}")
    img_array = preprocess_image(image_path)
    
    # Predict
    print("Running inference...\n")
    predictions = model.predict(img_array, verbose=0)
    raw_probs = predictions[0]
    
    # Get predicted index
    predicted_index = np.argmax(raw_probs)
    confidence = raw_probs[predicted_index]
    
    # Results
    print("="*60)
    print("📊 RESULTS")
    print("="*60)
    print(f"Known Artist:        {known_artist}")
    print(f"Predicted Index:     {predicted_index}")
    print(f"Confidence:          {confidence:.4f} ({confidence*100:.2f}%)")
    print()
    print(f"Sorted mapping says: {sorted_classes[predicted_index]}")
    print(f"Original mapping says: {original_classes[predicted_index]}")
    print("="*60)
    
    # Show top 5 predictions
    print("\nTop 5 Raw Index Predictions:")
    top_indices = np.argsort(raw_probs)[::-1][:5]
    for i, idx in enumerate(top_indices):
        print(f"  {i+1}. Index {idx}: {raw_probs[idx]:.4f} ({raw_probs[idx]*100:.2f}%) - Sorted: {sorted_classes[idx]}")
    
    print("\n" + "="*60)
    print("💡 RECOMMENDATION:")
    print(f"   If this is truly {known_artist}, then:")
    print(f"   Index {predicted_index} → {known_artist}")
    print("="*60 + "\n")
    
    return predicted_index, known_artist

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        print("\n❌ Error: Missing arguments")
        print("Please provide: <image_path> <known_artist_name>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    known_artist = sys.argv[2]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image not found: {image_path}")
        sys.exit(1)
    
    reverse_engineer(image_path, known_artist)
