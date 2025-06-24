import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Eye, Sparkles, ArrowDown, Star, Zap } from 'lucide-react';

// Particules minimalistes et élégantes
const ElegantParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8,
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black"
      style={{ y, opacity }}
    >
      <ElegantParticles />
      
      {/* Effets de lumière subtils sur fond noir */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-500/4 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
        />
      </div>
      
      {/* Grille subtile sur fond noir */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} 
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        
        {/* Icône principale avec contraste élevé */}
        <motion.div 
          className="mb-16"
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
            className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mt-2"
            whileHover={{ scale: 1.1 }}
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
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-20 h-20 bg-black rounded-full flex items-center justify-center border border-gray-800">
              <Users className="w-10 h-10 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Titre avec plus de contraste */}
        <motion.div 
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight mb-6"
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
              filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
            }}
            whileHover={{ 
              scale: 1.02,
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.5))',
              transition: { duration: 0.3 }
            }}
          >
            GALERIE
          </motion.h1>
          
          {/* Ligne décorative plus lumineuse */}
          <motion.div 
            className="w-32 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, 
                rgba(59, 130, 246, 0.9), 
                rgba(139, 92, 246, 0.9), 
                rgba(6, 182, 212, 0.9))`,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>

        {/* Description avec meilleur contraste */}
        <motion.div 
          className="mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
            Découvrez les{' '}
            <span className="font-semibold text-blue-400 drop-shadow-sm">visages</span>
            {' '}et les{' '}
            <span className="font-semibold text-purple-400 drop-shadow-sm">talents</span>
            {' '}qui construisent l'avenir technologique du{' '}
            <span className="font-semibold text-cyan-400 drop-shadow-sm">Sénégal</span>
          </p>
        </motion.div>

        {/* CTA avec fond noir */}
        <motion.div 
          className="mb-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              borderColor: 'rgba(59, 130, 246, 0.7)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eye className="w-6 h-6 text-blue-400" />
            </motion.div>
            <span className="text-gray-200 font-medium">
              Cliquez sur une photo pour découvrir
            </span>
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Éléments décoratifs plus visibles sur fond noir */}
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

      {/* Bordures lumineuses sur fond noir */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </motion.section>
  );
};

export default GalleryHero;