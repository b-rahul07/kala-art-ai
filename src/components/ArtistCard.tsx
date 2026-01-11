import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Format artist name for Wikipedia API
  const formatNameForWikipedia = (artistName: string): string => {
    return artistName
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('_');
  };

  useEffect(() => {
    const fetchWikipediaImage = async () => {
      try {
        // Extract page name from Wikipedia URL
        const urlParts = wikipedia.split('/wiki/');
        if (urlParts.length < 2) {
          console.warn(`Invalid Wikipedia URL for ${name}: ${wikipedia}`);
          return;
        }

        let pageName = decodeURIComponent(urlParts[1]);

        // Try primary API call
        const primaryApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageName)}&prop=pageimages&format=json&pithumbsize=500&origin=*&redirects=1`;

        let response = await fetch(primaryApiUrl);
        let data = await response.json();

        let pages = data.query?.pages;
        let pageId = pages ? Object.keys(pages)[0] : null;
        let thumbnail = pageId && pages[pageId]?.thumbnail?.source;

        // If primary fetch failed or returned no image, try fallback search
        if (!thumbnail || pageId === '-1') {
          console.warn(`Primary fetch failed for ${name}, trying fallback search. URL: ${primaryApiUrl}`);

          // Format name and try search API
          const formattedName = formatNameForWikipedia(name);
          const searchApiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(formattedName)}&format=json&origin=*`;

          const searchResponse = await fetch(searchApiUrl);
          const searchData = await searchResponse.json();

          if (searchData.query?.search?.length > 0) {
            const bestMatch = searchData.query.search[0].title;
            console.log(`Found fallback match for ${name}: ${bestMatch}`);

            // Try fetching image with the search result
            const fallbackApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(bestMatch)}&prop=pageimages&format=json&pithumbsize=500&origin=*&redirects=1`;

            const fallbackResponse = await fetch(fallbackApiUrl);
            const fallbackData = await fallbackResponse.json();

            const fallbackPages = fallbackData.query?.pages;
            const fallbackPageId = fallbackPages ? Object.keys(fallbackPages)[0] : null;
            thumbnail = fallbackPageId && fallbackPages[fallbackPageId]?.thumbnail?.source;

            if (!thumbnail) {
              console.warn(`Fallback search also failed for ${name}. URL: ${fallbackApiUrl}`);
            }
          }
        }

        if (thumbnail) {
          setImageUrl(thumbnail);
        } else {
          console.warn(`No image found for ${name} after all attempts`);
          // Set to null to show gradient fallback
          setImageUrl(null);
        }
      } catch (err) {
        console.error(`Failed to fetch Wikipedia image for ${name}:`, err);
        setImageUrl(null);
      }
    };

    fetchWikipediaImage();
  }, [wikipedia, name]);

  // Generate fallback gradient color
  const hue = (name.charCodeAt(0) * 7 + name.charCodeAt(1) * 3) % 40 + 20;

  return (
    <motion.a
      href={wikipedia}
      target="_blank"
      rel="noopener noreferrer"
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
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : `linear-gradient(135deg, hsl(${hue} 60% 95%) 0%, hsl(${hue + 20} 50% 90%) 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Fallback Initial if no image */}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-8xl italic"
              style={{ color: `hsl(${hue} 40% 40% / 0.3)` }}
            >
              {name.charAt(0)}
            </span>
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
    </motion.a>
  );
};

export default ArtistCard;
