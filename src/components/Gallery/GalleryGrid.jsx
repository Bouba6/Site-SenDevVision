import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, User, MapPin, Sparkles, Heart, Star, Users } from 'lucide-react';
import IntroSection from './IntroSection';

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

  // Grouper les promoteurs par lignes (adaptable selon l'écran)
  const promoteursGrouped = useMemo(() => {
    const groups = [];
    const itemsPerGroup = isMobile ? 2 : 3; // 2 sur mobile, 3 sur desktop
    
    for (let i = 0; i < allPromoteurs.length; i += itemsPerGroup) {
      groups.push(allPromoteurs.slice(i, i + itemsPerGroup));
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
      // Calcul section actuelle avec intro et outro
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

      // Navigation intelligente
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
      {/* Background avec effets adaptés au mobile */}
      <BackgroundEffects isMobile={isMobile} />

      {/* Section d'introduction */}
      <IntroSection isMobile={isMobile} />

      {/* Sections des groupes de promoteurs */}
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
        />
      ))}

      {/* Section de conclusion */}
      <OutroSection 
        totalPromoteurs={allPromoteurs.length} 
        progress={scrollYProgress}
        totalSections={promoteursGrouped.length}
        isMobile={isMobile}
      />

      {/* Navigation adaptée au mobile */}
      <NavigationDots 
        showNavigation={showNavigation}
        totalGroups={promoteursGrouped.length}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        isMobile={isMobile}
      />

      {/* Compteur avec progression */}
      <ProgressCounter 
        showNavigation={showNavigation}
        currentSection={currentSection}
        totalSections={promoteursGrouped.length}
        progress={scrollYProgress}
        isMobile={isMobile}
      />

      {/* Actions flottantes */}
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

// Section groupe avec animations douces - SANS EFFET DE NOIRCISSEMENT
const PromoteurGroupSection = ({
  promoteurGroup,
  groupIndex,
  isActive,
  totalSections,
  handleImageClick,
  progress,
  isMobile,
}) => {
  const sectionRef = useRef(null);
  
  if (!promoteurGroup || !Array.isArray(promoteurGroup) || !totalSections) {
    return null;
  }

  const isInView = useInView(sectionRef, { 
    threshold: isMobile ? 0.1 : 0.2,
    once: false 
  });

  // Animations très subtiles et fluides - OPACITY MAINTENUE
  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  // Parallax doux SANS disparition
  const groupY = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
    [20, 0, 0, -20] // Mouvement réduit
  );

  // OPACITY FIXE - Plus de disparition
  const groupOpacity = useTransform(
    progress,
    [sectionStart - 0.2, sectionStart - 0.1, sectionEnd + 0.1, sectionEnd + 0.2],
    [0, 1, 1, 0] // Zone visible élargie
  );

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full flex items-center justify-center relative ${
        isMobile ? 'px-4' : 'px-8'
      }`}
    >
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ 
          y: groupY,
          opacity: groupOpacity
        }}
      >
        {/* Grille responsive */}
        <div className={`grid gap-6 ${
          isMobile 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'
        }`}>
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
      </motion.div>
    </section>
  );
};

// Carte promoteur avec animations élégantes - AMÉLIORATION VISIBILITÉ
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
      className="cursor-pointer relative group"
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
        opacity: 0.7, // Au lieu de 0 - garde une visibilité partielle
        y: 15, // Mouvement réduit
        scale: 0.99
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.08 // Délai réduit
      }}
      whileHover={{ 
        y: -6,
        scale: 1.02, // Scale réduit
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={isMobile ? { scale: 0.98 } : {}}
    >
      {/* Card avec design épuré - VISIBILITÉ AMÉLIORÉE */}
      <div className={`relative bg-gradient-to-br from-white/10 via-white/6 to-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/25 transition-all duration-500 w-full ${
        isMobile ? 'h-[420px]' : 'h-[540px]'
      } group-hover:border-white/50 group-hover:shadow-2xl group-hover:shadow-white/15`}>

        {/* Badge premium moderne */}
        <div className={`absolute z-20 ${isMobile ? 'top-4 right-4' : 'top-6 right-6'}`}>
          <motion.div 
            className={`bg-black/60 backdrop-blur-sm rounded-full border border-white/40 text-white font-medium ${
              isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
              <User className={isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
              <span>Team</span>
            </div>
          </motion.div>
        </div>

        {/* Image avec effet hover subtil */}
        <div className={`relative overflow-hidden ${isMobile ? 'h-64' : 'h-80'}`}>
          <motion.img
            src={promoteur.image || '/placeholder-image.jpg'}
            alt={promoteur.nom || 'Promoteur'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          {/* Overlay gradient amélioré */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          
          {/* Effet de brillance moderne - PLUS SUBTIL */}
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

        {/* Contenu avec animations fluides */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-5' : 'p-8'}`}
          initial={{ y: 15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.8 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
        >
          <motion.h3 
            className={`font-bold text-white mb-2 leading-tight ${
              isMobile ? 'text-xl' : 'text-2xl mb-3'
            }`}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {promoteur.nom || 'Nom non disponible'}
          </motion.h3>
          
          <motion.p 
            className={`font-medium mb-4 leading-tight ${
              isMobile ? 'text-sm' : 'text-lg'
            } ${promoteur.colorClass || 'text-white/90'}`}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {promoteur.role || 'Rôle non spécifié'}
          </motion.p>

          {/* Badge expertise moderne */}
          <motion.div 
            className={`inline-flex items-center gap-2 bg-white/12 backdrop-blur-sm rounded-full border border-white/30 ${
              isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
            }`}
            whileHover={{ 
              scale: 1.03,
              backgroundColor: 'rgba(255,255,255,0.18)'
            }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className={`text-white/70 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span className={`text-white/90 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile 
                ? (promoteur.expertise || 'Expertise').substring(0, 15) + '...'
                : promoteur.expertise || 'Expertise non spécifiée'
              }
            </span>
          </motion.div>
        </motion.div>

        {/* Effet de lueur subtile pour la carte active - PLUS DOUX */}
        {isGroupActive && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
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

// Background épuré - SANS CHANGEMENTS
const BackgroundEffects = ({ isMobile }) => (
  <div className="fixed inset-0 z-0">
    {/* Gradient de base simple */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
    
    {/* Particules très subtiles */}
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

<IntroSection />

// Section de conclusion simplifiée - SANS CHANGEMENTS
const OutroSection = ({ totalPromoteurs, progress, totalSections, isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.2 : 0.3 });
  
  const totalWithIntroOutro = totalSections + 2;
  const outroStart = (totalSections + 1) / totalWithIntroOutro;
  const outroEnd = 1;
  
  // Animation douce
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
      {/* Effet de lumière finale */}
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
        {/* Statistiques élégantes */}
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
        
        {/* Message de conclusion */}
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
        
        {/* Call to action */}
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

// StatCard épurée - SANS CHANGEMENTS
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

// Navigation, compteur et actions flottantes - SANS CHANGEMENTS
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
          {Array.from({ length: totalGroups }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`relative rounded-full transition-all duration-300 ${
                isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'
              } ${
                index === currentSection
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <span className="sr-only">Groupe {index + 1}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProgressCounter = ({ showNavigation, currentSection, totalSections, progress, isMobile }) => (
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
              {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
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