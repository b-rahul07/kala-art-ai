import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Eye, Cpu, Frame, Code2, Server, BrainCircuit } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Content stored as const object for purity
const content = {
  title: "About Kala (కళ)",
  intro: "Kala is an AI-powered art style classification platform designed to identify the artistic influence present in an image. The system applies deep learning techniques to analyze visual patterns such as brushwork, color composition, and structural form, making art history accessible through modern machine learning. Unlike traditional rule-based approaches, Kala uses a trained convolutional neural network to learn stylistic representations directly from artwork data, enabling scalable and consistent classification across diverse artistic movements.",

  problemSpace: {
    title: "What Problem Kala Solves",
    content: "Understanding artistic influence typically requires domain expertise in art history and visual analysis. Kala bridges this gap by providing an automated, data-driven approach to identifying artistic styles, allowing users to explore and learn from artworks through AI-assisted interpretation. The platform is built to support educational use cases, creative exploration, and experimentation at the intersection of art and artificial intelligence."
  },

  workflow: {
    title: "System Workflow",
    steps: [
      {
        number: 1,
        title: "Image Upload",
        description: "Users upload an artwork image through the web interface."
      },
      {
        number: 2,
        title: "Preprocessing & Normalization",
        description: "The image is resized, normalized, and transformed into a format suitable for neural network inference."
      },
      {
        number: 3,
        title: "CNN-Based Inference",
        description: "A TensorFlow/Keras convolutional neural network processes the image and extracts high-level visual features to generate predictions."
      },
      {
        number: 4,
        title: "Result Interpretation",
        description: "Kala returns the top five predicted artists with confidence scores and contextual artist information sourced dynamically from Wikipedia."
      }
    ]
  },

  features: [
    { icon: Eye, title: "Visual Analysis", description: "Deep learning algorithms analyze brushwork, color palettes, and compositional techniques." },
    { icon: Frame, title: "50 Masters", description: "Trained on works from history's most influential artists across all major movements." },
    { icon: Cpu, title: "Neural Networks", description: "Powered by TensorFlow with custom-trained convolutional neural networks." }
  ],

  techStack: {
    title: "Technical Architecture",
    items: [
      { key: "Model", value: "Custom-trained CNN built using TensorFlow and Keras", icon: BrainCircuit },
      { key: "Backend", value: "Python Flask REST API for real-time inference", icon: Server },
      { key: "Frontend", value: "React with TypeScript for a type-safe, scalable UI", icon: Code2 },
      { key: "Data Handling", value: "Stateless inference with no image persistence", icon: Server }
    ]
  },

  designPhilosophy: {
    title: "Key Design Decisions",
    items: [
      {
        title: "Server-Side Inference",
        description: "Chosen to ensure consistent performance and centralized model management."
      },
      {
        title: "No Image Storage",
        description: "Images are processed in-memory only, prioritizing user privacy."
      },
      {
        title: "Typed Frontend",
        description: "TypeScript improves reliability and maintainability as the application grows."
      },
      {
        title: "Modular Components",
        description: "UI and backend services are decoupled for scalability."
      }
    ]
  },

  roadmap: {
    title: "Future Enhancements",
    items: [
      "Client-side inference using TensorFlow.js",
      "Expanded artist dataset and model retraining",
      "Batch image classification",
      "Analytics for prediction confidence and usage patterns",
      "Improved accessibility and performance optimizations"
    ]
  },

  footer: "Kala demonstrates how machine learning systems can be combined with thoughtful system design and user experience to transform complex visual analysis into an accessible and interactive application."
};

// Section Divider Component
const SectionDivider = () => (
  <div className="flex items-center justify-center gap-4 opacity-50 my-12">
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
    <Sparkles className="w-4 h-4 text-amber-500" />
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
  </div>
);

const About = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      {/* Fixed Background - Prevents darkening on scroll */}
      <div className="fixed inset-0 -z-10 bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-background to-background" />

      {/* Decorative ambient elements */}
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none" />
      <motion.div
        className="absolute top-1/4 -right-48 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <main className="relative z-10 flex-grow">
        <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-24 md:space-y-32">

          {/* Hero Section - Metallic Gold Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl mb-6 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent leading-tight">
              {content.title}
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>

            <p className="text-sm md:text-lg leading-relaxed md:leading-loose text-slate-700 dark:text-slate-300 font-sans">
              {content.intro}
            </p>
          </motion.div>

          {/* Features Grid - Icons Restored */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {content.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 shadow-xl shadow-amber-900/5 rounded-xl p-6 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-amber-900 dark:text-amber-100 mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <SectionDivider />

          {/* Problem Section - Responsive Flex Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 shadow-xl shadow-amber-900/5 rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Eye className="w-8 h-8 md:w-10 md:h-10 text-amber-500 flex-shrink-0" />
                <h2 className="font-serif text-2xl md:text-4xl text-amber-900 dark:text-amber-100 text-center md:text-left">
                  {content.problemSpace.title}
                </h2>
              </div>
              <p className="text-sm md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                {content.problemSpace.content}
              </p>
            </div>
          </motion.div>

          <SectionDivider />

          {/* How Kala Works - Vertical Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl text-center text-amber-900 dark:text-amber-100 mb-10 md:mb-12">
              {content.workflow.title}
            </h2>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/50 to-amber-500/30" />

              <div className="space-y-8 md:space-y-10">
                {content.workflow.steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    className="relative flex items-start gap-4 md:gap-6"
                  >
                    {/* Gold filled number circle */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg shadow-amber-500/30 relative z-10">
                      {step.number}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 pt-0.5">
                      <h3 className="font-serif text-lg md:text-2xl text-amber-900 dark:text-amber-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          {/* Technical Architecture - Responsive Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl text-center text-amber-900 dark:text-amber-100 mb-10 md:mb-12">
              {content.techStack.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {content.techStack.items.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
                    className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 shadow-xl shadow-amber-900/5 rounded-xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-center gap-3 mb-3">
                      <IconComponent className="w-6 h-6 text-amber-500" />
                      <div className="font-serif text-sm md:text-base font-bold text-amber-500 text-center">
                        {item.key}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-center">
                      {item.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <SectionDivider />

          {/* Key Design Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl text-center text-amber-900 dark:text-amber-100 mb-10 md:mb-12">
              {content.designPhilosophy.title}
            </h2>

            <div className="space-y-4 md:space-y-6">
              {content.designPhilosophy.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 shadow-xl shadow-amber-900/5 rounded-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <h3 className="font-serif text-lg md:text-2xl text-amber-500 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <SectionDivider />

          {/* Future Enhancements - 2-Column Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl text-center text-amber-900 dark:text-amber-100 mb-10 md:mb-12">
              {content.roadmap.title}
            </h2>

            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 shadow-xl shadow-amber-900/5 rounded-2xl p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {content.roadmap.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-sans">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          {/* Footer Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center pb-8"
          >
            <div className="relative py-8 md:py-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent rounded-xl"></div>
              <div className="relative border-y border-amber-500/20 py-6 md:py-8">
                <p className="text-sm md:text-lg leading-relaxed md:leading-loose text-slate-700 dark:text-slate-300 italic font-serif">
                  {content.footer}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
