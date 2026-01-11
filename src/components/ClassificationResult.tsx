import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getArtistStyle } from "@/utils/artistStyles";

interface Prediction {
  artist: string;
  raw_name: string;
  confidence: number;
  percentage: number;
  wikipedia?: string;
}

interface ClassificationResultProps {
  imageUrl: string;
  predictions: Prediction[];
}

const ClassificationResult = ({
  imageUrl,
  predictions,
}: ClassificationResultProps) => {
  if (!predictions || predictions.length === 0) return null;

  const topPrediction = predictions[0];
  const otherPredictions = predictions.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      {/* Image with elegant frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative h-64 w-64 overflow-hidden shadow-gold md:h-80 md:w-80">
          <img
            src={imageUrl}
            alt="Analyzed artwork"
            className="h-full w-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-gold" />
        <div className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-gold" />
        <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-terracotta" />
        <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-terracotta" />
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        {/* Confidence percentage with animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="flex items-baseline gap-1"
        >
          <span className="font-serif text-6xl italic text-foreground md:text-7xl">
            {topPrediction.percentage}
          </span>
          <span className="text-2xl text-amber-700 dark:text-gold">%</span>
        </motion.div>

        {/* Artist name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-amber-700 dark:text-gold">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-[0.3em]">
              Matches style of
            </span>
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="font-serif text-3xl italic text-foreground md:text-4xl">
            {topPrediction.artist}
          </h2>
          <p className="text-base font-medium text-muted-foreground mt-2">
            {getArtistStyle(topPrediction.artist)}
          </p>
          <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-gold to-terracotta" />

          {/* Wikipedia Read More Link */}
          {topPrediction.wikipedia && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex flex-col items-center gap-2"
            >
              <p className="text-sm font-light text-gray-600 dark:text-muted-foreground">
                Curious to learn more?
              </p>
              <a
                href={topPrediction.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="group font-serif text-base italic text-amber-700 dark:text-gold transition-all duration-300 hover:text-amber-800 dark:hover:text-gold/80"
              >
                Read full biography of {topPrediction.artist} on Wikipedia →
                <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Other possibilities */}
        {otherPredictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 w-full max-w-md"
          >
            <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-gray-700 dark:text-muted-foreground">
              Other Possibilities
            </p>
            <div className="space-y-2">
              {otherPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.artist}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-sm font-light text-foreground">
                    {prediction.artist}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-muted-foreground">
                    {prediction.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ClassificationResult;
