import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUp, User, MapPin, Sparkles, Heart, Star, Users } from 'lucide-react';

const GalleryGrid = ({ groupedPromoteurs, handleImageClick }) => {
  // Vérification et préparation des données AVANT tous les hooks
  const allPromoteurs = useMemo(() => {
    if (!groupedPromoteurs || typeof groupedPromoteurs !== 'object') {
      return [];
    }
    return Object.values(groupedPromoteurs).flat();
  }, [groupedPromoteurs]);

  // Grouper les promoteurs par lignes de 3
  const promoteursGrouped = useMemo(() => {
    const groups = [];
    for (let i = 0; i < allPromoteurs.length; i += 3) {
      groups.push(allPromoteurs.slice(i, i + 3));
    }
    return groups;
  }, [allPromoteurs]);

  // Early return si pas de données
  if (!allPromoteurs || allPromoteurs.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Aucun promoteur à afficher</h2>
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

  // Calcul de la vélocité de scroll pour des effets dynamiques
  useEffect(() => {
    let lastProgress = 0;
    let lastTime = Date.now();

    const unsubscribe = scrollYProgress.onChange((latest) => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      const deltaProgress = latest - lastProgress;
      
      if (deltaTime > 0) {
        const velocity = Math.abs(deltaProgress / deltaTime) * 1000;
        setScrollVelocity(velocity);
      }

      lastProgress = latest;
      lastTime = now;

      // Calcul section actuelle avec intro et outro (basé sur les groupes maintenant)
      const totalSections = promoteursGrouped.length + 2; // +2 pour intro et outro
      const exactPosition = latest * totalSections;
      const newSection = Math.max(0, Math.round(exactPosition) - 1); // -1 car intro = section -1
      const clampedSection = Math.min(
        Math.max(0, newSection),
        promoteursGrouped.length - 1
      );

      if (clampedSection !== currentSection && newSection < promoteursGrouped.length) {
        setCurrentSection(clampedSection);
      }

      // Navigation intelligente - apparaît dans la zone des cartes seulement
      const introEnd = 1 / totalSections;
      const outroStart = (totalSections - 1) / totalSections;
      setShowNavigation(latest > introEnd + 0.1 && latest < outroStart - 0.1);
    });

    return unsubscribe;
  }, [scrollYProgress, promoteursGrouped.length, currentSection]);

  // Smooth scroll optimisé
  const scrollToSection = useCallback(
    (sectionIndex) => {
      if (!containerRef.current) return;
      
      const totalSections = promoteursGrouped.length + 2; // +2 pour intro et outro
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
      style={{ height: `${(promoteursGrouped.length + 2) * 100}vh` }} // +2 pour intro et outro
    >
      {/* Background avec particules subtiles */}
      <BackgroundEffects scrollVelocity={scrollVelocity} />

      {/* Section d'introduction */}
      <IntroSection />

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
        />
      ))}

      {/* Section de conclusion avec animation du haut vers le bas */}
      <OutroSection 
        totalPromoteurs={allPromoteurs.length} 
        progress={scrollYProgress}
        totalSections={promoteursGrouped.length}
      />

      {/* Navigation améliorée */}
      <NavigationDots 
        showNavigation={showNavigation}
        totalGroups={promoteursGrouped.length}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      {/* Compteur avec progression */}
      <ProgressCounter 
        showNavigation={showNavigation}
        currentSection={currentSection}
        totalSections={promoteursGrouped.length}
        progress={scrollYProgress}
      />

      {/* Actions flottantes */}
      <FloatingActions 
        showNavigation={showNavigation}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        totalSections={promoteursGrouped.length}
      />
    </div>
  );
};

// Nouvelle section pour un groupe de 3 promoteurs
const PromoteurGroupSection = ({
  promoteurGroup,
  groupIndex,
  isActive,
  totalSections,
  handleImageClick,
  progress,
  scrollVelocity,
}) => {
  const sectionRef = useRef(null);
  
  if (!promoteurGroup || !Array.isArray(promoteurGroup) || !totalSections) {
    return null;
  }

  const isInView = useInView(sectionRef, { threshold: 0.2 });

  // Calculs pour animations fluides (ajusté pour intro + outro)
  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  // Effets de groupe basés sur le scroll
  const groupY = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    [100, 0, -50, -200]
  );

  const groupOpacity = useTransform(
    progress,
    [sectionStart - 0.15, sectionStart - 0.05, sectionEnd - 0.1, sectionEnd],
    [0, 1, 1, 0]
  );

  const groupScale = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    [0.8, 1, 0.95, 0.7]
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative px-8"
    >
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ 
          y: groupY,
          opacity: groupOpacity,
          scale: groupScale
        }}
      >
        {/* Grille 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Carte individuelle de promoteur (conserve le design original)
const PromoteurCard = ({
  promoteur,
  index,
  groupIndex,
  isGroupActive,
  handleImageClick,
  progress,
  scrollVelocity,
  isInView,
  totalSections
}) => {
  if (!promoteur) {
    return null;
  }

  // Calculs pour animations individuelles (conserve la logique originale)
  const totalWithIntroOutro = totalSections + 2;
  const sectionStart = (groupIndex + 1) / totalWithIntroOutro;
  const sectionEnd = (groupIndex + 2) / totalWithIntroOutro;
  
  // Effet de cascade pour chaque carte dans le groupe
  const isEven = index % 2 === 0;
  const baseOffset = isEven ? -60 : 60;
  const velocityMultiplier = Math.min(scrollVelocity * 0.05, 1);
  
  const cardX = useTransform(
    progress,
    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
    [0, 0, baseOffset * (1 + velocityMultiplier), baseOffset * 1.5]
  );

  const cardRotateY = useTransform(
    progress,
    [sectionStart, sectionEnd],
    [0, isEven ? -8 : 8]
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
        y: 50,
        scale: 0.9
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {
        opacity: 0, 
        y: 50,
        scale: 0.9
      }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.1
      }}
      whileHover={isGroupActive ? { 
        scale: 1.05,
        rotateY: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      } : {}}
    >
      {/* Card premium - DESIGN ORIGINAL CONSERVÉ */}
      <div className={`relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-3xl overflow-hidden border transition-all duration-500 w-full h-[520px] group ${
        isGroupActive 
          ? 'border-white/40 shadow-2xl shadow-white/10' 
          : 'border-white/20 hover:border-white/30'
      }`}>

        {/* Badge premium */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div 
            className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/30 text-white text-xs font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              Équipe
            </div>
          </motion.div>
        </div>

        {/* Image avec effets - DESIGN ORIGINAL */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={promoteur.image || '/placeholder-image.jpg'}
            alt={promoteur.nom || 'Promoteur'}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              filter: isGroupActive ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)'
            }}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          {/* Overlay dynamique */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Effet de brillance au survol */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Contenu avec animations - DESIGN ORIGINAL */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
            {promoteur.nom || 'Nom non disponible'}
          </h3>
          
          <p className={`text-lg font-medium mb-4 leading-tight ${promoteur.colorClass || 'text-white/90'}`}>
            {promoteur.role || 'Rôle non spécifié'}
          </p>

          {/* Badge expertise amélioré */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30">
            <MapPin className="w-4 h-4 text-white/70" />
            <span className="text-white/90 text-sm font-medium">
              {promoteur.expertise || 'Expertise non spécifiée'}
            </span>
          </div>
        </motion.div>

        {/* Effet de lueur pour la carte active - DESIGN ORIGINAL */}
        {isGroupActive && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              boxShadow: '0 0 50px rgba(255,255,255,0.1)'
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Background avec effets subtils - INCHANGÉ
const BackgroundEffects = ({ scrollVelocity }) => (
  <div className="fixed inset-0 z-0">
    {/* Gradient de base */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black" />
    
    {/* Particules dynamiques basées sur la vélocité */}
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
  </div>
);

// Section d'introduction améliorée - INCHANGÉE
const IntroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.5 });
  
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
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Badge animé */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold tracking-wider">L'ÉQUIPE</span>
          </div>
        </motion.div>
        
        {/* Titre principal */}
        <motion.h1
          className="text-7xl lg:text-8xl font-bold text-white mb-8 leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Nos Promoteurs
          </span>
        </motion.h1>
        
        {/* Description */}
        <motion.p
          className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Découvrez les visionnaires qui façonnent l'avenir de nos projets immobiliers.
          <br />
          <span className="text-white/60">
            Chaque promoteur apporte son expertise unique pour créer des espaces d'exception.
          </span>
        </motion.p>

        {/* Indicateur de scroll animé */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/50 text-sm font-medium"
          >
            <ChevronDown className="w-6 h-6 mx-auto mb-2" />
            Découvrir l'équipe
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient de transition */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
};

// Section de conclusion avec animation du haut vers le bas
const OutroSection = ({ totalPromoteurs, progress, totalSections }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });
  
  // Calcul pour l'animation de scroll de la section outro
  const totalWithIntroOutro = totalSections + 2;
  const outroStart = (totalSections + 1) / totalWithIntroOutro;
  const outroEnd = 1;
  
  // Animation du haut vers le bas basée sur le scroll
  const outroY = useTransform(
    progress,
    [outroStart - 0.2, outroStart, outroEnd],
    [-100, 0, 0]
  );

  const outroOpacity = useTransform(
    progress,
    [outroStart - 0.15, outroStart, outroEnd],
    [0, 1, 1]
  );

  const outroScale = useTransform(
    progress,
    [outroStart - 0.1, outroStart, outroEnd],
    [0.9, 1, 1]
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
        transition={{ duration: 3, ease: "easeOut" }}
      />

      <motion.div
        className="text-center z-10 max-w-5xl mx-auto px-8"
        style={{
          y: outroY,
          opacity: outroOpacity,
          scale: outroScale
        }}
      >
        {/* Statistiques animées */}
        <motion.div
          className="mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard
              icon={<Users className="w-8 h-8" />}
              number={totalPromoteurs}
              label="Promoteurs"
              delay={0.4}
              isInView={isInView}
            />
            <StatCard
              icon={<Star className="w-8 h-8" />}
              number="100%"
              label="Excellence"
              delay={0.6}
              isInView={isInView}
            />
            <StatCard
              icon={<Heart className="w-8 h-8" />}
              number="∞"
              label="Passion"
              delay={0.8}
              isInView={isInView}
            />
          </div>
        </motion.div>
        
        {/* Message de conclusion */}
        <motion.h2
          className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ensemble, nous bâtissons l'avenir
          </span>
        </motion.h2>
        
        {/* Description finale */}
        <motion.p
          className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Chaque projet est le fruit d'une collaboration étroite entre nos promoteurs.
          <br />
          <span className="text-white/60">
            Leur vision commune et leur expertise complémentaire donnent naissance à des réalisations exceptionnelles.
          </span>
        </motion.p>

        {/* Call to action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Nous contacter
          </motion.button>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ y: -10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
        </motion.div>
      </motion.div>

      {/* Particules flottantes finales venant du haut */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
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
    </section>
  );
};

const StatCard = ({ icon, number, label, delay, isInView }) => (
  <motion.div
    className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20"
    initial={{ y: -50, opacity: 0, scale: 0.9 }}
    animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: -50, opacity: 0, scale: 0.9 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <motion.div
      className="text-white/80 mb-4 flex justify-center"
      animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
      transition={{ delay: delay + 0.5, duration: 2, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
    <motion.div
      className="text-3xl font-bold text-white mb-2"
      initial={{ scale: 0, y: -20 }}
      animate={isInView ? { scale: 1, y: 0 } : { scale: 0, y: -20 }}
      transition={{ delay: delay + 0.3, duration: 0.5, type: "spring", bounce: 0.6 }}
    >
      {number}
    </motion.div>
    <div className="text-white/70 text-sm font-medium">{label}</div>
  </motion.div>
);

const NavigationDots = ({ showNavigation, totalGroups, currentSection, scrollToSection }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.3 }}
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

const ProgressCounter = ({ showNavigation, currentSection, totalSections, progress }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
      >
        <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="text-white font-semibold text-lg">
              {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
            </div>
            <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
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

const FloatingActions = ({ showNavigation, currentSection, scrollToSection, totalSections }) => (
  <AnimatePresence>
    {showNavigation && (
      <motion.div
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Bouton retour en haut */}
        {currentSection > 0 && (
          <motion.button
            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all duration-300 shadow-2xl"
            onClick={() => scrollToSection(0)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default GalleryGrid;