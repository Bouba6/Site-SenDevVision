import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Eye, Sparkles, ArrowDown, Star, Zap } from 'lucide-react';

// Particules optimisées pour mobile
const ElegantParticles = () => {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const generateParticles = () => {
      // Réduire le nombre de particules sur mobile pour les performances
      const particleCount = isMobile ? 12 : 30;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: isMobile ? 0.5 : 1, // Particules plus petites sur mobile
      }));
      setParticles(newParticles);
    };

    generateParticles();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute bg-blue-400/40 rounded-full ${
            particle.size === 0.5 ? 'w-0.5 h-0.5' : 'w-1 h-1'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, -100], // Réduction du mouvement sur mobile
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: isMobile ? 6 : 8, // Animation plus rapide sur mobile
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const GalleryHero = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax moins prononcé sur mobile
  const y = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '25%' : '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ y, opacity }}
    >
      {/* Container principal avec padding responsive */}
      <div className="absolute inset-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Particules seulement sur desktop pour les performances */}
        {!isMobile && <ElegantParticles />}
        
        {/* Effets de lumière adaptés au mobile */}
        <div className="absolute inset-0">
          <motion.div 
            className={`absolute bg-blue-500/5 rounded-full blur-3xl ${
              isMobile 
                ? 'w-40 h-40 top-16 left-8' 
                : 'w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 top-1/4 left-1/4'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: isMobile ? 6 : 8, repeat: Infinity }}
          />
          <motion.div 
            className={`absolute bg-purple-500/5 rounded-full blur-3xl ${
              isMobile 
                ? 'w-32 h-32 bottom-20 right-8' 
                : 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bottom-1/4 right-1/4'
            }`}
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: isMobile ? 4 : 6, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className={`absolute bg-cyan-500/4 rounded-full blur-2xl ${
              isMobile 
                ? 'w-24 h-24 top-2/3 left-1/3' 
                : 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 top-2/3 left-1/3'
            }`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: isMobile ? 8 : 10, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        {/* Grille plus subtile sur mobile */}
        <div 
          className={`absolute inset-0 ${isMobile ? 'opacity-[0.02]' : 'opacity-[0.03]'}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '40px 40px' : '60px 60px 80px 80px 100px 100px'
          }} 
        />
      </div>

      {/* Contenu principal avec conteneur responsive */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          
          {/* Icône principale responsive avec espacement amélioré */}
          <motion.div 
            className={`${
              isMobile 
                ? 'mb-6' 
                : 'mb-8 sm:mb-10 md:mb-12 lg:mb-16'
            }`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2
            }}
          >
            <motion.div 
              className={`relative inline-flex items-center justify-center mx-auto ${
                isMobile 
                  ? 'w-14 h-14' 
                  : 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24'
              }`}
              whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    rgba(59, 130, 246, 0.6),
                    rgba(139, 92, 246, 0.6),
                    rgba(6, 182, 212, 0.6),
                    rgba(59, 130, 246, 0.6)
                  )`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: isMobile ? 6 : 8, repeat: Infinity, ease: "linear" }}
              />
              <div className={`relative bg-black rounded-full flex items-center justify-center border border-gray-800 ${
                isMobile 
                  ? 'w-12 h-12' 
                  : 'w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20'
              }`}>
                <Users className={`text-white ${
                  isMobile 
                    ? 'w-5 h-5' 
                    : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10'
                }`} />
              </div>
            </motion.div>
          </motion.div>

          {/* Titre responsive avec espacement amélioré */}
          <motion.div 
            className={`${
              isMobile 
                ? 'mb-4' 
                : 'mb-6 sm:mb-8 md:mb-10 lg:mb-12'
            }`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.h1 
              className={`font-black leading-none tracking-tight ${
                isMobile 
                  ? 'text-3xl sm:text-4xl mb-3' 
                  : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-4 sm:mb-5 md:mb-6'
              }`}
              style={{
                background: `linear-gradient(135deg, 
                  #ffffff 0%, 
                  #3b82f6 30%, 
                  #8b5cf6 60%, 
                  #06b6d4 90%, 
                  #ffffff 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isMobile 
                  ? 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))' 
                  : 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
              }}
              whileHover={{ 
                scale: isMobile ? 1.01 : 1.02,
                filter: isMobile 
                  ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' 
                  : 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.5))',
                transition: { duration: 0.3 }
              }}
            >
              GALERIE
            </motion.h1>
            
            {/* Ligne décorative responsive */}
            <motion.div 
              className={`mx-auto rounded-full ${
                isMobile 
                  ? 'w-16 h-0.5' 
                  : 'w-20 h-0.5 sm:w-24 sm:h-0.5 md:w-28 md:h-1 lg:w-32 lg:h-1'
              }`}
              style={{
                background: `linear-gradient(90deg, 
                  rgba(59, 130, 246, 0.9), 
                  rgba(139, 92, 246, 0.9), 
                  rgba(6, 182, 212, 0.9))`,
                boxShadow: isMobile 
                  ? '0 0 10px rgba(59, 130, 246, 0.5)' 
                  : '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>

          {/* Description responsive avec conteneur amélioré */}
          <motion.div 
            className={`${
              isMobile 
                ? 'mb-6' 
                : 'mb-8 sm:mb-10 md:mb-12 lg:mb-16'
            }`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className={`max-w-5xl mx-auto ${isMobile ? 'px-2' : 'px-4'}`}>
              <p className={`text-gray-200 leading-relaxed font-light ${
                isMobile 
                  ? 'text-base sm:text-lg' 
                  : 'text-xl sm:text-2xl md:text-3xl lg:text-3xl'
              }`}>
                Découvrez les{' '}
                <span className="font-semibold text-blue-400 drop-shadow-sm">visages</span>
                {isMobile ? <br /> : ' '}et les{' '}
                <span className="font-semibold text-purple-400 drop-shadow-sm">talents</span>
                {isMobile ? <br /> : ' '}qui construisent l'avenir technologique du{' '}
                <span className="font-semibold text-cyan-400 drop-shadow-sm">Sénégal</span>
              </p>
            </div>
          </motion.div>

          {/* CTA responsive avec espacement amélioré */}
          <motion.div 
            className={`${
              isMobile 
                ? 'mb-8' 
                : 'mb-10 sm:mb-12 md:mb-16 lg:mb-20'
            }`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div 
              className={`inline-flex items-center rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm ${
                isMobile 
                  ? 'gap-2 px-4 py-2 text-sm' 
                  : 'gap-3 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base'
              }`}
              whileHover={{ 
                scale: isMobile ? 1.02 : 1.05,
                borderColor: 'rgba(59, 130, 246, 0.7)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                boxShadow: isMobile 
                  ? '0 0 15px rgba(59, 130, 246, 0.3)' 
                  : '0 0 30px rgba(59, 130, 246, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className={`text-blue-400 ${
                  isMobile 
                    ? 'w-4 h-4' 
                    : 'w-5 h-5 sm:w-6 sm:h-6'
                }`} />
              </motion.div>
              <span className="text-gray-200 font-medium">
                {isMobile ? 'Tap pour découvrir' : 'Cliquez sur une photo pour découvrir'}
              </span>
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className={`text-purple-400 ${
                  isMobile 
                    ? 'w-3 h-3' 
                    : 'w-4 h-4 sm:w-5 sm:h-5'
                }`} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Indicateur de scroll mobile amélioré */}
          {isMobile && (
            <motion.div
              className="flex flex-col items-center gap-2 text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span className="text-xs font-medium">Faites défiler</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Éléments décoratifs adaptés avec positionnement responsive */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute w-2 h-2 bg-blue-400/60 rounded-full top-16 left-16 sm:top-20 sm:left-20 md:top-24 md:left-24"
            style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute w-1 h-1 bg-purple-400/70 rounded-full bottom-24 right-24 sm:bottom-28 sm:right-28 md:bottom-32 md:right-32"
            style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.7)' }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full top-1/3 right-16 sm:right-20 md:right-24"
            style={{ boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)' }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </>
      )}

      {/* Éléments décoratifs mobiles avec positionnement optimisé */}
      {isMobile && (
        <>
          <motion.div 
            className="absolute top-8 left-4 w-1 h-1 bg-blue-400/40 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute bottom-16 right-6 w-0.5 h-0.5 bg-purple-400/50 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      {/* Bordures lumineuses avec positionnement fixe */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        style={{ 
          boxShadow: isMobile 
            ? '0 0 5px rgba(59, 130, 246, 0.3)' 
            : '0 0 10px rgba(59, 130, 246, 0.3)' 
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        style={{ 
          boxShadow: isMobile 
            ? '0 0 5px rgba(139, 92, 246, 0.3)' 
            : '0 0 10px rgba(139, 92, 246, 0.3)' 
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </motion.section>
  );
};

export default GalleryHero;