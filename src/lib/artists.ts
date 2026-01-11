export interface Artist {
  id: number;
  name: string;
  years: string;
  genre: string;
  nationality: string;
  bio: string;
  wikipedia: string;
  paintings: number;
}

export const parseArtistsCSV = async (): Promise<Artist[]> => {
  const response = await fetch('/data/artists.csv');
  const text = await response.text();
  
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  
  const artists: Artist[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length >= 8) {
      artists.push({
        id: parseInt(values[0], 10),
        name: values[1],
        years: values[2],
        genre: values[3],
        nationality: values[4],
        bio: values[5],
        wikipedia: values[6],
        paintings: parseInt(values[7], 10),
      });
    }
  }
  
  return artists;
};
