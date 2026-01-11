import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use golden text on home page, dark text on other pages
  const isHomePage = location.pathname === '/';

  // Golden theme for home page, standard for other pages
  const textColor = isHomePage
    ? 'text-amber-400 hover:text-white'
    : 'text-foreground/80 hover:text-foreground';
  const activeColor = isHomePage
    ? 'text-white'
    : 'text-amber-700 dark:text-gold';

  // Dynamic background based on scroll - deep charcoal when scrolled
  const headerBg = scrolled
    ? 'bg-black/90 backdrop-blur-md border-b border-amber-400/20'
    : isHomePage
      ? 'bg-transparent'
      : 'bg-background/80 backdrop-blur-md border-b border-border/40';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
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
            className={`text-sm font-medium uppercase tracking-wider transition-colors ${textColor}`}
          >
            GitHub
          </a>
          <Link
            to="/collection"
            className={`text-sm font-medium uppercase tracking-wider transition-colors ${location.pathname === "/collection"
              ? activeColor
              : textColor
              }`}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium uppercase tracking-wider transition-colors ${location.pathname === "/about"
              ? activeColor
              : textColor
              }`}
          >
            About
          </Link>
          <div className="ml-2 h-4 w-px bg-amber-400/40" />
          <ThemeToggle isHomePage={isHomePage} />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
