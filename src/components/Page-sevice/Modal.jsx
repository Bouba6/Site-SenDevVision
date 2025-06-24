import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Code,
  ListChecks,
  MessageCircle,
  Package,
  X,
} from "lucide-react";
import { useState } from "react";

function Modal({ selectedService, closeModal }) {
  const [activeTab, setActiveTab] = useState("technologies");

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const colorVariants = {
    blue: {
      accent: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hover: "hover:border-blue-400/40",
      gradient: "from-blue-600 to-cyan-500",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    purple: {
      accent: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      hover: "hover:border-purple-400/40",
      gradient: "from-purple-600 to-pink-500",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    emerald: {
      accent: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hover: "hover:border-emerald-400/40",
      gradient: "from-emerald-600 to-teal-500",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };


  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${
        activeTab === id
          ? `${colorVariants[selectedService.color].accent} ${
              colorVariants[selectedService.color].bg
            } border ${colorVariants[selectedService.color].border}`
          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeModal}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-6xl h-[85vh] flex flex-col bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header Compact */}
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${
                    colorVariants[selectedService.color].gradient
                  } text-white shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Code className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">
                    {selectedService.title}
                  </h2>
                </div>
              </div>
              <motion.button
                onClick={closeModal}
                className="p-2 rounded-full text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Content Layout: Side Navigation + Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Side Navigation */}
            <div className="w-64 bg-slate-800 border-r border-slate-900 p-6">
              <div className="space-y-2">
                <TabButton
                  id="overview"
                  label="Vue d'ensemble"
                  icon={<Package className="w-4 h-4" />}
                />
                <TabButton
                  id="technologies"
                  label="Technologies"
                  icon={<Code className="w-4 h-4" />}
                  count={selectedService.technologies.length}
                />
                <TabButton
                  id="process"
                  label="Processus"
                  icon={<ListChecks className="w-4 h-4" />}
                  count={selectedService.processSteps.length}
                />
                <TabButton
                  id="deliverables"
                  label="Livrables"
                  icon={<Package className="w-4 h-4" />}
                  count={selectedService.deliverables.length}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="p-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-4">
                          {selectedService.subtitle}
                        </h3>
                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                          {selectedService.detailedDescription}
                        </p>
                      </div>

                      {/* Points clés en grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-slate-900">
                            Solutions sur mesure
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <Check className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-slate-900">
                            Technologies modernes
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <Check className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-slate-900">
                            Support inclus
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <Check className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-slate-900">
                            Livraison rapide
                          </span>
                        </div>
                      </div>

                      {/* CTA Principal */}
                      <div
                        className={`p-6 ${
                          colorVariants[selectedService.color].light
                        } rounded-xl ${
                          colorVariants[selectedService.color].border
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-100 mb-2">
                              Prêt à démarrer votre projet ?
                            </h4>
                          </div>
                          <motion.button
                            className={`px-6 py-3 rounded-xl text-white font-semibold ${
                              colorVariants[selectedService.color].button
                            } shadow-lg flex items-center gap-2`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MessageCircle className="w-4 h-4" />
                            Devis
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "technologies" && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Stack technologique
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedService.technologies.map((tech, i) => (
                          <motion.div
                            key={tech}
                            className="flex items-center gap-3 p-4 bg-slate-900 border-2 border-slate-700 rounded-xl hover:shadow-lg transition-all"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{
                              scale: 1.05,
                              borderColor:
                                colorVariants[selectedService.color].accent,
                            }}
                          >
                            <div
                              className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                                colorVariants[selectedService.color].gradient
                              }`}
                            />
                            <span className="font-semibold text-slate-100">
                              {tech}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "process" && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Notre processus de développement
                      </h3>
                      <div className="space-y-6">
                        {selectedService.processSteps.map((step, i) => (
                          <motion.div
                            key={i}
                            className="flex gap-6 p-6 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, shadow: "lg" }}
                          >
                            <div
                              className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${
                                colorVariants[selectedService.color].gradient
                              } text-white flex items-center justify-center text-lg font-bold shadow-lg`}
                            >
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-lg font-semibold text-slate-100">
                                {step}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "deliverables" && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-6">
                        Ce que vous recevrez
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedService.deliverables.map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex items-center gap-4 p-5 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{
                              scale: 1.03,
                              borderColor:
                                colorVariants[selectedService.color].accent,
                            }}
                          >
                            <Package
                              className={`w-6 h-6 ${
                                colorVariants[selectedService.color].accent
                              }`}
                            />
                            <span className="text-lg font-semibold text-slate-100">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Modal;
