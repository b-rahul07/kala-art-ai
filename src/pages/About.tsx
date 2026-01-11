import { motion } from "framer-motion";
import { Palette, Cpu, Eye, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Eye,
    title: "Visual Analysis",
    description: "Deep learning algorithms analyze brushwork, color palettes, and compositional techniques."
  },
  {
    icon: Palette,
    title: "50 Masters",
    description: "Trained on works from history's most influential artists across all major movements."
  },
  {
    icon: Cpu,
    title: "Neural Networks",
    description: "Powered by TensorFlow with custom-trained convolutional neural networks."
  }
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      <motion.div
        className="absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-8 pt-24 md:pt-48 pb-24 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex items-center justify-center gap-2 text-amber-700 dark:text-gold"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
              About the Project
            </span>
            <Sparkles className="h-4 w-4" />
          </motion.div>

          <h1 className="font-serif text-4xl italic text-foreground md:text-5xl">
            About{" "}
            <span className="gradient-text">కళ | Kala</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 space-y-6 text-left"
          >
            <p className="text-base font-light leading-relaxed text-gray-900 dark:text-muted-foreground">
              కళ | Kala is an AI-powered art style classifier that can identify the artistic
              influence in any image. Named after the Sanskrit word for "art," కళ | Kala
              represents the intersection of artificial intelligence and human creativity.
            </p>

            <p className="text-base font-light leading-relaxed text-gray-900 dark:text-muted-foreground">
              From <span className="text-amber-700 dark:text-gold">Van Gogh's</span> expressive swirls to{" "}
              <span className="text-terracotta">Monet's</span> ethereal light, from{" "}
              <span className="text-amber-700 dark:text-gold">Picasso's</span> geometric abstractions to{" "}
              <span className="text-terracotta">Kahlo's</span> symbolic narratives—కళ | Kala
              sees the art in every image.
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid gap-6 sm:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-gold)' }}
                className="group flex flex-col items-center gap-4 rounded-lg bg-card p-6 shadow-subtle transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-700/10 text-amber-700 dark:bg-gold/10 dark:text-gold transition-colors group-hover:bg-amber-700/20 dark:group-hover:bg-gold/20"
                >
                  <feature.icon className="h-5 w-5" />
                </motion.div>
                <h3 className="font-serif text-lg italic text-foreground">
                  {feature.title}
                </h3>
                <p className="text-center text-xs font-light leading-relaxed text-gray-700 dark:text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-700 dark:text-muted-foreground">
              Technology Stack
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {["TensorFlow", "Python", "React", "TypeScript"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-gold/10 hover:text-foreground"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
