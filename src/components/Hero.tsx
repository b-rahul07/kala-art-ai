import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload } from "lucide-react";
import UploadButton from "./UploadButton";
import ClassificationResult from "./ClassificationResult";
import { cn } from "@/lib/utils";

interface Prediction {
  artist: string;
  raw_name: string;
  confidence: number;
  percentage: number;
  wikipedia?: string;
}

const loadingPhrases = [
  "Analyzing Artistic Signature...",
  "Consulting the Archives...",
  "Studying the Canvas...",
  "Deconstructing Composition...",
  "Deciphering Style...",
  "Analyzing Brushwork..."
];

const Hero = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>("");
  const [loadingPhrase, setLoadingPhrase] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  // Global Drag and Drop Handlers
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if we're leaving the document
    if (e.relatedTarget === null) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  }, []);

  // Attach global event listeners
  useEffect(() => {
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleDragOver, handleDragLeave, handleDrop]);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setPredictions([]);
    setError("");

    // Select random loading phrase
    const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
    setLoadingPhrase(randomPhrase);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const apiUrl = import.meta.env.VITE_API_URL || 'https://ricky07-b-kala-api.hf.space';
      const response = await fetch(`${apiUrl}/api/classify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Classification failed. Please try again.');
      }

      const data = await response.json();

      // DEBUG: Log raw server response
      console.log("🔍 Raw API Response:", data);
      console.log("🔍 Predictions array:", data.predictions);

      if (data.success) {
        setPredictions(data.predictions);
      } else {
        throw new Error(data.error || 'Classification failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Make sure the backend server is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPredictions([]);
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Global Drag Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm border-4 border-dashed border-gold m-4 rounded-xl pointer-events-none"
          >
            <div className="text-center">
              <Upload className="mx-auto h-16 w-16 text-gold mb-4 animate-bounce" />
              <h2 className="text-3xl font-serif text-foreground">Drop Artwork Here</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP BANNER SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="hero-bg-image" />

        {/* Banner Content - Stacked Vertically */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6">

          {/* కళ | kala Logo */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl text-gold tracking-tight border-2 border-terracotta/40 px-10 py-6 rounded-lg bg-black/30 backdrop-blur-sm shadow-2xl"
          >
            కళ | kala
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl italic text-white drop-shadow-2xl"
          >
            Where Art Finds Itself
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl font-serif text-xl md:text-2xl font-light text-white/95 leading-relaxed drop-shadow-2xl"
          >
            Upload any artwork and discover its creator. <span className="text-amber-300 font-medium">Powered by deep learning</span> to recognize the styles of <span className="text-gold font-medium">50 legendary masters</span>.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section className="relative flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">

        <div className="w-full max-w-2xl mx-auto flex justify-center">
          {/* Upload and Results Area */}
          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center space-y-12 w-full"
              >
                {/* Upload Button Area - Centered */}
                <div className="w-full max-w-md mx-auto p-8 border-2 border-border shadow-lg bg-card hover:bg-card/80 hover:shadow-xl transition-all duration-300 flex flex-col items-center rounded-2xl">
                  <UploadButton onUpload={handleUpload} />
                  <p className="mt-4 text-sm text-muted-foreground">
                    or drag and drop anywhere on screen
                  </p>
                </div>

                {/* How it Works Description */}
                <div className="space-y-4 max-w-lg">
                  <h3 className="font-serif text-2xl text-foreground">How it Works</h3>
                  <p className="font-light text-muted-foreground leading-relaxed">
                    కళ | Kala uses a fine-tuned EfficientNetV2 deep learning model, trained on over 8,000 paintings.
                    Simply upload an image, and our AI will deconstruct brushwork, texture, and color palettes
                    to identify the artist with mathematical precision.
                  </p>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center w-full"
              >
                {isAnalyzing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-8 py-12"
                  >
                    <motion.div
                      className="relative h-64 w-64 overflow-hidden rounded-lg shadow-gold"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <img
                        src={uploadedImage}
                        alt="Analyzing"
                        className="h-full w-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="h-2 w-2 rounded-full bg-gold"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.p
                          className="font-serif text-lg italic tracking-wider text-foreground"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {loadingPhrase}
                        </motion.p>
                        <motion.div
                          className="h-2 w-2 rounded-full bg-terracotta"
                          animate={{ scale: [1.3, 1, 1.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </div>

                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-6 py-8"
                  >
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center w-full">
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 rounded-full bg-muted px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:bg-muted/80 hover:shadow-subtle"
                    >
                      <Sparkles className="h-3 w-3" />
                      Try again
                    </motion.button>
                  </motion.div>
                ) : predictions.length > 0 ? (
                  <div className="w-full space-y-8">
                    <ClassificationResult
                      imageUrl={uploadedImage}
                      predictions={predictions}
                    />
                    <div className="flex justify-center">
                      <motion.button
                        onClick={handleReset}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 rounded-full bg-muted px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:bg-muted/80 hover:shadow-subtle border border-border"
                      >
                        <Sparkles className="h-3 w-3" />
                        Analyze another masterpiece
                      </motion.button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Hero;
