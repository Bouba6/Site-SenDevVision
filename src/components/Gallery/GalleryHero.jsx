import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Eye, Sparkles, ArrowDown, Star, Zap, Camera, Code, Palette } from 'lucide-react';

// Particules avancées avec formes variées
const AdvancedParticles = () => {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const generateParticles = () => {
      const particleCount = isMobile ? 15 : 40;
      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['blue', 'purple', 'cyan', 'emerald', 'rose'];
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
        size: Math.random() * 0.8 + 0.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.5,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const getParticleClasses = (particle) => {
    const colorClasses = {
      blue: 'bg-blue-400/30',
      purple: 'bg-purple-400/30',
      cyan: 'bg-cyan-400/30',
      emerald: 'bg-emerald-400/30',
      rose: 'bg-rose-400/30'
    };
    
    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-sm',
      triangle: 'rounded-none'
    };
    
    return `${colorClasses[particle.color]} ${shapeClasses[particle.shape]}`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 ${getParticleClasses(particle)}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(particle.id) * 20, Math.cos(particle.id) * 40],
            opacity: [0, 1, 0],
            scale: [0, particle.size, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 / particle.speed,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

// Grille animée professionnelle
const AnimatedGrid = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 opacity-[0.02]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '60px 60px' : '120px 120px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Icônes flottantes
const FloatingIcons = ({ isMobile }) => {
  const icons = [
    { Icon: Camera, delay: 0, color: 'text-blue-400' },
    { Icon: Code, delay: 2, color: 'text-purple-400' },
    { Icon: Palette, delay: 4, color: 'text-cyan-400' },
  ];

  if (isMobile) return null;

  return (
    <>
      {icons.map(({ Icon, delay, color }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          style={{
            left: `${15 + index * 30}%`,
            top: `${20 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </>
  );
};

const GalleryHero = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '30%' : '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        y, 
        opacity, 
        scale,
        background: `
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.5) 50%),
          radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0.5) 50%),
          radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
        `
      }}
    >
      {/* Grille animée */}
      <AnimatedGrid isMobile={isMobile} />

      {/* Particules avancées */}
      {!isMobile && <AdvancedParticles />}

      {/* Icônes flottantes */}
      <FloatingIcons isMobile={isMobile} />
      
      {/* Effets de lumière améliorés */}
      <div className="absolute inset-0">
        {/* Lumière principale */}
        <motion.div 
          className={`absolute rounded-full blur-3xl ${
            isMobile 
              ? 'w-64 h-64 top-1/4 left-1/2 -translate-x-1/2' 
              : 'w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[40rem] lg:h-[40rem] top-1/4 left-1/2 -translate-x-1/2'
          }`}
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              rgba(59, 130, 246, 0.3) 0deg,
              rgba(139, 92, 246, 0.2) 120deg,
              rgba(6, 182, 212, 0.25) 240deg,
              rgba(59, 130, 246, 0.3) 360deg
            )`
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Effets secondaires */}
        <motion.div 
          className={`absolute bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 rounded-full blur-2xl ${
            isMobile 
              ? 'w-48 h-48 bottom-1/4 right-8' 
              : 'w-80 h-80 md:w-96 md:h-96 bottom-1/4 right-1/4'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          
          {/* Badge premium */}
          <motion.div
            className={`inline-flex items-center gap-2 mb-6 mt-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-400`} />
            </motion.div>
            <span className="text-gray-300 font-medium">SenDev Vision</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-blue-400`} />
            </motion.div>
          </motion.div>
          
          {/* Icône principale redesignée */}
          <motion.div 
            className={`${isMobile ? 'mb-8' : 'mb-12'}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 150, 
              damping: 20,
              delay: 0.4
            }}
          >
            <motion.div 
              className={`relative inline-flex items-center justify-center mx-auto ${
                isMobile 
                  ? 'w-20 h-20' 
                  : 'w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36'
              }`}
              whileHover={{ scale: isMobile ? 1.05 : 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Anneaux rotatifs */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    rgba(59, 130, 246, 0.8),
                    rgba(139, 92, 246, 0.8),
                    rgba(6, 182, 212, 0.8),
                    rgba(16, 185, 129, 0.8),
                    rgba(59, 130, 246, 0.8)
                  )`,
                  maskImage: `conic-gradient(from 0deg, transparent 60deg, white 120deg, transparent 180deg, white 240deg, transparent 300deg, white 360deg)`,
                  WebkitMaskImage: `conic-gradient(from 0deg, transparent 60deg, white 120deg, transparent 180deg, white 240deg, transparent 300deg, white 360deg)`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="absolute inset-2 rounded-full border border-transparent"
                style={{
                  background: `conic-gradient(
                    from 180deg,
                    rgba(139, 92, 246, 0.6),
                    rgba(6, 182, 212, 0.6),
                    rgba(59, 130, 246, 0.6)
                  )`,
                  maskImage: `conic-gradient(from 0deg, white 90deg, transparent 180deg, white 270deg, transparent 360deg)`,
                  WebkitMaskImage: `conic-gradient(from 0deg, white 90deg, transparent 180deg, white 270deg, transparent 360deg)`
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Centre avec glassmorphism */}
              <div className={`relative rounded-full flex items-center justify-center border border-white/20 backdrop-blur-xl ${
                isMobile 
                  ? 'w-16 h-16' 
                  : 'w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'
              }`}
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%),
                  linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)
                `,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 0 30px rgba(59, 130, 246, 0.3),
                  0 0 60px rgba(139, 92, 246, 0.2)
                `
              }}>
                <Users className={`text-white drop-shadow-lg ${
                  isMobile 
                    ? 'w-7 h-7' 
                    : 'w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12'
                }`} />
              </div>
            </motion.div>
          </motion.div>

          {/* Titre avec effet de typing */}
          <motion.div 
            className={`${isMobile ? 'mb-6' : 'mb-10'}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h1 
              className={`font-black leading-none tracking-tight ${
                isMobile 
                  ? 'text-4xl sm:text-5xl mb-4' 
                  : 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-6'
              }`}
              style={{
                background: `linear-gradient(135deg, 
                  #ffffff 0%, 
                  #3b82f6 20%, 
                  #8b5cf6 40%, 
                  #06b6d4 60%, 
                  #10b981 80%, 
                  #ffffff 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
              }}
              whileHover={{ 
                scale: isMobile ? 1.02 : 1.03,
                filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.6))',
                transition: { duration: 0.3 }
              }}
            >
              GALERIE
            </motion.h1>
            
            {/* Ligne décorative animée */}
            <motion.div 
              className={`mx-auto rounded-full ${
                isMobile 
                  ? 'w-24 h-1' 
                  : 'w-32 h-1 md:w-40 md:h-1.5'
              }`}
              style={{
                background: `linear-gradient(90deg, 
                  transparent 0%,
                  rgba(59, 130, 246, 0.8) 20%, 
                  rgba(139, 92, 246, 1) 50%, 
                  rgba(6, 182, 212, 0.8) 80%,
                  transparent 100%)`,
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
            />
          </motion.div>

          {/* Description améliorée */}
          <motion.div 
            className={`${isMobile ? 'mb-8' : 'mb-12'}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className={`max-w-4xl mx-auto ${isMobile ? 'px-2' : 'px-6'}`}>
              <p className={`text-gray-300 leading-relaxed font-light ${
                isMobile 
                  ? 'text-lg' 
                  : 'text-xl md:text-2xl lg:text-3xl'
              }`}>
                Explorez les{' '}
                <motion.span 
                  className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  talents exceptionnels
                </motion.span>
                {' '}et les{' '}
                <motion.span 
                  className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  innovations remarquables
                </motion.span>
                {' '}qui façonnent l'écosystème technologique du{' '}
                <motion.span 
                  className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Sénégal
                </motion.span>
              </p>
            </div>
          </motion.div>

          {/* CTA professionnel */}
          <motion.div 
            className={`${isMobile ? 'mb-10' : 'mb-16'}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button 
              className={`group relative inline-flex items-center rounded-2xl overflow-hidden ${
                isMobile 
                  ? 'gap-3 px-6 py-3 text-sm' 
                  : 'gap-4 px-8 py-4 text-base'
              }`}
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.1) 0%, 
                    rgba(139, 92, 246, 0.1) 50%, 
                    rgba(6, 182, 212, 0.1) 100%)
                `,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Effet de survol */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                className="relative"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className={`text-blue-400 ${
                  isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
              </motion.div>
              
              <span className="relative text-white font-semibold">
                {isMobile ? 'Découvrir les profils' : 'Découvrir les profils exceptionnels'}
              </span>
              
              <motion.div
                className="relative"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className={`text-purple-400 ${
                  isMobile ? 'w-4 h-4' : 'w-5 h-5'
                }`} />
              </motion.div>
            </motion.button>
          </motion.div>
          
        </div>
      </div>

      {/* Bordures lumineuses animées */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
        }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scaleX: [0.5, 1, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
        }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scaleX: [0.5, 1, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </motion.section>
  );
};

export default GalleryHero;