import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { servicesJson2 } from "./Json";

// Animations fluides et organiques
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    rotateX: -15,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  },
};

// Couleurs dynamiques pour chaque service
const colorVariants = {
  purple: {
    gradient: "bg-gradient-to-br from-purple-600/20 via-violet-500/20 to-fuchsia-600/20",
    glow: "shadow-purple-500/25",
    border: "border-purple-500/30",
    text: "text-purple-300"
  },
  blue: {
    gradient: "bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-teal-600/20",
    glow: "shadow-cyan-500/25",
    border: "border-cyan-500/30",
    text: "text-cyan-300"
  },
  green: {
    gradient: "bg-gradient-to-br from-green-600/20 via-emerald-500/20 to-lime-600/20",
    glow: "shadow-emerald-500/25",
    border: "border-emerald-500/30",
    text: "text-emerald-300"
  },
  orange: {
    gradient: "bg-gradient-to-br from-orange-600/20 via-amber-500/20 to-yellow-600/20",
    glow: "shadow-amber-500/25",
    border: "border-amber-500/30",
    text: "text-amber-300"
  },
  pink: {
    gradient: "bg-gradient-to-br from-pink-600/20 via-rose-500/20 to-red-600/20",
    glow: "shadow-rose-500/25",
    border: "border-rose-500/30",
    text: "text-rose-300"
  },
  indigo: {
    gradient: "bg-gradient-to-br from-indigo-600/20 via-blue-500/20 to-purple-600/20",
    glow: "shadow-indigo-500/25",
    border: "border-indigo-500/30",
    text: "text-indigo-300"
  }
};

function ServicesPage() {
  return (
    <div className="relative bg-black text-white p-8 md:p-16 min-h-screen overflow-hidden">
      {/* Arrière-plan vivant et animé */}
      <div className="absolute inset-0 -z-10">
        {/* Grille de base */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Particules flottantes animées */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              left: `${10 + (i * 6) % 90}%`,
              top: `${20 + (i * 7) % 60}%`,
            }}
          />
        ))}

        {/* Orbes de lumière qui bougent */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 120, 0],
            y: [0, 100, -70, 0],
            scale: [1, 0.9, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute top-1/2 left-3/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 80, -90, 0],
            scale: [1, 1.1, 0.7, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Titre avec effet de machine à écrire */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="relative inline-block">
              Des services{" "}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-cyan-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                extraordinaires
              </motion.span>
              
              {/* Effet de lueur derrière le texte */}
              <motion.div
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-cyan-400 blur-xl opacity-30"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Des services extraordinaires
              </motion.div>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Nous transformons vos{" "}
            <span className="text-blue-500 font-semibold">rêves digitaux</span>{" "}
            en réalités tangibles avec une créativité sans limites
          </motion.p>
        </motion.div>

        {/* Grille des services avec effets 3D */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesJson2.map((service, index) => (
            <Link to={`/service/${service.id}`} key={service.id} className="block group h-full">
              <motion.div
                variants={cardVariants}
                layoutId={`service-card-${service.id}`}
                whileHover={{ 
                  y: -15, 
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative p-8 h-full rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 overflow-hidden transition-all duration-500 hover:bg-slate-800/60 hover:border-slate-600/80 hover:shadow-2xl group perspective-1000"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Effet de lueur au survol qui suit la souris */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${colorVariants[service.color]?.gradient.split(' ')[1] || 'purple-500/20'}, transparent 70%)`
                  }}
                />

                {/* Bordure animée */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-cyan-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>

                <div className="relative flex flex-col h-full z-10">
                  {/* Icône avec animation 3D */}
                  <motion.div 
                    className="mb-8"
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-block p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 shadow-xl group-hover:shadow-2xl group-hover:border-slate-500/70 transition-all duration-500">
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        {service.icon}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Titre avec effet de brillance */}
                  <motion.h3 
                    className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    {service.title}
                    
                    {/* Effet de brillance qui passe */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      }}
                    />
                  </motion.h3>

                  <motion.p 
                    className="text-slate-400 mb-8 flex-grow text-lg leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {service.description}
                  </motion.p>
                  
                  {/* Call-to-action avec animation magnétique */}
                  <motion.div 
                    className="flex items-center font-semibold text-slate-300 mt-auto group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="relative">
                      Découvrir la magie
                    </span>
                    <motion.div
                      animate={{
                        x: [0, 5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Particules qui s'échappent au survol */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Indicateur de scroll avec animation */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center text-slate-400 cursor-pointer"
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm mb-2">Explorez nos univers</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ServicesPage;