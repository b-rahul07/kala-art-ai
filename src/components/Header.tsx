import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-border/40 backdrop-blur-xl bg-background/60 supports-[backdrop-filter]:bg-background/40"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        <Link to="/" className="flex items-center group">
          <motion.img
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            src="/kala-logo-transparent.png"
            alt="కళ | Kala"
            className="h-24 w-auto transition-all duration-300"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <a
            href="https://github.com/b-rahul07/kala-art-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            to="/collection"
            className={`text-sm font-medium uppercase tracking-wider transition-colors ${location.pathname === "/collection"
              ? "text-amber-700 dark:text-gold"
              : "text-foreground/80 hover:text-foreground"
              }`}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium uppercase tracking-wider transition-colors ${location.pathname === "/about"
              ? "text-amber-700 dark:text-gold"
              : "text-foreground/80 hover:text-foreground"
              }`}
          >
            About
          </Link>
          <div className="ml-2 h-4 w-px bg-border/60" />
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
