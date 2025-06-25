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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden bg-black"
      style={{ y, opacity }}
    >
      {/* Particules seulement sur desktop pour les performances */}
      {!isMobile && <ElegantParticles />}
      
      {/* Effets de lumière adaptés au mobile */}
      <div className="absolute inset-0">
        <motion.div 
          className={`absolute top-1/4 left-1/4 bg-blue-500/5 rounded-full blur-3xl ${
            isMobile ? 'w-48 h-48' : 'w-96 h-96'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: isMobile ? 6 : 8, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-1/4 right-1/4 bg-purple-500/5 rounded-full blur-3xl ${
            isMobile ? 'w-40 h-40' : 'w-80 h-80'
          }`}
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: isMobile ? 4 : 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className={`absolute top-2/3 left-1/3 bg-cyan-500/4 rounded-full blur-2xl ${
            isMobile ? 'w-32 h-32' : 'w-64 h-64'
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
          backgroundSize: isMobile ? '50px 50px' : '100px 100px'
        }} 
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        
        {/* Icône principale responsive */}
        <motion.div 
          className={`${isMobile ? 'mb-8' : 'mb-16'}`}
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
            className={`relative inline-flex items-center justify-center mx-auto mt-2 ${
              isMobile ? 'w-16 h-16' : 'w-24 h-24'
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
              isMobile ? 'w-14 h-14' : 'w-20 h-20'
            }`}>
              <Users className={`text-white ${isMobile ? 'w-7 h-7' : 'w-10 h-10'}`} />
            </div>
          </motion.div>
        </motion.div>

        {/* Titre responsive */}
        <motion.div 
          className={`${isMobile ? 'mb-6' : 'mb-12'}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.h1 
            className={`font-black leading-none tracking-tight ${
              isMobile 
                ? 'text-4xl sm:text-5xl mb-4' 
                : 'text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6'
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
              isMobile ? 'w-20 h-0.5' : 'w-32 h-1'
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

        {/* Description responsive */}
        <motion.div 
          className={`${isMobile ? 'mb-8' : 'mb-16'}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className={`text-gray-200 max-w-4xl mx-auto leading-relaxed font-light ${
            isMobile ? 'text-lg px-2' : 'text-2xl md:text-3xl'
          }`}>
            Découvrez les{' '}
            <span className="font-semibold text-blue-400 drop-shadow-sm">visages</span>
            {isMobile ? <br /> : ' '}et les{' '}
            <span className="font-semibold text-purple-400 drop-shadow-sm">talents</span>
            {isMobile ? <br /> : ' '}qui construisent l'avenir technologique du{' '}
            <span className="font-semibold text-cyan-400 drop-shadow-sm">Sénégal</span>
          </p>
        </motion.div>

        {/* CTA responsive */}
        <motion.div 
          className={`${isMobile ? 'mb-12' : 'mb-20'}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div 
            className={`inline-flex items-center gap-3 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm ${
              isMobile ? 'px-4 py-2 text-sm' : 'px-8 py-4'
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
              <Eye className={`text-blue-400 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
            </motion.div>
            <span className="text-gray-200 font-medium">
              {isMobile ? 'Tap pour découvrir' : 'Cliquez sur une photo pour découvrir'}
            </span>
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className={`text-purple-400 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Indicateur de scroll mobile */}
        {isMobile && (
          <motion.div
            className="flex flex-col items-center gap-2 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-xs font-medium">Faites défiler</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Éléments décoratifs adaptés au mobile */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full"
            style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute bottom-32 right-32 w-1 h-1 bg-purple-400/70 rounded-full"
            style={{ boxShadow: '0 0 8px rgba(139, 92, 246, 0.7)' }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          
          <motion.div 
            className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-cyan-400/50 rounded-full"
            style={{ boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)' }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </>
      )}

      {/* Éléments décoratifs mobiles simplifiés */}
      {isMobile && (
        <>
          <motion.div 
            className="absolute top-10 left-6 w-1 h-1 bg-blue-400/40 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute bottom-20 right-8 w-0.5 h-0.5 bg-purple-400/50 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      {/* Bordures lumineuses adaptées */}
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