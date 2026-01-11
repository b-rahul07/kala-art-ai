import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image } from "lucide-react";

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          backgroundColor: isDragging ? "rgba(245, 245, 220, 0.15)" : undefined,
        }}
        className={`group relative flex items-center gap-3 rounded-full px-8 py-4 shadow-gold transition-all duration-300 animate-breathe hover:shadow-elevated ${isDragging
            ? "bg-gold/20 text-foreground scale-105"
            : "bg-foreground text-background"
          }`}
      >
        <motion.span
          className="relative flex items-center gap-3"
        >
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10 }}
            animate={{ rotate: isDragging ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image className="h-4 w-4" />
          </motion.span>
          <span className="text-sm font-medium uppercase tracking-[0.15em]">
            {isDragging ? "Drop to Upload" : "Upload Artwork"}
          </span>
          <Upload className={`h-4 w-4 transition-transform duration-300 ${isDragging ? "translate-y-[-4px]" : "group-hover:translate-y-[-2px]"
            }`} />
        </motion.span>

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold via-terracotta to-gold blur-md transition-opacity duration-300"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            opacity: isDragging ? 0.8 : 0
          }}
          transition={{
            backgroundPosition: { duration: 3, repeat: Infinity },
            opacity: { duration: 0.3 }
          }}
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Enhanced glow on drag */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 -z-20 rounded-full bg-gold/30 blur-2xl"
          />
        )}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-[10px] font-light uppercase tracking-[0.2em] text-muted-foreground"
      >
        {isDragging ? "Release to analyze" : "PNG, JPG, or WEBP • Max 10MB"}
      </motion.p>
    </motion.div>
  );
};

export default UploadButton;
