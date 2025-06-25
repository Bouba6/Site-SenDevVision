import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, User, MapPin, Sparkles, Heart, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryGrid = ({ groupedPromoteurs, handleImageClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vérification et préparation des données AVANT tous les hooks
  const allPromoteurs = useMemo(() => {
    if (!groupedPromoteurs || typeof groupedPromoteurs !== 'object') {
      return [];
    }
    return Object.values(groupedPromoteurs).flat();
  }, [groupedPromoteurs]);

  // AFFICHAGE UN PAR UN SUR MOBILE
  const promoteursGrouped = useMemo(() => {
    const groups = [];
    
    if (isMobile) {
      // Sur mobile : 1 promoteur par section pour un affichage fluide
      for (let i = 0; i < allPromoteurs.length; i++) {
        groups.push([allPromoteurs[i]]);
      }
    } else {
      // Sur desktop : 3 promoteurs par section
      const itemsPerGroup = 3;
      for (let i = 0; i < allPromoteurs.length; i += itemsPerGroup) {
        groups.push(allPromoteurs.slice(i, i + itemsPerGroup));
      }
    }
    
    return groups;
  }, [allPromoteurs, isMobile]);

  // Early return si pas de données
  if (!allPromoteurs || allPromoteurs.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-bold mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Aucun promoteur à afficher
            </h2>
            <p className="text-white/60">Veuillez vérifier les données.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calcul de section simplifié
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const totalSections = promoteursGrouped.length + 2;
      const exactPosition = latest * totalSections;
      const newSection = Math.max(0, Math.round(exactPosition) - 1);
      const clampedSection = Math.min(
        Math.max(0, newSection),
        promoteursGrouped.length - 1
      );

      if (clampedSection !== currentSection && newSection < promoteursGrouped.length) {
        setCurrentSection(clampedSection);
      }

      const introEnd = 1 / totalSections;
      const outroStart = (totalSections - 1) / totalSections;
      const offset = isMobile ? 0.05 : 0.1;
      setShowNavigation(latest > introEnd + offset && latest < outroStart - offset);
    });

    return unsubscribe;
  }, [scrollYProgress, promoteursGrouped.length, currentSection, isMobile]);

  // Smooth scroll optimisé
  const scrollToSection = useCallback(
    (sectionIndex) => {
      if (!containerRef.current) return;
      
      const totalSections = promoteursGrouped.length + 2;
      const targetProgress = (sectionIndex + 1.5) / totalSections;
      const targetY = targetProgress * containerRef.current.scrollHeight;
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    [promoteursGrouped.length]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-black overflow-hidden"
      style={{ height: `${(promoteursGrouped.length + 2) * 100}vh` }}
    >
      <BackgroundEffects isMobile={isMobile} />
      <IntroSection isMobile={isMobile} />

      {promoteursGrouped.map((promoteurGroup, groupIndex) => (
        <PromoteurGroupSection
          key={groupIndex}
          promoteurGroup={promoteurGroup}
          groupIndex={groupIndex}
          isActive={groupIndex === currentSection}
          totalSections={promoteursGrouped.length}
          handleImageClick={handleImageClick}
          progress={scrollYProgress}
          isMobile={isMobile}
          allPromoteurs={allPromoteurs}
          scrollToSection={scrollToSection}
        />
      ))}

      <OutroSection 
        totalPromoteurs={allPromoteurs.length} 
        progress={scrollYProgress}
        totalSections={promoteursGrouped.length}
        isMobile={isMobile}
      />

      <NavigationDots 
        showNavigation={showNavigation}
        totalGroups={promoteursGrouped.length}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        isMobile={isMobile}
      />

      <ProgressCounter 
        showNavigation={showNavigation}
        currentSection={currentSection}
        totalSections={promoteursGrouped.length}
        progress={scrollYProgress}
        isMobile={isMobile}
        allPromoteurs={allPromoteurs}
      />

      <FloatingActions 
        showNavigation={showNavigation}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        totalSections={promoteursGrouped.length}
        isMobile={isMobile}
      />
    </div>
  );
};

// Section groupe optimisée pour affichage un par un
const PromoteurGroupSection = ({
  promoteurGroup,
  groupIndex,
  isActive,
  totalSections,
  handleImageClick,
  progress,
  isMobile,
  allPromoteurs,
  scrollToSection
}) => {
  const sectionRef = useRef(null);
  
  if (!promoteurGroup || !Array.isArray(promoteurGroup) || !totalSections) {
    return null;
  }

  const isInView = useInView(sectionRef, { 
    threshold: isMobile ? 0.1 : 0.2,
    once: false 
  });

  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  const groupY = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
    [20, 0, 0, -20]
  );

  const groupOpacity = useTransform(
    progress,
    [sectionStart - 0.2, sectionStart - 0.1, sectionEnd + 0.1, sectionEnd + 0.2],
    [0, 1, 1, 0]
  );

  const promoteur = promoteurGroup[0]; // Un seul promoteur sur mobile

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative px-4"
    >
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ 
          y: groupY,
          opacity: groupOpacity
        }}
      >
        {/* AFFICHAGE UN PAR UN SUR MOBILE */}
        {isMobile ? (
          <div className="max-w-sm mx-auto">
            <SinglePromoteurCard
              promoteur={promoteur}
              index={0}
              groupIndex={groupIndex}
              isGroupActive={isActive}
              handleImageClick={handleImageClick}
              isInView={isInView}
              isMobile={isMobile}
              totalPromoteurs={allPromoteurs.length}
              currentIndex={groupIndex}
              scrollToSection={scrollToSection}
              totalSections={totalSections}
            />
          </div>
        ) : (
          /* GRILLE NORMALE SUR DESKTOP */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {promoteurGroup.map((promoteur, index) => (
              <PromoteurCard
                key={promoteur.id || `${groupIndex}-${index}`}
                promoteur={promoteur}
                index={index}
                groupIndex={groupIndex}
                isGroupActive={isActive}
                handleImageClick={handleImageClick}
                isInView={isInView}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

// Carte promoteur mobile un par un avec navigation
const SinglePromoteurCard = ({
  promoteur,
  index,
  groupIndex,
  isGroupActive,
  handleImageClick,
  isInView,
  isMobile,
  totalPromoteurs,
  currentIndex,
  scrollToSection,
  totalSections
}) => {
  if (!promoteur) {
    return null;
  }

  const handleClick = useCallback(() => {
    if (handleImageClick && typeof handleImageClick === 'function') {
      handleImageClick(promoteur);
    }
  }, [handleImageClick, promoteur]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSections - 1) {
      scrollToSection(currentIndex + 1);
    }
  };

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header avec compteur */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 px-6 py-3">
          <User className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm">
            {currentIndex + 1} / {totalPromoteurs}
          </span>
        </div>
      </motion.div>

      {/* Carte principale */}
      <motion.div
        className="cursor-pointer relative group"
        onClick={handleClick}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/15 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/30 transition-all duration-500 h-[500px] group-hover:border-white/50 group-hover:shadow-2xl group-hover:shadow-white/20">
          
          {/* Badge premium */}
          <div className="absolute z-20 top-6 right-6">
            <motion.div 
              className="bg-black/60 backdrop-blur-sm rounded-full border border-white/40 text-white font-medium px-4 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.9 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs">Premium</span>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden h-72">
            <motion.img
              src={promoteur.image || '/placeholder-image.jpg'}
              alt={promoteur.nom || 'Promoteur'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.05 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              style={{ 
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                transform: 'translateX(-100%)'
              }}
              animate={{
                x: ['0%', '200%']
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          </div>

          {/* Contenu */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.h3 
              className="font-black text-white text-2xl mb-2 tracking-tight leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {promoteur.nom || 'Nom non disponible'}
            </motion.h3>
            
            <motion.p 
              className={`font-bold text-lg mb-4 leading-tight ${promoteur.colorClass || 'text-white/90'}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {promoteur.role || 'Rôle non spécifié'}
            </motion.p>

            {/* Badge expertise */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/30 px-4 py-2"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.2)'
              }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="text-white/70 w-4 h-4" />
              <span className="text-white/90 font-medium text-sm">
                {promoteur.expertise || 'Expertise non spécifiée'}
              </span>
            </motion.div>
          </motion.div>

          {/* Effet de lueur pour carte active */}
          {isGroupActive && (
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                background: 'linear-gradient(45deg, transparent 40%, rgba(59,130,246,0.05) 50%, transparent 60%)'
              }}
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                  '0 0 50px rgba(139, 92, 246, 0.4)',
                  '0 0 30px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>

      {/* Navigation arrows */}
      <motion.div
        className="flex justify-between items-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${
            currentIndex === 0 
              ? 'bg-white/5 text-white/30 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
          whileHover={currentIndex > 0 ? { scale: 1.05, x: -2 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Précédent</span>
        </motion.button>

        {/* Indicateur de progression */}
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(totalPromoteurs, 5) }).map((_, i) => {
            const dotIndex = currentIndex < 3 ? i : 
                            currentIndex > totalPromoteurs - 3 ? totalPromoteurs - 5 + i :
                            currentIndex - 2 + i;
            return (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  dotIndex === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.5 }}
              />
            );
          })}
        </div>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === totalSections - 1}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all ${
            currentIndex === totalSections - 1 
              ? 'bg-white/5 text-white/30 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
          whileHover={currentIndex < totalSections - 1 ? { scale: 1.05, x: 2 } : {}}
          whileTap={currentIndex < totalSections - 1 ? { scale: 0.95 } : {}}
        >
          <span className="text-sm">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Citation en bas */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.9 }}
      >
        <blockquote className="text-white/70 text-sm italic max-w-xs mx-auto leading-relaxed">
          "{promoteur.pensee ? promoteur.pensee.substring(0, 100) + '...' : 'Aucune citation disponible'}"
        </blockquote>
      </motion.div>
    </motion.div>
  );
};

// Carte promoteur desktop standard
const PromoteurCard = ({
  promoteur,
  index,
  groupIndex,
  isGroupActive,
  handleImageClick,
  isInView,
  isMobile
}) => {
  if (!promoteur) {
    return null;
  }

  const handleClick = useCallback(() => {
    if (handleImageClick && typeof handleImageClick === 'function') {
      handleImageClick(promoteur);
    }
  }, [handleImageClick, promoteur]);

  return (
    <motion.div
      className="cursor-pointer relative group w-full"
      onClick={handleClick}
      initial={{ 
        opacity: 0, 
        y: 30,
        scale: 0.98
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {
        opacity: 0.7,
        y: 15,
        scale: 0.99
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08
      }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative bg-gradient-to-br from-white/10 via-white/6 to-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/25 transition-all duration-500 w-full h-[540px] group-hover:border-white/50 group-hover:shadow-2xl group-hover:shadow-white/15">

        {/* Badge premium moderne */}
        <div className="absolute z-20 top-6 right-6">
          <motion.div 
            className="bg-black/60 backdrop-blur-sm rounded-full border border-white/40 text-white font-medium px-4 py-2 text-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Team</span>
            </div>
          </motion.div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden h-80">
          <motion.img
            src={promoteur.image || '/placeholder-image.jpg'}
            alt={promoteur.nom || 'Promoteur'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          
          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ 
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
              transform: 'translateX(-100%)'
            }}
            animate={{
              x: ['0%', '200%']
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
        </div>

        {/* Contenu */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8"
          initial={{ y: 15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.8 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          <motion.h3 
            className="font-bold text-white text-2xl mb-3 leading-tight"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {promoteur.nom || 'Nom non disponible'}
          </motion.h3>
          
          <motion.p 
            className={`font-medium text-lg mb-4 leading-tight ${promoteur.colorClass || 'text-white/90'}`}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {promoteur.role || 'Rôle non spécifié'}
          </motion.p>

          {/* Badge expertise */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm rounded-full border border-white/30 px-4 py-2"
            whileHover={{ 
              scale: 1.03,
              backgroundColor: 'rgba(255,255,255,0.18)'
            }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="text-white/70 w-4 h-4" />
            <span className="text-white/90 font-medium text-sm">
              {promoteur.expertise || 'Expertise non spécifiée'}
            </span>
          </motion.div>
        </motion.div>

        {/* Effet de lueur pour carte active */}
        {isGroupActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.25)',
              background: 'linear-gradient(45deg, transparent 40%, rgba(59,130,246,0.03) 50%, transparent 60%)'
            }}
            animate={{ 
              boxShadow: [
                '0 0 25px rgba(59, 130, 246, 0.25)',
                '0 0 35px rgba(139, 92, 246, 0.3)',
                '0 0 25px rgba(59, 130, 246, 0.25)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Composants restants (BackgroundEffects, IntroSection, OutroSection, etc.) restent identiques
const BackgroundEffects = ({ isMobile }) => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
    
    {!isMobile && (
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, rgba(139,92,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 120px 120px',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    )}
  </div>
);

const IntroSection = ({ isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.3 : 0.5 });
  
  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/3 via-transparent to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1.5, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: isMobile ? 1.5 : 2, ease: "easeOut" }}
      />

      <motion.div
        className={`text-center z-10 max-w-4xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}
        initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 50 }}
        transition={{ duration: isMobile ? 0.8 : 1, ease: "easeOut" }}
      >
        <motion.div
          className={isMobile ? 'mb-8' : 'mb-12'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.3, duration: isMobile ? 0.6 : 0.8 }}
        >
          <div className={`inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/20 ${
            isMobile ? 'px-6 py-3 mb-6' : 'px-8 py-4 mb-8'
          }`}>
            <Sparkles className={`text-white ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <span className={`text-white font-semibold tracking-wider ${isMobile ? 'text-sm' : ''}`}>
              NOTRE ÉQUIPE
            </span>
          </div>
        </motion.div>
        
        <motion.h1
          className={`font-bold text-white mb-8 leading-tight ${
            isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl lg:text-7xl'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: isMobile ? 0.8 : 1 }}
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Nos Promoteurs
          </span>
        </motion.h1>
        
        <motion.p
          className={`text-white/80 max-w-3xl mx-auto leading-relaxed font-light ${
            isMobile ? 'text-lg px-4' : 'text-xl'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: isMobile ? 0.8 : 1 }}
        >
          Découvrez les visionnaires qui façonnent l'avenir de vos projets immobiliers.
          {isMobile && <br />}
          <span className="text-white/60">
            Chaque promoteur apporte son expertise unique à votre service.
          </span>
        </motion.p>

        <motion.div
          className={isMobile ? 'mt-12' : 'mt-16'}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isMobile ? 1.2 : 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/50 text-sm font-medium"
          >
            <ChevronDown className={`mx-auto mb-2 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            Découvrir l'équipe
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const OutroSection = ({ totalPromoteurs, progress, totalSections, isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.2 : 0.3 });
  
  const totalWithIntroOutro = totalSections + 2;
  const outroStart = (totalSections + 1) / totalWithIntroOutro;
  const outroEnd = 1;
  
  const outroY = useTransform(
    progress,
    [outroStart - 0.1, outroStart, outroEnd],
    [-30, 0, 0]
  );

  const outroOpacity = useTransform(
    progress,
    [outroStart - 0.1, outroStart, outroEnd],
    [0, 1, 1]
  );
  
  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-500/3 via-purple-500/3 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 2, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: isMobile ? 2 : 3, ease: "easeOut" }}
      />

      <motion.div
        className={`text-center z-10 max-w-5xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}
        style={{
          y: outroY,
          opacity: outroOpacity
        }}
      >
        <motion.div
          className={isMobile ? 'mb-8' : 'mb-12'}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={`grid gap-6 mb-10 ${
            isMobile ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-3 gap-8 mb-12'
          }`}>
            <StatCard
              icon={<Users className={isMobile ? 'w-6 h-6' : 'w-8 h-8'} />}
              number={totalPromoteurs}
              label="Promoteurs"
              delay={0.4}
              isInView={isInView}
              isMobile={isMobile}
            />
            <StatCard
              icon={<Star className={isMobile ? 'w-6 h-6' : 'w-8 h-8'} />}
              number="100%"
              label="Excellence"
              delay={0.6}
              isInView={isInView}
              isMobile={isMobile}
            />
            <StatCard
              icon={<Heart className={isMobile ? 'w-6 h-6' : 'w-8 h-8'} />}
              number="∞"
              label="Passion"
              delay={0.8}
              isInView={isInView}
              isMobile={isMobile}
            />
          </div>
        </motion.div>
        
        <motion.h2
          className={`font-bold text-white mb-6 leading-tight ${
            isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl lg:text-5xl mb-8'
          }`}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ensemble, nous bâtissons l'avenir
          </span>
        </motion.h2>
        
        <motion.div
          className="flex justify-center items-center"
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <motion.button
            className={`bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all duration-300 ${
              isMobile ? 'px-8 py-4 text-sm' : 'px-10 py-5'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Nous contacter
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const StatCard = ({ icon, number, label, delay, isInView, isMobile }) => (
  <motion.div
    className={`text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 ${
      isMobile ? 'p-5' : 'p-6'
    }`}
    initial={{ y: -20, opacity: 0, scale: 0.9 }}
    animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: -20, opacity: 0, scale: 0.9 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <motion.div
      className={`text-white/80 flex justify-center ${isMobile ? 'mb-3' : 'mb-4'}`}
    >
      {icon}
    </motion.div>
    <motion.div
      className={`font-bold text-white ${isMobile ? 'text-2xl mb-1' : 'text-3xl mb-2'}`}
    >
      {number}
    </motion.div>
    <div className={`text-white/70 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {label}
    </div>
  </motion.div>
);

// Navigation avec compteur mobile amélioré
const NavigationDots = ({ showNavigation, totalGroups, currentSection, scrollToSection, isMobile }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 ${
          isMobile ? 'right-4' : 'right-8'
        }`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex flex-col gap-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl ${
          isMobile ? 'p-3' : 'p-4'
        }`}>
          {Array.from({ length: Math.min(totalGroups, isMobile ? 5 : totalGroups) }).map((_, index) => {
            const dotIndex = isMobile && totalGroups > 5 
              ? currentSection < 3 ? index :
                currentSection > totalGroups - 3 ? totalGroups - 5 + index :
                currentSection - 2 + index
              : index;

            return (
              <motion.button
                key={isMobile ? dotIndex : index}
                onClick={() => scrollToSection(dotIndex)}
                className={`relative rounded-full transition-all duration-300 ${
                  isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'
                } ${
                  dotIndex === currentSection
                    ? 'bg-white shadow-lg shadow-white/50'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <span className="sr-only">Promoteur {dotIndex + 1}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Progress counter avec compteur de promoteurs
const ProgressCounter = ({ showNavigation, currentSection, totalSections, progress, isMobile, allPromoteurs }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed z-50 ${
          isMobile ? 'bottom-4 left-4' : 'bottom-8 left-8'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl ${
          isMobile ? 'px-4 py-3' : 'px-6 py-4'
        }`}>
          <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
            <div className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
              {isMobile 
                ? `${String(currentSection + 1).padStart(2, '0')} / ${String(allPromoteurs?.length || totalSections).padStart(2, '0')}`
                : `${String(currentSection + 1).padStart(2, '0')} / ${String(totalSections).padStart(2, '0')}`
              }
            </div>
            <div className={`bg-white/20 rounded-full overflow-hidden ${
              isMobile ? 'w-16 h-2' : 'w-20 h-2'
            }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full"
                style={{ 
                  scaleX: useTransform(progress, [0, 1], [0, 1]),
                  transformOrigin: 'left' 
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const FloatingActions = ({ showNavigation, currentSection, scrollToSection, totalSections, isMobile }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed z-50 ${
          isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {currentSection > 0 && (
          <motion.button
            className={`bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all duration-300 shadow-xl ${
              isMobile ? 'p-3' : 'p-4'
            }`}
            onClick={() => scrollToSection(0)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default GalleryGrid;