import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface ArtistCardProps {
  name: string;
  genre: string;
  nationality: string;
  years: string;
  wikipedia: string;
  index: number;
}

const ArtistCard = ({ name, genre, nationality, years, wikipedia, index }: ArtistCardProps) => {
  const primaryGenre = genre.split(",")[0].trim();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Construct image path: /artists/Firstname_Lastname.jpg
  // Replace all whitespace with underscores
  const imagePath = `/artists/${name.replace(/\s+/g, "_")}.jpg`;

  // Debug logging
  console.log("Loading image:", imagePath);

  // Generate fallback gradient color
  const hue = (name.charCodeAt(0) * 7 + name.charCodeAt(1) * 3) % 40 + 20;

  const handleImageError = () => {
    console.error("Failed to load:", imagePath);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block aspect-[3/4] w-full overflow-hidden shadow-subtle"
    >
      {/* Background Image with Zoom Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {!imageError ? (
          <img
            src={imagePath}
            alt={name}
            onError={handleImageError}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${hue} 60% 95%) 0%, hsl(${hue + 20} 50% 90%) 100%)`,
            }}
          >
            {/* Fallback Initial if image fails */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-serif text-8xl italic"
                style={{ color: `hsl(${hue} 40% 40% / 0.3)` }}
              >
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Artist Information - Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 + 0.2 }}
        >
          <h3 className="font-serif text-lg italic mb-1 leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block h-1 w-1 rounded-full bg-amber-700 dark:bg-gold" />
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/90">
              {primaryGenre}
            </p>
          </div>
          <p className="text-xs font-light uppercase tracking-[0.1em] text-white/70">
            {nationality} · {years}
          </p>

          {/* Wikipedia Link */}
          {wikipedia && (
            <a
              href={wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-medium uppercase tracking-[0.15em] text-amber-700 dark:text-gold hover:text-amber-600 dark:hover:text-gold/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              Read Bio
            </a>
          )}
        </motion.div>
      </div>

      {/* Hover Indicator */}
      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <ExternalLink className="h-4 w-4 text-white" />
        </div>
      </motion.div>

      {/* Hover Shadow Enhancement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? 'var(--shadow-gold)'
            : 'var(--shadow-subtle)'
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ArtistCard;
