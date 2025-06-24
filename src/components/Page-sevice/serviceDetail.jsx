import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  LayoutTemplate,
  ListChecks,
  Package,
  X,
  Sparkles,
  Zap,
  Star,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { colorVariants, servicesJson2 } from "./Json";

// --- Composant TabButton (responsive) ---
function TabButton({ id, label, icon, isActive, onClick, color, isMobile = false }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.03, 
        x: isMobile ? 0 : 8,
        rotateY: isMobile ? 0 : 5,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(id)}
      className={`group relative flex w-full items-center gap-3 px-4 md:px-5 py-3 md:py-4 text-sm font-semibold transition-all duration-500 rounded-xl md:rounded-2xl overflow-hidden transform-gpu ${
        isActive
          ? `${colorVariants[color].accent} text-white shadow-2xl`
          : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Effet de fond dynamique pour l'état actif */}
      {isActive && (
        <>
          <motion.div
            layoutId={`tab-bg-${color}-${isMobile ? 'mobile' : 'desktop'}`}
            className={`absolute inset-0 bg-gradient-to-r ${colorVariants[color].gradient} opacity-90`}
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
          
          {/* Particules flottantes - réduites sur mobile */}
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${15 + i * (isMobile ? 15 : 10)}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}

      {/* Effet de lueur au survol - désactivé sur mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={isActive ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.div>
        <span className="relative text-sm md:text-base">
          {label}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          )}
        </span>
      </div>

      {/* Effet de brillance qui traverse - désactivé sur mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}

// --- Composant principal responsive ---
function ServiceDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesJson2.find((s) => s.id === serviceId);

  useEffect(() => {
    if (!service) {
      navigate("/");
    }
  }, [service, navigate]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  if (!service) {
    return null;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Arrière-plan dynamique et vivant - adapté selon l'écran */}
      <div className="absolute inset-0 -z-10">
        {/* Grille animée */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px]"></div>
        
        {/* Orbes de lumière qui suivent la souris - désactivé sur mobile */}
        {!isMobile && (
          <motion.div
            className={`absolute w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r ${colorVariants[service.color].gradient} rounded-full blur-3xl opacity-10`}
            animate={{
              x: mousePosition.x - (isMobile ? 128 : 200),
              y: mousePosition.y - (isMobile ? 128 : 200),
            }}
            transition={{ type: "spring", stiffness: 50, damping: 30 }}
          />
        )}

        {/* Particules flottantes dans l'arrière-plan - réduites sur mobile */}
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r ${colorVariants[service.color].gradient} rounded-full`}
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, isMobile ? -50 : -100, 0],
              x: [0, Math.sin(i) * (isMobile ? 25 : 50), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Aurores boréales */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Header responsive */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative z-20 bg-black/40 backdrop-blur-xl border-b border-slate-700/30"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotate: isMobile ? 0 : -5,
                  boxShadow: isMobile ? undefined : "0 0 30px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="flex-shrink-0 p-2 md:p-3 rounded-xl md:rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 transition-all duration-500 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
              </motion.button>
              
              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                <motion.div
                  className={`flex-shrink-0 p-2 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${colorVariants[service.color].gradient} shadow-2xl relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: isMobile ? 0 : 5,
                    boxShadow: isMobile ? undefined : "0 0 40px rgba(139, 92, 246, 0.4)"
                  }}
                  animate={!isMobile ? {
                    boxShadow: [
                      "0 0 20px rgba(139, 92, 246, 0.2)",
                      "0 0 30px rgba(139, 92, 246, 0.4)",
                      "0 0 20px rgba(139, 92, 246, 0.2)"
                    ]
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Effet de brillance tournante - désactivé sur mobile */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <div className="relative z-10 w-5 h-5 md:w-6 md:h-6">
                    {service.icon}
                  </div>
                </motion.div>
                
                <div className="min-w-0 flex-1">
                  <motion.h1 
                    className="text-lg md:text-2xl lg:text-3xl font-black text-white relative truncate"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {service.title}
                    
                    {/* Effet de lueur sur le titre - désactivé sur mobile */}
                    {!isMobile && (
                      <motion.div
                        className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 blur-sm opacity-30"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {service.title}
                      </motion.div>
                    )}
                  </motion.h1>
                  
                  <motion.p 
                    className={`text-sm md:text-lg ${colorVariants[service.color].accent} font-semibold truncate`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {service.subtitle}
                  </motion.p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Bouton menu mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 md:p-3 rounded-xl md:rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 transition-all duration-300 backdrop-blur-sm"
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotate: isMobile ? 0 : 90,
                  boxShadow: isMobile ? undefined : "0 0 30px rgba(239, 68, 68, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-slate-800/80 hover:bg-red-900/50 border border-slate-600/50 hover:border-red-500/50 transition-all duration-500 backdrop-blur-sm"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-slate-300" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Menu mobile overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-b border-slate-700/50 mt-20"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <nav className="space-y-3">
                  <TabButton
                    id="overview"
                    label="Vue d'ensemble"
                    icon={<LayoutTemplate size={18} />}
                    isActive={activeTab === "overview"}
                    onClick={(id) => {
                      setActiveTab(id);
                      setIsMobileMenuOpen(false);
                    }}
                    color={service.color}
                    isMobile={true}
                  />
                  <TabButton
                    id="technologies"
                    label="Technologies"
                    icon={<Code size={18} />}
                    isActive={activeTab === "technologies"}
                    onClick={(id) => {
                      setActiveTab(id);
                      setIsMobileMenuOpen(false);
                    }}
                    color={service.color}
                    isMobile={true}
                  />
                  <TabButton
                    id="process"
                    label="Notre Processus"
                    icon={<ListChecks size={18} />}
                    isActive={activeTab === "process"}
                    onClick={(id) => {
                      setActiveTab(id);
                      setIsMobileMenuOpen(false);
                    }}
                    color={service.color}
                    isMobile={true}
                  />
                  <TabButton
                    id="deliverables"
                    label="Livrables Clés"
                    icon={<Package size={18} />}
                    isActive={activeTab === "deliverables"}
                    onClick={(id) => {
                      setActiveTab(id);
                      setIsMobileMenuOpen(false);
                    }}
                    color={service.color}
                    isMobile={true}
                  />
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Barre latérale - cachée sur mobile */}
          <motion.aside
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
            className="hidden lg:block w-80 xl:w-96 flex-shrink-0"
          >
            <div className="sticky top-8 space-y-6 xl:space-y-8">
              {/* Navigation */}
              <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl xl:rounded-3xl p-6 xl:p-8 overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${colorVariants[service.color].gradient} opacity-5`}
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.h3 
                  className="text-lg xl:text-xl font-bold text-white mb-4 xl:mb-6 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Navigation
                </motion.h3>
                
                <nav className="space-y-2 xl:space-y-3">
                  <TabButton
                    id="overview"
                    label="Vue d'ensemble"
                    icon={<LayoutTemplate size={20} />}
                    isActive={activeTab === "overview"}
                    onClick={setActiveTab}
                    color={service.color}
                  />
                  <TabButton
                    id="technologies"
                    label="Technologies"
                    icon={<Code size={20} />}
                    isActive={activeTab === "technologies"}
                    onClick={setActiveTab}
                    color={service.color}
                  />
                  <TabButton
                    id="process"
                    label="Notre Processus"
                    icon={<ListChecks size={20} />}
                    isActive={activeTab === "process"}
                    onClick={setActiveTab}
                    color={service.color}
                  />
                  <TabButton
                    id="deliverables"
                    label="Livrables Clés"
                    icon={<Package size={20} />}
                    isActive={activeTab === "deliverables"}
                    onClick={setActiveTab}
                    color={service.color}
                  />
                </nav>
              </div>

              {/* Call to Action */}
              <motion.div 
                className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl xl:rounded-3xl p-6 xl:p-8 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${colorVariants[service.color].gradient} opacity-10`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <h3 className="text-lg xl:text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Prêt à révolutionner ?
                </h3>
                
                <p className="text-slate-400 mb-6 leading-relaxed text-sm xl:text-base">
                  Transformons vos idées en réalité digitale extraordinaire
                </p>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-full text-white font-bold py-3 xl:py-4 rounded-xl xl:rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden ${colorVariants[service.color].button} shadow-2xl text-sm xl:text-base`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <Star className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="relative z-10">Démarrer l'aventure</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.aside>

          {/* Zone de contenu responsive */}
          <motion.main
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 80 }}
            className="flex-1 min-h-[calc(100vh-200px)]"
          >
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 h-full overflow-hidden">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${colorVariants[service.color].gradient} opacity-5`}
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 40, rotateX: isMobile ? 0 : -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: isMobile ? 0 : 10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full relative z-10"
                  style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
                >
                  {activeTab === "overview" && (
                    <div className="space-y-6 md:space-y-8">
                      <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 relative"
                      >
                        Vision du service
                        <motion.div
                          className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="prose prose-lg md:prose-xl prose-invert max-w-none"
                      >
                        <motion.p 
                          className="text-slate-300 text-base md:text-xl leading-relaxed whitespace-pre-line relative"
                          whileHover={isMobile ? {} : { scale: 1.02 }}
                        >
                          {service.detailedDescription}
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "technologies" && (
                    <div className="space-y-6 md:space-y-8">
                      <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 relative"
                      >
                        Arsenal technologique
                        <motion.div
                          className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                      >
                        {service.technologies.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 30, rotateY: isMobile ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.6 }}
                            whileHover={isMobile ? { scale: 1.02 } : { 
                              scale: 1.05, 
                              rotateY: 5,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                            }}
                            className="relative flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-slate-800/40 border border-slate-600/30 rounded-xl md:rounded-2xl hover:bg-slate-700/50 transition-all duration-500 overflow-hidden group cursor-pointer"
                          >
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${colorVariants[service.color].gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                            />
                            
                            <motion.div
                              className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r ${colorVariants[service.color].gradient} relative flex-shrink-0`}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                              }}
                            >
                              {!isMobile && (
                                <motion.div
                                  className="absolute inset-0 rounded-full border-2 border-purple-400/30"
                                  animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.5, 0, 0.5]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: i * 0.2
                                  }}
                                />
                              )}
                            </motion.div>
                            
                            <span className="font-bold text-slate-200 relative z-10 group-hover:text-white transition-colors duration-300 text-sm md:text-base">
                              {tech}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "process" && (
                    <div className="space-y-6 md:space-y-8">
                      <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 relative"
                      >
                        Méthodologie d'excellence
                        <motion.div
                          className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 md:space-y-6"
                      >
                        {service.processSteps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50, rotateY: isMobile ? 0 : -15 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: 0.2 * i, duration: 0.8 }}
                            whileHover={isMobile ? { scale: 1.02 } : { 
                              scale: 1.02, 
                              x: 10,
                              boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
                            }}
                            className="relative flex items-start gap-4 md:gap-6 p-6 md:p-8 bg-slate-800/40 border border-slate-600/30 rounded-xl md:rounded-2xl hover:bg-slate-700/50 transition-all duration-500 overflow-hidden group cursor-pointer"
                          >
                            {/* Ligne de connexion - cachée sur mobile */}
                            {!isMobile && i < service.processSteps.length - 1 && (
                              <motion.div
                                className="absolute left-6 md:left-8 top-16 md:top-20 w-0.5 h-12 md:h-16 bg-gradient-to-b from-purple-400/50 to-transparent"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.3 * i, duration: 0.8 }}
                              />
                            )}

                            <motion.div
                              className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl font-black text-lg md:text-xl text-white bg-gradient-to-br ${colorVariants[service.color].gradient} shadow-2xl relative overflow-hidden`}
                              whileHover={isMobile ? {} : { 
                                rotate: 10,
                                scale: 1.1
                              }}
                            >
                              {!isMobile && (
                                <motion.div
                                  className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0, 0.5, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: i * 0.5
                                  }}
                                />
                              )}
                              <span className="relative z-10">{i + 1}</span>
                            </motion.div>
                            
                            <div className="flex-1 pt-2 md:pt-3 min-w-0">
                              <motion.p 
                                className="text-slate-200 text-base md:text-lg leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300"
                                whileHover={isMobile ? {} : { x: 5 }}
                              >
                                {step}
                              </motion.p>
                            </div>

                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${colorVariants[service.color].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "deliverables" && (
                    <div className="space-y-6 md:space-y-8">
                      <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 relative"
                      >
                        Résultats garantis
                        <motion.div
                          className="absolute bottom-0 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                      >
                        {service.deliverables.map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 30, rotateX: isMobile ? 0 : -20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.6 }}
                            whileHover={isMobile ? { scale: 1.02 } : { 
                              scale: 1.03, 
                              y: -5,
                              boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
                            }}
                            className="relative flex items-center gap-4 md:gap-5 p-4 md:p-6 bg-slate-800/40 border border-slate-600/30 rounded-xl md:rounded-2xl hover:bg-slate-700/50 transition-all duration-500 overflow-hidden group cursor-pointer"
                          >
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${colorVariants[service.color].gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                            />

                            <motion.div
                              whileHover={isMobile ? {} : { 
                                rotate: 360,
                                scale: 1.2
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <CheckCircle2
                                className={`w-6 h-6 md:w-8 md:h-8 flex-shrink-0 ${colorVariants[service.color].accent} relative z-10`}
                              />
                            </motion.div>
                            
                            <span className="font-bold text-slate-200 relative z-10 group-hover:text-white transition-colors duration-300 text-sm md:text-lg">
                              {item}
                            </span>

                            {/* Particules de succès - désactivées sur mobile */}
                            {!isMobile && [...Array(3)].map((_, particleI) => (
                              <motion.div
                                key={particleI}
                                className="absolute w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100"
                                style={{
                                  left: `${30 + particleI * 20}%`,
                                  top: `${40 + particleI * 10}%`,
                                }}
                                animate={{
                                  y: [0, -20, 0],
                                  x: [0, Math.sin(particleI) * 10, 0],
                                  opacity: [0, 1, 0],
                                  scale: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: particleI * 0.3,
                                  ease: "easeOut"
                                }}
                              />
                            ))}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceDetailPage;