import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ChevronDown, Users, Building, Star } from 'lucide-react';

// Particules flottantes élégantes
const FloatingParticles = ({ isMobile }) => {
  if (isMobile) return null;
  
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, particle.scale, 0],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Grille de fond animée
const AnimatedBackground = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 opacity-[0.015]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '80px 80px' : '120px 120px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '120px 120px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Section d'introduction épurée - DESIGN AMÉLIORÉ
const IntroSection = ({ isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.3 : 0.5 });
 
  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Grille de fond animée */}
      <AnimatedBackground isMobile={isMobile} />
      
      {/* Particules flottantes */}
      <FloatingParticles isMobile={isMobile} />
      
      {/* Effets de lumière améliorés */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/3 via-transparent to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1.8, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: isMobile ? 1.5 : 2, ease: "easeOut" }}
      />
      
      {/* Effet de lumière secondaire */}
      <motion.div
        className={`absolute rounded-full blur-3xl ${
          isMobile 
            ? 'w-96 h-96 top-1/4 left-1/2 -translate-x-1/2' 
            : 'w-[32rem] h-[32rem] top-1/3 left-1/2 -translate-x-1/2'
        }`}
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Contenu principal avec container amélioré */}
      <motion.div
        className={`text-center z-10 max-w-5xl mx-auto relative ${isMobile ? 'px-4' : 'px-8'}`}
        initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 50 }}
        transition={{ duration: isMobile ? 0.8 : 1, ease: "easeOut" }}
      >
        {/* Ligne décorative supérieure */}
        <motion.div
          className={`mx-auto mb-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent ${
            isMobile ? 'w-24' : 'w-32'
          }`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        />

        {/* Badge amélioré avec glassmorphism */}
        <motion.div
          className={isMobile ? 'mb-10' : 'mb-14'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.4, duration: isMobile ? 0.6 : 0.8 }}
        >
          <div className={`inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 relative overflow-hidden ${
            isMobile ? 'px-6 py-3' : 'px-8 py-4'
          }`}>
            {/* Effet de brillance sur le badge */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut" 
              }}
            />
            
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className={`text-white ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </motion.div>
            
            <span className={`text-white font-bold tracking-widest ${isMobile ? 'text-sm' : 'text-base'}`}>
              NOTRE ÉQUIPE
            </span>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className={`text-white/80 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </motion.div>
          </div>
        </motion.div>
       
        {/* Titre avec effet de révélation */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <motion.h1
            className={`font-bold text-white leading-tight relative ${
              isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl lg:text-8xl'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.7, duration: isMobile ? 0.8 : 1 }}
          >
            {/* Effet de lueur derrière le texte */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent blur-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Nos Promoteurs
            </motion.div>
            
            <span className="relative bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Nos Promoteurs
            </span>
          </motion.h1>
          
          {/* Soulignement animé */}
          <motion.div
            className={`mx-auto mt-6 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full ${
              isMobile ? 'w-32' : 'w-48'
            }`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
          />
        </motion.div>
       
        {/* Description avec typographie améliorée */}
        <motion.div
          className={`max-w-4xl mx-auto ${isMobile ? 'mb-12' : 'mb-16'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.9, duration: isMobile ? 0.8 : 1 }}
        >
          <p className={`text-white/80 leading-relaxed font-light ${
            isMobile ? 'text-lg px-4 mb-4' : 'text-xl mb-6'
          }`}>
            Découvrez les{' '}
            <motion.span 
              className="font-semibold text-white relative"
              whileHover={{ scale: 1.05 }}
            >
              visionnaires
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-white/30"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            {' '}qui façonnent l'avenir de vos projets.
          </p>
          
          <motion.p
            className={`text-white/60 leading-relaxed ${
              isMobile ? 'text-base px-4' : 'text-lg'
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Chaque promoteur apporte son{' '}
            <span className="text-white/80 font-medium">expertise unique</span>
            {' '}à votre service.
          </motion.p>
        </motion.div>

        {/* Statistiques ou éléments décoratifs */}
        <motion.div
          className={`flex items-center justify-center gap-8 ${isMobile ? 'mb-12' : 'mb-16'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {!isMobile && (
            <>
              <motion.div 
                className="flex items-center gap-2 text-white/50"
                whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
              >
                <Building className="w-4 h-4" />
                <span className="text-sm font-medium">Excellence</span>
              </motion.div>
              
              <div className="w-px h-4 bg-white/20" />
              
              <motion.div 
                className="flex items-center gap-2 text-white/50"
                whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Innovation</span>
              </motion.div>
              
              <div className="w-px h-4 bg-white/20" />
              
              <motion.div 
                className="flex items-center gap-2 text-white/50"
                whileHover={{ scale: 1.05, color: 'rgba(255,255,255,0.8)' }}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Confiance</span>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Indicateur de scroll moderne et élégant */}
        <motion.div
          className={isMobile ? 'mt-12' : 'mt-16'}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isMobile ? 1.5 : 1.8, duration: 0.8 }}
        >
          
        </motion.div>

        {/* Ligne décorative inférieure */}
        <motion.div
          className={`mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent ${
            isMobile ? 'w-16' : 'w-24'
          }`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 2, duration: 1 }}
        />
      </motion.div>

      {/* Éléments décoratifs dans les coins */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-1 h-1 bg-white/30 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          
          <motion.div
            className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-white/15 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </>
      )}
    </section>
  );
};

export default IntroSection;