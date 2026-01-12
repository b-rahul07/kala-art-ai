import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  // Track scroll position globally - persists across page navigations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Theme-aware seamless materialization background with backdrop blur
  const headerBg = scrolled || isOpen
    ? theme === 'light'
      ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200'
      : 'bg-black/60 backdrop-blur-xl border-b border-amber-900/20'
    : 'bg-transparent';

  // Theme-aware golden accent styling for all links
  const linkStyle = theme === 'light'
    ? 'text-[hsl(38,92%,55%)] font-extrabold hover:text-amber-600 hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-300'
    : 'text-amber-400/90 hover:text-amber-200 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-all duration-300';

  // Active link styling with enhanced contrast
  const activeLinkStyle = theme === 'light'
    ? 'text-amber-600 drop-shadow-[0_0_8px_rgba(146,64,14,0.3)] font-black'
    : 'text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]';

  const toggleMenu = () => setIsOpen(!isOpen);

  const MobileLink = ({ to, children, href }: { to?: string; children: React.ReactNode; href?: string }) => {
    const isExternal = !!href;
    const Component = isExternal ? 'a' : Link;
    const props = isExternal
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { to: to! };

    const isActive = !isExternal && location.pathname === to;

    return (
      <Component
        {...props as any}
        className={`block text-xl font-serif py-4 border-b border-border/50 w-full text-center ${isActive ? activeLinkStyle : linkStyle
          }`}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </Component>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full max-w-full z-[100] transition-all duration-500 ${headerBg}`}
    >
      <div className="w-full max-w-full mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center group z-50 flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
            src="/kala-logo-transparent.png"
            alt="కళ | Kala"
            className="h-12 md:h-16 lg:h-20 w-auto max-w-[120px] md:max-w-none transition-all duration-300"
          />
        </Link>

        <div className="flex-1" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-nowrap flex-shrink-0">
          <a
            href="https://github.com/b-rahul07/kala-art-ai"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm md:text-base font-medium uppercase tracking-wider px-2 py-2 whitespace-nowrap ${linkStyle}`}
          >
            GitHub
          </a>
          <Link
            to="/collection"
            className={`text-sm md:text-base font-medium uppercase tracking-wider px-2 py-2 whitespace-nowrap ${location.pathname === "/collection" ? activeLinkStyle : linkStyle
              }`}
          >
            Collection
          </Link>
          <Link
            to="/about"
            className={`text-sm md:text-base font-medium uppercase tracking-wider px-2 py-2 whitespace-nowrap ${location.pathname === "/about" ? activeLinkStyle : linkStyle
              }`}
          >
            About
          </Link>
          <div className="ml-2 h-4 w-px bg-amber-400/40" />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-3 flex-shrink-0">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none z-50 ${linkStyle}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-16 left-0 right-0 w-full bg-background/95 backdrop-blur-lg z-40 border-b border-border/50 shadow-2xl"
          >
            <nav className="flex flex-col w-full px-6 py-8">
              <MobileLink to="/collection">
                The Collection
              </MobileLink>
              <MobileLink to="/about">
                About
              </MobileLink>
              <MobileLink href="https://github.com/b-rahul07/kala-art-ai">
                GitHub
              </MobileLink>
            </nav>

            <div className="pb-8 flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground font-light tracking-widest uppercase">
                Discover Art's DNA
              </p>
              <div className="w-12 h-1 bg-amber-500/20 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
