import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'; 
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Play, Star, Zap } from 'lucide-react';

// Hook pour le parallax au mouvement de la souris avec effet magnétique
const useMouseParallax = (stiffness = 150, damping = 25) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, view } = e;
      const { innerWidth, innerHeight } = view || window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return {
    x: useSpring(useTransform(mouseX, [-1, 1], ['-8%', '8%']), { stiffness, damping }),
    y: useSpring(useTransform(mouseY, [-1, 1], ['-8%', '8%']), { stiffness, damping }),
  };
};

const CustomizedHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "75%"]);
  const { x: parallaxX, y: parallaxY } = useMouseParallax();

  const innovationSlides = [
    { src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Intelligence", subtitle: "L'avenir commence ici" },
    { src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Créativité", subtitle: "Sans limites ni frontières" },
    { src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200", title: "Performance", subtitle: "Excellence en mouvement" },
  ];

  useEffect(() => {
    if (!isHovered && !isVideoMode) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % innovationSlides.length);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, innovationSlides.length, isHovered, isVideoMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: "150%", rotateX: -90, scale: 0.5 },
    visible: { opacity: 1, y: "0%", rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 60, damping: 12, duration: 1.2 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))' }}>
      <motion.div className="absolute inset-0" style={{ scale: backgroundScale }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${innovationSlides[currentSlide].src})` }}
            initial={{ opacity: 0, scale: 1.2, rotate: 2, filter: 'blur(20px) brightness(0.3)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px) brightness(0.7)' }}
            exit={{ opacity: 0, scale: 0.8, rotate: -2, filter: 'blur(10px) brightness(0.2)' }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>

        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-tertiary))', opacity: 0.3 }}
          key={`overlay-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
        style={{ opacity: contentOpacity, y: contentY, color: 'var(--color-quaternary)' }}
      >
        <motion.div style={{ x: parallaxX, y: parallaxY }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-6xl mx-auto"
          >
           

            <div className="mb-8 perspective-1000">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight">
                <span className="sr-only">Révolutionner. Exceller. Dominer.</span>
                {[
                  "Révolutionner",
                  "Exceller",
                  "Dominer"
                ].map((word, index) => (
                  <div key={word} className="inline-block overflow-hidden mx-2 mb-2">
                    <motion.span 
                      className="inline-block text-white"
                      variants={titleWordVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.05, 
                        textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </h1>
            </div>

            <motion.div variants={slideUp} className="mb-10 max-w-3xl">
              <p className="text-xl md:text-2xl leading-relaxed font-light">
                Nous transformons les{' '}
                <motion.span
                  className="font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                  key={`text-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {innovationSlides[currentSlide].title.toLowerCase()}s
                </motion.span>
                {' '}en expériences extraordinaires qui redéfinissent les standards de demain.
              </p>
            </motion.div>

            <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-6 items-center">
              <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={floatAnimation}
                className="group relative overflow-hidden rounded-full px-10 py-5 text-lg font-bold shadow-2xl transition-all duration-500"
                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', color: 'var(--color-quaternary)' }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <div className="relative flex items-center gap-3">
                  <Zap className="h-5 w-5" />
                  <span>Lancer l'Innovation</span>
                  <motion.div animate={{ x: isHovered ? 8 : 0, rotate: isHovered ? 45 : 0 }}>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.button>

             
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
       
      
      </motion.div>
    </section>
  );
};

export default CustomizedHeroSection;
