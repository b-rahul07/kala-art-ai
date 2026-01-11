import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/ImageUpload';
import ArtistPredictions from '@/components/ArtistPredictions';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Prediction {
    artist: string;
    raw_name: string;
    confidence: number;
    percentage: number;
}

const ArtistClassifier = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleImageSelect = (file: File) => {
        setSelectedImage(file);
        setError('');
        setPredictions([]);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleClear = () => {
        setSelectedImage(null);
        setPreview('');
        setPredictions([]);
        setError('');
    };

    const handleClassify = async () => {
        if (!selectedImage) return;

        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/classify`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Classification failed. Please try again.');
            }

            const data = await response.json();

            if (data.success) {
                setPredictions(data.predictions);
            } else {
                throw new Error(data.error || 'Classification failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred. Make sure the backend server is running.');
            console.error('Classification error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-background">
            <Header />

            <main className="px-8 pb-24 pt-32 md:px-16 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                                AI-Powered Recognition
                            </span>
                        </div>
                        <h1 className="font-serif text-4xl italic text-foreground md:text-5xl mb-4">
                            Artist Classifier
                        </h1>
                        <p className="text-sm font-light text-muted-foreground max-w-2xl mx-auto">
                            Upload an artwork image and let our AI identify the artist.
                            Trained on 51 master artists from various periods and styles.
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="mb-8">
                        <ImageUpload
                            onImageSelect={handleImageSelect}
                            preview={preview}
                            onClear={handleClear}
                        />
                    </div>

                    {/* Classify Button */}
                    {selectedImage && !predictions.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center mb-8"
                        >
                            <Button
                                onClick={handleClassify}
                                disabled={isLoading}
                                size="lg"
                                className="px-8"
                            >
                                {isLoading ? 'Analyzing...' : 'Identify Artist'}
                            </Button>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}

                    {/* Results */}
                    <ArtistPredictions predictions={predictions} isLoading={isLoading} />

                    {/* Try Another Button */}
                    {predictions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center mt-8"
                        >
                            <Button
                                onClick={handleClear}
                                variant="outline"
                                size="lg"
                            >
                                Try Another Image
                            </Button>
                        </motion.div>
                    )}

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 p-6 rounded-lg border border-border bg-card/50"
                    >
                        <h3 className="font-serif text-lg italic text-foreground mb-3">
                            How it works
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                Our deep learning model has been trained on thousands of artworks from 51 renowned artists
                                spanning multiple centuries and artistic movements.
                            </p>
                            <p>
                                The AI analyzes brushwork, color palettes, composition, and stylistic elements to determine
                                which artist's style the uploaded artwork most closely resembles.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ArtistClassifier;
