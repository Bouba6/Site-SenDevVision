import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { ArrowRight, ChevronDown, MonitorPlay } from 'lucide-react';

// Hook pour le parallax au mouvement de la souris
const useMouseParallax = (stiffness = 100) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, view } = e;
      const { innerWidth, innerHeight } = view || window;
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return {
    x: useSpring(useTransform(mouseX, [-0.5, 0.5], ['-5%', '5%']), { stiffness, damping: 20 }),
    y: useSpring(useTransform(mouseY, [-0.5, 0.5], ['-5%', '5%']), { stiffness, damping: 20 }),
  };
};

const CinematicHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Effets de parallax au scroll
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { x: parallaxX, y: parallaxY } = useMouseParallax();

  const teamImages = [
    { src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Équipe en réunion stratégique", title: "Stratégie" },
    { src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Développeurs au travail", title: "Développement" },
    { src: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Présentation client", title: "Partenariat" },
  ];

  // Rotation automatique des slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % teamImages.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, teamImages.length]);

  // Variants pour les animations Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: "100%", rotate: 10 },
    visible: {
      opacity: 1,
      y: "0%",
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-slate-900">
      {/* --- Background Media --- */}
      <motion.div className="absolute inset-0" style={{ scale: backgroundScale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${teamImages[currentSlide].src})` }}
            initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(50% 0 50% 0)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, scale: 1.1, clipPath: 'inset(50% 0 50% 0)' }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </motion.div>

      {/* --- Contenu Principal --- */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Titre principal animé par mot */}
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold uppercase tracking-tighter">
              <span className="sr-only">Créer. Innover. Transformer.</span>
              {["Créer", "Innover", "Transformer"].map((word) => (
                <div key={word} className="inline-block overflow-hidden pb-2 md:pb-4 mx-2">
                  <motion.span className="inline-block" variants={wordVariants}>
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>
            
            <motion.p
              variants={fadeIn}
              className="mt-6 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Votre vision, notre expertise. Nous concevons des expériences
              digitales qui définissent l'avenir et génèrent des résultats.
            </motion.p>

            {/* Bouton CTA avec animation */}
            <motion.div
              variants={fadeIn}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <button className="group mt-12 flex items-center gap-3 rounded-full bg-gradient-to-r from-secondary to-secondary/20 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105">
                <span>Démarrer Votre Projet</span>
                <motion.div animate={{ x: isHovered ? 5 : 0 }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- Barre de navigation/progression en bas --- */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <MonitorPlay className="h-6 w-6 text-white/80" />
            <div className="text-sm font-medium text-white">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {teamImages[currentSlide].title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {teamImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative h-1 w-12 md:w-20 rounded-full bg-white/20"
              >
                {currentSlide === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    layoutId="progress"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* --- Indicateur de scroll --- */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: contentOpacity }}
      >
        <ChevronDown className="h-8 w-8 text-white/50 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default CinematicHeroSection;