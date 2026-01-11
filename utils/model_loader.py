import os
import gdown


def download_model():
    """
    Download the art artist classifier model from Google Drive if it doesn't exist.
    Uses a hardcoded File ID for the specific model.
    """
    # Use cache directory if available (for Docker), otherwise current directory
    cache_dir = os.environ.get('MODEL_CACHE_DIR', '.')
    MODEL_PATH = os.path.join(cache_dir, 'art_artist_classifier.keras')
    FILE_ID = '1yVudBpUunOaEW1ilgROLrQvyqE9Bmzgv'
    
    # Check if model already exists
    if os.path.exists(MODEL_PATH):
        file_size_mb = os.path.getsize(MODEL_PATH) / (1024 * 1024)
        print(f"✅ Model already exists: {MODEL_PATH} ({file_size_mb:.2f} MB)")
        return MODEL_PATH
    
    # Model doesn't exist, download from Google Drive
    print(f"📥 Model not found. Downloading from Google Drive...")
    print(f"   File ID: {FILE_ID}")
    print(f"   Destination: {MODEL_PATH}")
    
    try:
        # Construct Google Drive URL
        url = f"https://drive.google.com/uc?id={FILE_ID}"
        
        # Download with progress display
        print("⏳ Download in progress (this may take 1-2 minutes)...")
        gdown.download(url, MODEL_PATH, quiet=False)
        
        # Verify download
        if os.path.exists(MODEL_PATH):
            file_size_mb = os.path.getsize(MODEL_PATH) / (1024 * 1024)
            print(f"✅ Download successful! ({file_size_mb:.2f} MB)")
            return MODEL_PATH
        else:
            print("❌ Download failed: File not found after download")
            return None
            
    except Exception as e:
        print(f"❌ Error downloading model: {e}")
        print("   Check that the Google Drive file is shared publicly")
        return None
