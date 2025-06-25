import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, User, MapPin, Sparkles, Heart, Star, Users } from 'lucide-react';

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
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calcul de la vélocité de scroll optimisé pour mobile
  useEffect(() => {
    let lastProgress = 0;
    let lastTime = Date.now();

    const unsubscribe = scrollYProgress.onChange((latest) => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      const deltaProgress = latest - lastProgress;
      
      if (deltaTime > 0) {
        const velocity = Math.abs(deltaProgress / deltaTime) * 1000;
        // Limiter la vélocité sur mobile pour de meilleures performances
        setScrollVelocity(isMobile ? Math.min(velocity, 5) : velocity);
      }

      lastProgress = latest;
      lastTime = now;

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

      // Navigation intelligente - moins aggressive sur mobile
      const introEnd = 1 / totalSections;
      const outroStart = (totalSections - 1) / totalSections;
      const offset = isMobile ? 0.05 : 0.1;
      setShowNavigation(latest > introEnd + offset && latest < outroStart - offset);
    });

    return unsubscribe;
  }, [scrollYProgress, promoteursGrouped.length, currentSection, isMobile]);

  // Smooth scroll optimisé pour mobile
  const scrollToSection = useCallback(
    (sectionIndex) => {
      if (!containerRef.current) return;
      
      const totalSections = promoteursGrouped.length + 2;
      const targetProgress = (sectionIndex + 1.5) / totalSections;
      const targetY = targetProgress * containerRef.current.scrollHeight;
      
      // Scroll plus doux sur mobile
      if (isMobile) {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      }
    },
    [promoteursGrouped.length, isMobile]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-black overflow-hidden"
      style={{ height: `${(promoteursGrouped.length + 2) * 100}vh` }}
    >
      {/* Background avec effets adaptés au mobile */}
      <BackgroundEffects scrollVelocity={scrollVelocity} isMobile={isMobile} />

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
          scrollVelocity={scrollVelocity}
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

// Section groupe optimisée pour mobile
const PromoteurGroupSection = ({
  promoteurGroup,
  groupIndex,
  isActive,
  totalSections,
  handleImageClick,
  progress,
  scrollVelocity,
  isMobile,
}) => {
  const sectionRef = useRef(null);
  
  if (!promoteurGroup || !Array.isArray(promoteurGroup) || !totalSections) {
    return null;
  }

  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.1 : 0.2 });

  // Calculs pour animations fluides
  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  // Effets de groupe adaptés au mobile
  const groupY = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    isMobile ? [50, 0, -25, -100] : [100, 0, -50, -200]
  );

  const groupOpacity = useTransform(
    progress,
    [sectionStart - 0.15, sectionStart - 0.05, sectionEnd - 0.1, sectionEnd],
    [0, 1, 1, 0]
  );

  const groupScale = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    isMobile ? [0.9, 1, 0.98, 0.85] : [0.8, 1, 0.95, 0.7]
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
          opacity: groupOpacity,
          scale: groupScale
        }}
      >
        {/* Grille responsive */}
        <div className={`grid gap-4 ${
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
              progress={progress}
              scrollVelocity={scrollVelocity}
              isInView={isInView}
              totalSections={totalSections}
              isMobile={isMobile}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Carte promoteur optimisée pour mobile
const PromoteurCard = ({
  promoteur,
  index,
  groupIndex,
  isGroupActive,
  handleImageClick,
  progress,
  scrollVelocity,
  isInView,
  totalSections,
  isMobile
}) => {
  if (!promoteur) {
    return null;
  }

  // Calculs pour animations adaptées au mobile
  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  // Effet de cascade adapté au mobile
  const isEven = index % 2 === 0;
  const baseOffset = isMobile ? (isEven ? -20 : 20) : (isEven ? -60 : 60);
  const velocityMultiplier = Math.min(scrollVelocity * (isMobile ? 0.02 : 0.05), isMobile ? 0.3 : 1);
  
  const cardX = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    [0, 0, baseOffset * (1 + velocityMultiplier), baseOffset * (isMobile ? 1.2 : 1.5)]
  );

  const cardRotateY = useTransform(
    progress,
    [sectionStart, sectionEnd],
    [0, isEven ? (isMobile ? -3 : -8) : (isMobile ? 3 : 8)]
  );

  const handleClick = useCallback(() => {
    if (handleImageClick && typeof handleImageClick === 'function') {
      handleImageClick(promoteur);
    }
  }, [handleImageClick, promoteur]);

  return (
    <motion.div
      className="cursor-pointer relative"
      style={{ 
        x: cardX,
        rotateY: cardRotateY
      }}
      onClick={handleClick}
      initial={{ 
        opacity: 0, 
        y: isMobile ? 30 : 50,
        scale: isMobile ? 0.95 : 0.9
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {
        opacity: 0, 
        y: isMobile ? 30 : 50,
        scale: isMobile ? 0.95 : 0.9
      }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut",
        delay: index * (isMobile ? 0.05 : 0.1)
      }}
      whileHover={isGroupActive ? { 
        scale: isMobile ? 1.02 : 1.05,
        rotateY: 0,
        transition: { duration: isMobile ? 0.3 : 0.4, ease: "easeOut" }
      } : {}}
      // Amélioration tactile pour mobile
      whileTap={isMobile ? { scale: 0.98 } : {}}
    >
      {/* Card adaptée au mobile */}
      <div className={`relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-3xl overflow-hidden border transition-all duration-500 w-full group ${
        isMobile ? 'h-[400px]' : 'h-[520px]'
      } ${
        isGroupActive 
          ? 'border-white/40 shadow-2xl shadow-white/10' 
          : 'border-white/20 hover:border-white/30'
      }`}>

        {/* Badge premium adapté */}
        <div className={`absolute z-20 ${isMobile ? 'top-3 right-3' : 'top-6 right-6'}`}>
          <motion.div 
            className={`bg-black/60 backdrop-blur-sm rounded-full border border-white/30 text-white font-medium ${
              isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-xs'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 + index * (isMobile ? 0.05 : 0.1) }}
          >
            <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
              <User className={isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
              <span className={isMobile ? 'hidden' : 'inline'}>Équipe</span>
              <span className={isMobile ? 'inline' : 'hidden'}>Pro</span>
            </div>
          </motion.div>
        </div>

        {/* Image adaptée au mobile */}
        <div className={`relative overflow-hidden ${isMobile ? 'h-60' : 'h-80'}`}>
          <motion.img
            src={promoteur.image || '/placeholder-image.jpg'}
            alt={promoteur.nom || 'Promoteur'}
            className={`w-full h-full object-cover transition-all group-hover:scale-110 ${
              isMobile ? 'duration-500' : 'duration-700'
            }`}
            style={{
              filter: isGroupActive ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)'
            }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Effet de brillance adapté */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Contenu adapté au mobile */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : 'p-8'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.5 + index * (isMobile ? 0.05 : 0.1), duration: 0.6 }}
        >
          <h3 className={`font-bold text-white mb-2 leading-tight ${
            isMobile ? 'text-lg' : 'text-2xl mb-3'
          }`}>
            {promoteur.nom || 'Nom non disponible'}
          </h3>
          
          <p className={`font-medium mb-3 leading-tight ${
            isMobile ? 'text-sm' : 'text-lg mb-4'
          } ${promoteur.colorClass || 'text-white/90'}`}>
            {promoteur.role || 'Rôle non spécifié'}
          </p>

          {/* Badge expertise adapté */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 ${
            isMobile ? 'px-2 py-1' : 'px-4 py-2'
          }`}>
            <MapPin className={`text-white/70 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span className={`text-white/90 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile 
                ? (promoteur.expertise || 'Expertise').substring(0, 15) + '...'
                : promoteur.expertise || 'Expertise non spécifiée'
              }
            </span>
          </div>
        </motion.div>

        {/* Effet de lueur pour la carte active */}
        {isGroupActive && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              boxShadow: isMobile ? '0 0 30px rgba(255,255,255,0.1)' : '0 0 50px rgba(255,255,255,0.1)'
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: isMobile ? 12 : 8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Background adapté au mobile
const BackgroundEffects = ({ scrollVelocity, isMobile }) => (
  <div className="fixed inset-0 z-0">
    {/* Gradient de base */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
    
    {/* Particules optimisées pour mobile */}
    {!isMobile && (
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 80px 80px',
        }}
        animate={{
          backgroundPosition: scrollVelocity > 5 
            ? ['0% 0%', '100% 100%'] 
            : ['0% 0%', '50% 50%']
        }}
        transition={{
          duration: scrollVelocity > 5 ? 20 : 40,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    )}
  </div>
);

// Section d'introduction adaptée au mobile
const IntroSection = ({ isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.3 : 0.5 });
  
  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Effet de lumière */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 2, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: isMobile ? 1.5 : 2, ease: "easeOut" }}
      />

      <motion.div
        className={`text-center z-10 max-w-4xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}
        initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 50 }}
        transition={{ duration: isMobile ? 0.8 : 1, ease: "easeOut" }}
      >
        {/* Badge animé */}
        <motion.div
          className={isMobile ? 'mb-6' : 'mb-8'}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.3, duration: isMobile ? 0.6 : 0.8 }}
        >
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full border border-white/20 ${
            isMobile ? 'px-4 py-2 mb-4' : 'px-8 py-4 mb-8'
          }`}>
            <Sparkles className={`text-white ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <span className={`text-white font-semibold tracking-wider ${isMobile ? 'text-sm' : ''}`}>
              L'ÉQUIPE
            </span>
          </div>
        </motion.div>
        
        {/* Titre principal */}
        <motion.h1
          className={`font-bold text-white mb-6 leading-none ${
            isMobile ? 'text-4xl sm:text-5xl' : 'text-7xl lg:text-8xl mb-8'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: isMobile ? 0.8 : 1 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Nos Promoteurs
          </span>
        </motion.h1>
        
        {/* Description */}
        <motion.p
          className={`text-white/80 max-w-3xl mx-auto leading-relaxed font-light ${
            isMobile ? 'text-lg px-2' : 'text-2xl'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: isMobile ? 0.8 : 1 }}
        >
          Découvrez les visionnaires qui façonnent l'avenir de nos projets immobiliers.
          {isMobile && <br />}
          <span className="text-white/60">
            Chaque promoteur apporte son expertise unique pour créer des espaces d'exception.
          </span>
        </motion.p>

        {/* Indicateur de scroll */}
        <motion.div
          className={isMobile ? 'mt-12' : 'mt-16'}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isMobile ? 1.2 : 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, isMobile ? 8 : 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/50 text-sm font-medium"
          >
            <ChevronDown className={`mx-auto mb-2 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            {isMobile ? 'Découvrir' : 'Découvrir l\'équipe'}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient de transition */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent ${
          isMobile ? 'h-20' : 'h-40'
        }`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
};

// Section de conclusion adaptée au mobile
const OutroSection = ({ totalPromoteurs, progress, totalSections, isMobile }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: isMobile ? 0.2 : 0.3 });
  
  const totalWithIntroOutro = totalSections + 2;
  const outroStart = (totalSections + 1) / totalWithIntroOutro;
  const outroEnd = 1;
  
  // Animation adaptée au mobile
  const outroY = useTransform(
    progress,
    [outroStart - 0.2, outroStart, outroEnd],
    isMobile ? [-60, 0, 0] : [-100, 0, 0]
  );

  const outroOpacity = useTransform(
    progress,
    [outroStart - 0.15, outroStart, outroEnd],
    [0, 1, 1]
  );

  const outroScale = useTransform(
    progress,
    [outroStart - 0.1, outroStart, outroEnd],
    isMobile ? [0.95, 1, 1] : [0.9, 1, 1]
  );
  
  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Effet de lumière finale */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-purple-500/5 to-transparent"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 3, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: isMobile ? 2 : 3, ease: "easeOut" }}
      />

      <motion.div
        className={`text-center z-10 max-w-5xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}
        style={{
          y: outroY,
          opacity: outroOpacity,
          scale: outroScale
        }}
      >
        {/* Statistiques adaptées */}
        <motion.div
          className={isMobile ? 'mb-8' : 'mb-12'}
          initial={{ y: isMobile ? -20 : -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: isMobile ? -20 : -30, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={`grid gap-4 mb-8 ${
            isMobile ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 md:grid-cols-3 gap-8 mb-12'
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
            isMobile ? 'text-3xl sm:text-4xl' : 'text-5xl lg:text-6xl mb-8'
          }`}
          initial={{ y: isMobile ? -30 : -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: isMobile ? -30 : -50, opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ensemble, nous bâtissons l'avenir
          </span>
        </motion.h2>
        
        {/* Description finale */}
        <motion.p
          className={`text-white/80 max-w-3xl mx-auto leading-relaxed font-light ${
            isMobile ? 'text-lg mb-8 px-2' : 'text-xl mb-12'
          }`}
          initial={{ y: isMobile ? -20 : -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: isMobile ? -20 : -30, opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Chaque projet est le fruit d'une collaboration étroite entre nos promoteurs.
          {isMobile && <br />}
          <span className="text-white/60">
            Leur vision commune et leur expertise complémentaire donnent naissance à des réalisations exceptionnelles.
          </span>
        </motion.p>

        {/* Call to action */}
        <motion.div
          className={`flex justify-center items-center ${
            isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'
          }`}
          initial={{ y: isMobile ? -15 : -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: isMobile ? -15 : -20, opacity: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <motion.button
            className={`bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all duration-300 ${
              isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
            }`}
            whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? -1 : -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Nous contacter
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Particules finales adaptées */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ y: -100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ y: -50 }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

// StatCard adaptée au mobile
const StatCard = ({ icon, number, label, delay, isInView, isMobile }) => (
  <motion.div
    className={`text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 ${
      isMobile ? 'p-4' : 'p-6'
    }`}
    initial={{ y: isMobile ? -30 : -50, opacity: 0, scale: 0.9 }}
    animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: isMobile ? -30 : -50, opacity: 0, scale: 0.9 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? -2 : -5 }}
  >
    <motion.div
      className={`text-white/80 mb-3 flex justify-center ${isMobile ? 'mb-2' : 'mb-4'}`}
      animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ delay: delay + 0.5, duration: isMobile ? 1.5 : 2, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
    <motion.div
      className={`font-bold text-white mb-1 ${isMobile ? 'text-2xl' : 'text-3xl mb-2'}`}
      initial={{ scale: 0, y: isMobile ? -15 : -20 }}
      animate={isInView ? { scale: 1, y: 0 } : { scale: 0, y: isMobile ? -15 : -20 }}
      transition={{ delay: delay + 0.3, duration: 0.5, type: "spring", bounce: 0.6 }}
    >
      {number}
    </motion.div>
    <div className={`text-white/70 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
      {label}
    </div>
  </motion.div>
);

// Navigation adaptée au mobile
const NavigationDots = ({ showNavigation, totalGroups, currentSection, scrollToSection, isMobile }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 ${
          isMobile ? 'right-4' : 'right-8'
        }`}
        initial={{ opacity: 0, x: isMobile ? 30 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isMobile ? 30 : 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={`flex flex-col gap-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl ${
          isMobile ? 'p-2' : 'gap-3 p-4'
        }`}>
          {Array.from({ length: totalGroups }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`relative rounded-full transition-all duration-300 ${
                isMobile ? 'w-2 h-2' : 'w-3 h-3'
              } ${
                index === currentSection
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              whileHover={{ scale: isMobile ? 1.2 : 1.3 }}
              whileTap={{ scale: 0.8 }}
            >
              {index === currentSection && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  layoutId="activeSection"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
              <span className="sr-only">Groupe {index + 1}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Compteur adapté au mobile
const ProgressCounter = ({ showNavigation, currentSection, totalSections, progress, isMobile }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed z-50 ${
          isMobile ? 'bottom-4 left-4' : 'bottom-8 left-8'
        }`}
        initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isMobile ? 20 : 30 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl ${
          isMobile ? 'px-3 py-2' : 'px-6 py-4'
        }`}>
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
            <div className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-lg'}`}>
              {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
            </div>
            <div className={`bg-white/20 rounded-full overflow-hidden ${
              isMobile ? 'w-12 h-1.5' : 'w-20 h-2'
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

// Actions flottantes adaptées au mobile
const FloatingActions = ({ showNavigation, currentSection, scrollToSection, totalSections, isMobile }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className={`fixed z-50 flex flex-col gap-2 ${
          isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8 gap-3'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Bouton retour en haut */}
        {currentSection > 0 && (
          <motion.button
            className={`bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all duration-300 shadow-2xl ${
              isMobile ? 'p-3' : 'p-4'
            }`}
            onClick={() => scrollToSection(0)}
            whileHover={{ scale: isMobile ? 1.05 : 1.1, y: isMobile ? -1 : -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <ArrowUp className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default GalleryGrid;