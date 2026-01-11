import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Prediction {
    artist: string;
    raw_name: string;
    confidence: number;
    percentage: number;
}

interface ArtistPredictionsProps {
    predictions: Prediction[];
    isLoading?: boolean;
}

const ArtistPredictions: React.FC<ArtistPredictionsProps> = ({
    predictions,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
            >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
                <p className="text-sm font-light uppercase tracking-[0.2em] text-muted-foreground">
                    Analyzing artwork...
                </p>
            </motion.div>
        );
    }

    if (!predictions || predictions.length === 0) {
        return null;
    }

    const topPrediction = predictions[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
        >
            {/* Top Prediction Card */}
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-xs font-light uppercase tracking-[0.2em] text-muted-foreground mb-2">
                                Most Likely Artist
                            </p>
                            <h3 className="font-serif text-2xl italic text-foreground">
                                {topPrediction.artist}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                            <Palette className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">
                                {topPrediction.percentage}%
                            </span>
                        </div>
                    </div>
                    <Progress value={topPrediction.percentage} className="h-2" />
                </div>
            </div>

            {/* All Predictions */}
            <div className="space-y-3">
                <p className="text-xs font-light uppercase tracking-[0.2em] text-muted-foreground">
                    Other Possibilities
                </p>
                {predictions.slice(1).map((prediction, index) => (
                    <motion.div
                        key={prediction.artist}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground mb-2">
                                {prediction.artist}
                            </p>
                            <Progress value={prediction.percentage} className="h-1.5" />
                        </div>
                        <span className="ml-4 text-sm text-muted-foreground font-light">
                            {prediction.percentage}%
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Learn More Link */}
            <motion.a
                href={`https://en.wikipedia.org/wiki/${topPrediction.artist.replace(/ /g, '_')}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
                Learn more about {topPrediction.artist}
                <ExternalLink className="h-3 w-3" />
            </motion.a>
        </motion.div>
    );
};

export default ArtistPredictions;
