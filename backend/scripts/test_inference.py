"""
Standalone Test Script for Artist Classifier Model
===================================================
This script tests the model directly without the web server to verify:
1. Model loads correctly
2. Preprocessing is correct
3. Predictions make sense
4. Class labels are properly mapped

Usage:
    python test_inference.py <path_to_image>

Example:
    python test_inference.py test_image.jpg
"""

import os
import sys
import json
import numpy as np
from PIL import Image
import tensorflow as tf

# Configuration
MODEL_PATH = 'art_artist_classifier.keras'
CLASS_NAMES_PATH = 'class_names.json'
IMG_SIZE = 224

def load_model_and_classes():
    """Load the model and class names"""
    print("="*60)
    print("LOADING MODEL AND CLASS NAMES")
    print("="*60)
    
    # Load model
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully!\n")
    
    # Print model architecture
    print("MODEL ARCHITECTURE:")
    print("-"*60)
    model.summary()
    print("-"*60)
    
    # Check for rescaling layer
    has_rescaling = any('rescaling' in layer.name.lower() for layer in model.layers)
    if has_rescaling:
        print("\n⚠️  WARNING: Model has a built-in Rescaling layer!")
        print("⚠️  Model expects pixel values in [0, 255] range.")
    else:
        print("\n✅ No built-in Rescaling layer. Manual normalization needed.")
    
    # Load class names
    with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
        class_names = json.load(f)
    
    print(f"\n✅ Loaded {len(class_names)} artist classes")
    print("\nFirst 10 class names:")
    for i in range(min(10, len(class_names))):
        print(f"  Index {i}: {class_names[i]}")
    
    print("="*60 + "\n")
    return model, class_names, has_rescaling

def preprocess_image(image_path, normalize=True):
    """Preprocess image for model prediction"""
    print("="*60)
    print("PREPROCESSING IMAGE")
    print("="*60)
    print(f"Image path: {image_path}")
    
    # Load image
    image = Image.open(image_path)
    print(f"Original size: {image.size}")
    print(f"Original mode: {image.mode}")
    
    # Convert to RGB
    if image.mode != 'RGB':
        image = image.convert('RGB')
        print(f"Converted to RGB")
    
    # Resize
    image = image.resize((IMG_SIZE, IMG_SIZE))
    print(f"Resized to: {IMG_SIZE}x{IMG_SIZE}")
    
    # Convert to array
    img_array = np.array(image).astype('float32')
    
    print(f"\n🔍 BEFORE normalization:")
    print(f"   Shape: {img_array.shape}")
    print(f"   Min: {np.min(img_array):.2f}")
    print(f"   Max: {np.max(img_array):.2f}")
    print(f"   Mean: {np.mean(img_array):.2f}")
    
    if normalize:
        # Normalize to [0, 1]
        img_array = img_array / 255.0
        
        print(f"\n✅ AFTER normalization (÷ 255):")
        print(f"   Min: {np.min(img_array):.6f}")
        print(f"   Max: {np.max(img_array):.6f}")
        print(f"   Mean: {np.mean(img_array):.6f}")
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    print(f"\nFinal shape (with batch): {img_array.shape}")
    print("="*60 + "\n")
    
    return img_array

def predict(model, img_array, class_names):
    """Make prediction and display results"""
    print("="*60)
    print("MAKING PREDICTION")
    print("="*60)
    
    # Predict
    predictions = model.predict(img_array, verbose=1)
    
    print(f"\n📊 PREDICTION RESULTS:")
    print(f"   Output shape: {predictions.shape}")
    print(f"   Sum of probabilities: {np.sum(predictions[0]):.6f}")
    print(f"   Min probability: {np.min(predictions[0]):.6f}")
    print(f"   Max probability: {np.max(predictions[0]):.6f}")
    
    # Get predicted class
    predicted_idx = np.argmax(predictions[0])
    predicted_confidence = predictions[0][predicted_idx]
    
    print(f"\n🎯 TOP PREDICTION:")
    print(f"   Index: {predicted_idx}")
    print(f"   Artist: {class_names[predicted_idx]}")
    print(f"   Confidence: {predicted_confidence:.6f} ({predicted_confidence*100:.2f}%)")
    
    # Top 5 predictions
    print(f"\n📋 TOP 5 PREDICTIONS:")
    top_5_indices = np.argsort(predictions[0])[-5:][::-1]
    for rank, idx in enumerate(top_5_indices, 1):
        artist = class_names[idx]
        confidence = predictions[0][idx]
        print(f"   {rank}. [{idx:2d}] {artist:40s} {confidence:.6f} ({confidence*100:.2f}%)")
    
    print("="*60 + "\n")
    
    return predicted_idx, predicted_confidence

def main():
    """Main test function"""
    if len(sys.argv) < 2:
        print("Usage: python test_inference.py <path_to_image>")
        print("\nExample:")
        print("  python test_inference.py test_image.jpg")
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    print("\n" + "🎨"*30)
    print("ARTIST CLASSIFIER - STANDALONE TEST")
    print("🎨"*30 + "\n")
    
    # Load model and classes
    model, class_names, has_rescaling = load_model_and_classes()
    
    # Preprocess image (normalize unless model has built-in rescaling)
    img_array = preprocess_image(image_path, normalize=not has_rescaling)
    
    # Make prediction
    predicted_idx, confidence = predict(model, img_array, class_names)
    
    print("\n" + "✅"*30)
    print("TEST COMPLETE!")
    print("✅"*30 + "\n")
    
    # Test with both normalization approaches if uncertain
    if not has_rescaling and confidence < 0.5:
        print("\n⚠️  Low confidence detected. Testing WITHOUT normalization...")
        img_array_no_norm = preprocess_image(image_path, normalize=False)
        predict(model, img_array_no_norm, class_names)

if __name__ == "__main__":
    main()
