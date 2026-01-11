import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Match navigation link styling - theme-aware for high contrast
  const iconStyle = theme === 'light'
    ? 'text-amber-700 hover:text-amber-900 hover:drop-shadow-[0_0_8px_rgba(146,64,14,0.3)] transition-all duration-300'
    : 'text-amber-400/90 hover:text-amber-200 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-all duration-300';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex h-8 w-8 items-center justify-center ${iconStyle}`}
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
