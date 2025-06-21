import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Code2, Rocket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FloatingParticles } from "./FloatingParticles";

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [mounted, setMounted] = useState(false);

  const texts = [
    { text: "Sites Web HyperMegaCool", color: "from-blue-400 to-cyan-400" },
    { text: "Applications Mobiles", color: "from-purple-400 to-pink-400" },
    { text: "Solutions Digitales", color: "from-green-400 to-emerald-400" },
    { text: "Expériences Uniques", color: "from-orange-400 to-red-400" },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textChangeVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20 mb-2 ">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      </div>

      <FloatingParticles />

      {/* Geometric accents with motion */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-1/5 w-1 h-1 bg-purple-400 rounded-full opacity-40"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center ">
        <div className="container mx-auto px-2 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-12 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left column - Main content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main heading */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <motion.span
                    className="block text-white mb-2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Nous créons des
                  </motion.span>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentText}
                      className={`block bg-gradient-to-r text-3xl ${texts[currentText].color} bg-clip-text text-transparent`}
                      variants={textChangeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      {texts[currentText].text}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                Diplômés en génie logiciel, nous transformons vos idées les plus
                audacieuses en{" "}
                <span className="text-blue-400 font-semibold">
                  expériences digitales extraordinaires
                </span>
                .
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl text-white font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Démarrer un projet
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Rocket className="ml-2 w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>

                <motion.button
                  className="group px-8 py-4 border border-slate-600 text-slate-300 rounded-xl font-semibold text-lg"
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: "rgb(96 165 250)",
                    color: "rgb(96 165 250)",
                    backgroundColor: "rgba(96, 165, 250, 0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="flex items-center justify-center">
                    Voir nos réalisations
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right column - Visual elements */}
            <motion.div
              className="lg:col-span-5 relative"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Main visual element */}
                <div className="relative aspect-square mx-auto max-w-[270px] sm:max-w-[270px] md:max-w-md">
                  {/* Rotating border */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-0.5"
                    variants={rotateVariants}
                    animate="animate"
                  >
                    <div className="w-full h-full rounded-full bg-slate-950"></div>
                  </motion.div>

                  {/* Center content */}
                  <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Code2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      </motion.div>
                      <div className="text-2xl font-bold text-white mb-2">
                        SenDevVision
                      </div>
                      <div className="text-sm text-slate-400">
                        Innovation • Créativité • Excellence
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -top-4 -right-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
                  variants={floatingVariants}
                  animate="animate"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="text-xs text-slate-400 mb-1">
                    Stack Technique
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Java • Angular • Spring Boot • Flutter
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
                  variants={floatingVariants}
                  animate="animate"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  style={{ animationDelay: "3s" }}
                >
                  <div className="text-xs text-slate-400 mb-1">Spécialités</div>
                  <div className="text-sm font-semibold text-white">
                    UI/UX • Mobile • Web
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-slate-400">
              <span className="text-xs mb-2">Découvrir</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
