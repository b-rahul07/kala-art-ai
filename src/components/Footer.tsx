import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="py-6 text-center backdrop-blur-sm bg-background/50"
    >
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-light uppercase tracking-[0.15em] text-muted-foreground">
        కళ | KALA AI RECOGNITION • BUILT USING TENSORFLOW & REACT
      </p>
    </motion.footer>
  );
};

export default Footer;
