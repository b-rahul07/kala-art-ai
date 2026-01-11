import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ArtistPortraitProps {
    wikipediaUrl: string;
    artistName: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'h-12 w-12 text-xl',
    md: 'h-16 w-16 text-2xl',
    lg: 'h-24 w-24 text-4xl'
};

const ArtistPortrait = ({ wikipediaUrl, artistName, size = 'md' }: ArtistPortraitProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWikipediaImage = async () => {
            try {
                // Extract artist name from Wikipedia URL
                const urlParts = wikipediaUrl.split('/wiki/');
                if (urlParts.length < 2) {
                    setError(true);
                    setIsLoading(false);
                    return;
                }

                const pageName = urlParts[1];

                // Fetch image from Wikipedia API
                const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageName)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                const pages = data.query?.pages;
                if (pages) {
                    const pageId = Object.keys(pages)[0];
                    const thumbnail = pages[pageId]?.thumbnail?.source;

                    if (thumbnail) {
                        setImageUrl(thumbnail);
                    } else {
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error('Failed to fetch Wikipedia image:', err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWikipediaImage();
    }, [wikipediaUrl]);

    // Generate initial and color from artist name
    const initial = artistName.charAt(0).toUpperCase();
    const hue = (artistName.charCodeAt(0) * 7 + artistName.charCodeAt(1) * 3) % 40 + 20;

    if (isLoading) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-muted animate-pulse`} />
        );
    }

    if (error || !imageUrl) {
        // Fallback: Stylish initial in circle
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-serif italic shadow-subtle`}
                style={{
                    background: `linear-gradient(135deg, hsl(${hue} 60% 95%) 0%, hsl(${hue + 20} 50% 90%) 100%)`
                }}
            >
                <span style={{ color: `hsl(${hue} 40% 40% / 0.6)` }}>
                    {initial}
                </span>
            </motion.div>
        );
    }

    // Display Wikipedia image
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-subtle border-2 border-gold/20`}
        >
            <img
                src={imageUrl}
                alt={artistName}
                className="h-full w-full object-cover"
            />
        </motion.div>
    );
};

export default ArtistPortrait;
