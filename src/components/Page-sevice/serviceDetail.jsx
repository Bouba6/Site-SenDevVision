import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  LayoutTemplate,
  ListChecks,
  Package,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { colorVariants, servicesJson2 } from "./json";

// --- Composant TabButton (amélioré) ---
function TabButton({ id, label, icon, isActive, onClick, color }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(id)}
      className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl relative overflow-hidden ${
        isActive
          ? `${colorVariants[color].accent} ${colorVariants[color].bg} border ${colorVariants[color].border} shadow-lg`
          : "text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId={`tab-indicator-${color}`}
          className={`absolute inset-0 bg-gradient-to-r ${colorVariants[color].gradient} opacity-10`}
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <div className="relative z-10 flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
    </motion.button>
  );
}

// --- Composant principal de la page ---
function ServiceDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesJson2.find((s) => s.id === serviceId);

  useEffect(() => {
    if (!service) {
      navigate("/");
    }
  }, [service, navigate]);

  if (!service) {
    return null;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Header de la page */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </motion.button>
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${colorVariants[service.color].gradient}`}
              >
                {service.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{service.title}</h1>
                <p className={`text-sm ${colorVariants[service.color].accent}`}>
                  {service.subtitle}
                </p>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 transition-all duration-300"
          >
            <X className="w-5 h-5 text-slate-300" />
          </motion.button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* === BARRE LATÉRALE === */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="w-80 flex-shrink-0"
        >
          <div className="sticky top-8 space-y-6">
            {/* Navigation */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
              <nav className="space-y-2">
                <TabButton 
                  id="overview" 
                  label="Vue d'ensemble" 
                  icon={<LayoutTemplate size={18} />} 
                  isActive={activeTab === 'overview'} 
                  onClick={setActiveTab} 
                  color={service.color} 
                />
                <TabButton 
                  id="technologies" 
                  label="Technologies" 
                  icon={<Code size={18} />} 
                  isActive={activeTab === 'technologies'} 
                  onClick={setActiveTab} 
                  color={service.color} 
                />
                <TabButton 
                  id="process" 
                  label="Notre Processus" 
                  icon={<ListChecks size={18} />} 
                  isActive={activeTab === 'process'} 
                  onClick={setActiveTab} 
                  color={service.color} 
                />
                <TabButton 
                  id="deliverables" 
                  label="Livrables Clés" 
                  icon={<Package size={18} />} 
                  isActive={activeTab === 'deliverables'} 
                  onClick={setActiveTab} 
                  color={service.color} 
                />
              </nav>
            </div>

            {/* Call to Action */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Prêt à commencer ?</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  colorVariants[service.color].button
                } shadow-lg hover:shadow-xl`}
              >
                Démarrer un projet
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* === ZONE DE CONTENU === */}
        <motion.main
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="flex-1 min-h-[calc(100vh-200px)]"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                {activeTab === "overview" && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-white mb-6"
                    >
                      Description du service
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="prose prose-lg prose-invert max-w-none"
                    >
                      <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                        {service.detailedDescription}
                      </p>
                    </motion.div>
                  </div>
                )}

                {activeTab === "technologies" && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-white mb-6"
                    >
                      Notre stack technique
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {service.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-3 p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300"
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorVariants[service.color].gradient}`}></div>
                          <span className="font-medium text-slate-200">{tech}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {activeTab === "process" && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-white mb-6"
                    >
                      Les étapes de notre collaboration
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      {service.processSteps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-4 p-6 bg-slate-700/50 border border-slate-600/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300"
                        >
                          <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold text-white bg-gradient-to-br ${colorVariants[service.color].gradient} shadow-lg`}>
                            {i + 1}
                          </div>
                          <p className="text-slate-200 pt-2 leading-relaxed">{step}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {activeTab === "deliverables" && (
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-white mb-6"
                    >
                      Ce que vous obtenez
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {service.deliverables.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center gap-4 p-4 bg-slate-700/50 border border-slate-600/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300"
                        >
                          <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${colorVariants[service.color].accent}`} />
                          <span className="font-medium text-slate-200">{item}</span>
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
  );
}

export default ServiceDetailPage;