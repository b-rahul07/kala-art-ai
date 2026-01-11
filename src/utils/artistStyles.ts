// Historically accurate art style/movement mapping for all 51 artists
// Based on the alphabetically sorted class names from the model
export const artistStyles: Record<string, string> = {
    // A
    "Albrecht Durer": "Northern Renaissance",
    "Alfred Sisley": "Impressionism",
    "Amedeo Modigliani": "Expressionism",
    "Andy Warhol": "Pop Art",
    "Artemisia Gentileschi": "Baroque",

    // B-C
    "Berthe Morisot": "Impressionism",
    "Camille Pissarro": "Impressionism",
    "Canaletto": "Vedutism",
    "Caravaggio": "Baroque",
    "Claude Monet": "Impressionism",

    // D-E
    "Diego Velazquez": "Baroque",
    "Edgar Degas": "Impressionism",
    "Edouard Manet": "Realism / Impressionism",
    "Edvard Munch": "Expressionism",
    "El Greco": "Mannerism",
    "Eugene Delacroix": "Romanticism",

    // F-G
    "Francisco Goya": "Romanticism",
    "Frida Kahlo": "Surrealism",
    "Georges Seurat": "Neo-Impressionism",
    "Giotto di Bondone": "Proto-Renaissance",
    "Gustav Klimt": "Art Nouveau",
    "Gustave Courbet": "Realism",

    // H
    "Henri Matisse": "Fauvism",
    "Henri Rousseau": "Naive Art / Primitivism",
    "Henri de Toulouse-Lautrec": "Post-Impressionism",
    "Hieronymus Bosch": "Northern Renaissance",

    // J-K
    "Jackson Pollock": "Abstract Expressionism",
    "Jan van Eyck": "Northern Renaissance",
    "Joan Miro": "Surrealism",
    "Kazimir Malevich": "Suprematism",

    // L-M
    "Leonardo da Vinci": "High Renaissance",
    "Marc Chagall": "Modernism",
    "Michelangelo": "High Renaissance",
    "Mikhail Vrubel": "Symbolism",

    // P
    "Pablo Picasso": "Cubism",
    "Paul Cezanne": "Post-Impressionism",
    "Paul Gauguin": "Post-Impressionism",
    "Paul Klee": "Expressionism / Bauhaus",
    "Peter Paul Rubens": "Baroque",
    "Pierre-Auguste Renoir": "Impressionism",
    "Piet Mondrian": "De Stijl",
    "Pieter Bruegel": "Northern Renaissance",

    // R
    "Raphael": "High Renaissance",
    "Rembrandt": "Baroque",
    "René Magritte": "Surrealism",

    // S-T
    "Salvador Dali": "Surrealism",
    "Sandro Botticelli": "Early Renaissance",
    "Titian": "High Renaissance",

    // V-W
    "Vasiliy Kandinsky": "Abstract Art",
    "Vincent van Gogh": "Post-Impressionism",
    "William Turner": "Romanticism",
};

export const getArtistStyle = (artistName: string): string => {
    // Handle both underscore and space formats
    const normalizedName = artistName.replace(/_/g, ' ');
    return artistStyles[normalizedName] || artistStyles[artistName] || "Modern Art";
};
