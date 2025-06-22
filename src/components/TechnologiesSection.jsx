import { Globe, Database, Cloud, Code, Smartphone, Server, Shield, Cpu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState(null);

  const technologies = {
    frontend: {
      icon: Globe,
      color: "blue",
      techs: ["React", "TypeScript", "Angular", "Tailwind CSS", "Bootstrap"],
      title: "Frontend",
      description: "Interfaces utilisateur modernes et performantes"
    },
    backend: {
      icon: Server,
      color: "emerald",
      techs: ["Spring-Boot", "C#", "Java", "PostgreSQL", "MongoDB", "Restful APIs"],
      title: "Backend",
      description: "APIs robustes et architecture scalable"
    },
    cloud: {
      icon: Cloud,
      color: "purple",
      techs: ["AWS", "Docker", "Firebase", "Superbase", "Cloudinary", "CI/CD"],
      title: "Cloud & DevOps",
      description: "Infrastructure moderne et déploiement automatisé"
    },
    mobile: {
      icon: Smartphone,
      color: "orange",
      techs: ["Dart", "Flutter", "iOS", "Android","GetX"],
      title: "Mobile",
      description: "Applications natives et cross-platform"
    },
    security: {
      icon: Shield,
      color: "red",
      techs: ["Authentication","JWT", "HTTPS", "Encryption"],
      title: "Sécurité",
      description: "Protection des données et authentification"
    },
    performance: {
      icon: Cpu,
      color: "cyan",
      techs: ["Optimization", "Caching", "CDN", "Monitoring", "Analytics"],
      title: "Performance",
      description: "Optimisation et monitoring en temps réel"
    }
  };

  const colorVariants = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    cyan: "from-cyan-500 to-cyan-600"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-400 mb-6">
            <Code className="w-4 h-4" />
            <span>Technologies</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Notre stack
            <span className="block text-blue-600 text-3xl md:text-4xl font-normal mt-2">
              technologique
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Des technologies éprouvées et modernes pour créer des solutions robustes, 
            performantes et évolutives
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(technologies).map(([key, tech]) => {
            const IconComponent = tech.icon;
            const isActive = activeCategory === key;
            
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveCategory(key)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <motion.div 
                  className="bg-slate-900 rounded-2xl p-8 h-full border border-slate-700 shadow-sm"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  animate={{
                    boxShadow: isActive 
                      ? "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorVariants[tech.color]} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">
                    {tech.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">
                        Technologies
                      </span>
                      <span className="text-sm text-slate-300">
                        {tech.techs.length}
                      </span>
                    </div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                    >
                      {tech.techs.map((techName, index) => (
                        <motion.span
                          key={techName}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium"
                          variants={{
                            hidden: { opacity: 0.6, scale: 0.95 },
                            visible: { 
                              opacity: 1, 
                              scale: 1,
                              transition: { duration: 0.2 }
                            }
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgb(226 232 240)"
                          }}
                        >
                          {techName}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Active Indicator */}
                  <motion.div
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br ${colorVariants[tech.color]}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-300 mb-2">25+</div>
            <div className="text-slate-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-300 mb-2">6</div>
            <div className="text-slate-400">Domaines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-300 mb-2">100%</div>
            <div className="text-slate-400">Modernes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-300 mb-2">7/7</div>
            <div className="text-slate-400">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}