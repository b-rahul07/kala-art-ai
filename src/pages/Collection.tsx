import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistCard from "@/components/ArtistCard";
import { artistStyles } from "../utils/artistStyles";

interface Artist {
  id: string;
  name: string;
  genre: string;
  nationality: string;
  years: string;
  wikipedia: string;
}

const Collection = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        // Fetch the CSV file
        const response = await fetch('/data/artists.csv');
        const csvText = await response.text();

        // Parse CSV
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');

        const parsedArtists: Artist[] = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          const name = values[0]?.trim() || '';
          const nationality = values[1]?.trim() || '';
          const years = values[2]?.trim() || '';
          const wikipedia = values[3]?.trim() || '';

          // Get genre from artistStyles
          const genre = artistStyles[name] || "Modern Art";

          return {
            id: `artist-${index}`,
            name,
            genre,
            nationality,
            years,
            wikipedia
          };
        });

        setArtists(parsedArtists);
      } catch (error) {
        console.error("Failed to load artists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArtists();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow px-8 pb-24 pt-24 md:pt-48 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h1 className="font-serif text-4xl italic text-foreground md:text-5xl">
            The Collection
          </h1>
          <p className="mt-4 text-sm font-light text-gray-900 dark:text-muted-foreground">
            {artists.length} artists కళ | Kala can recognize
          </p>
        </motion.div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-64 items-center justify-center"
          >
            <p className="text-sm font-light uppercase tracking-[0.2em] text-gray-700 dark:text-muted-foreground animate-pulse">
              Loading collection...
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {artists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                genre={artist.genre}
                nationality={artist.nationality}
                years={artist.years}
                wikipedia={artist.wikipedia}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
