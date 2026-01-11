import os
import json
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import sys

# Define Base Directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'art_artist_classifier.keras')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'class_names.json')

# Helper function similar to app.py
IMG_SIZE = 224

def preprocess_image(image_path):
    print(f"Preprocessing image: {image_path}")
    image = Image.open(image_path)
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize
    image = image.resize((IMG_SIZE, IMG_SIZE))
    
    # To Array (0-255)
    img_array = np.array(image).astype('float32')
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    # Check stats
    print(f"Image shape: {img_array.shape}")
    print(f"Pixel min: {img_array.min()}, max: {img_array.max()}")
    print("Example pixel (0,0):", img_array[0,0,0,:])
    
    return img_array

def debug_inference(image_path):
    # 1. Load Resources
    print(f"Loading class names from: {CLASS_NAMES_PATH}")
    with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
        class_names = json.load(f)
        # CRITICAL: Sort alphabetically to match model training order
        class_names = sorted(class_names)
    print(f"Loaded {len(class_names)} classes.")
    print(f"First 5 classes (Sorted): {class_names[:5]}")

    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded.")
    
    # Check model output shape
    output_shape = model.output_shape
    print(f"Model output shape: {output_shape}")

    # 2. Preprocess
    img_array = preprocess_image(image_path)

    # 3. Predict
    print("\nRunning prediction...")
    predictions = model.predict(img_array)
    raw_probs = predictions[0]
    
    print("\nRaw Probabilities (Overview):")
    print(f"Min prob: {raw_probs.min():.6f}")
    print(f"Max prob: {raw_probs.max():.6f}")
    print(f"Sum probabilities: {raw_probs.sum():.6f}")

    # 4. Top 5 Analysis
    top_indices = np.argsort(raw_probs)[::-1][:5]
    
    print("\nTOP 5 PREDICTIONS:")
    print("-" * 30)
    for i, idx in enumerate(top_indices):
        label = class_names[idx] if idx < len(class_names) else "UNKNOWN_INDEX"
        prob = raw_probs[idx]
        print(f"{i+1}. {label} (Index {idx}): {prob:.4f} ({prob*100:.2f}%)")
    print("-" * 30)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python debug_model.py <path_to_image>")
        # Default to hero-bg.jpg if exists for testing
        test_img = os.path.join(BASE_DIR, '..', 'public', 'hero-bg.jpg')
        if os.path.exists(test_img):
            print(f"No image provided, using: {test_img}")
            debug_inference(test_img)
        else:
            print("Please provide an image path.")
    else:
        debug_inference(sys.argv[1])
