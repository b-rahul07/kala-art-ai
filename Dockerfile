# Use Python 3.10 slim image for smaller size
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies for TensorFlow and Pillow
RUN apt-get update && apt-get install -y \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create cache directory for model downloads with write permissions
RUN mkdir -p /app/cache && chmod 777 /app/cache

# Set environment variable for cache directory
ENV MODEL_CACHE_DIR=/app/cache

# Expose Hugging Face Spaces port
EXPOSE 7860

# Run gunicorn on port 7860
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:7860", "--timeout", "120", "--workers", "1"]
