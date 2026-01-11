import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  isHomePage?: boolean;
}

const ThemeToggle = ({ isHomePage = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  // Match navigation link styling
  const iconColor = isHomePage
    ? 'text-amber-400 hover:text-white'
    : 'text-foreground/80 hover:text-foreground';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex h-8 w-8 items-center justify-center transition-colors duration-300 ${iconColor}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
      >
        <Sun className="h-4 w-4" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : -180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
