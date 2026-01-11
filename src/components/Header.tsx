import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position globally - persists across page navigations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]); // Re-run when route changes

  // Seamless materialization background with backdrop blur
  const headerBg = scrolled
    ? 'bg-black/60 backdrop-blur-xl border-b border-amber-900/20'
    : 'bg-transparent';

  // Universal golden accent styling for all links
  const linkStyle = 'text-amber-400/90 hover:text-amber-200 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-all duration-300';

  // Active link styling with brighter gold
  const activeLinkStyle = 'text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${headerBg}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center group">
          <motion.img
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            src="/kala-logo-transparent.png"
            alt="కళ | Kala"
            className="h-20 md:h-24 w-auto min-w-[60px] transition-all duration-300"
          />
        </Link>

        <nav className="flex items-center gap-3 md:gap-6">
          <a
            href="https://github.com/b-rahul07/kala-art-ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs md:text-sm font-medium uppercase tracking-wider px-2 py-2 ${linkStyle}`}
          >
            GitHub
          </a>
          <Link
            to="/collection"
            className={`text-xs md:text-sm font-medium uppercase tracking-wider px-2 py-2 ${location.pathname === "/collection" ? activeLinkStyle : linkStyle
              }`}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`text-xs md:text-sm font-medium uppercase tracking-wider px-2 py-2 ${location.pathname === "/about" ? activeLinkStyle : linkStyle
              }`}
          >
            About
          </Link>
          <div className="ml-2 h-4 w-px bg-amber-400/40" />
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
