import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Rocket,
  Search,
  Settings,
  Target,
  TrendingUp,} from "lucide-react";

function ProcessSection ()  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });


  const processSteps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Analyse des Besoins",
      description:
        "Évaluation approfondie de vos exigences et objectifs business",
      details: [
        "Audit technique",
        "Définition du scope",
        "Identification des risques",
      ],
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Conception & Design",
      description: "Architecture solution et prototypage",
      details: ["Wireframing", "Prototypage", "Architecture système"],
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Développement",
      description:
        "Implémentation avec les meilleures pratiques et technologies",
      details: ["Code de qualité", "Tests automatisés", "Intégration continue"],
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Déploiement",
      description: "Mise en production sécurisée et formation des équipes",
      details: ["Déploiement", "Formation", "Support continu"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const lineVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0 
    },
    visible: { 
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const numberVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -90,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: 0.4
      }
    }
  };

  const detailVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div ref={ref}>
      {/* Header avec animation */}
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 
          text-slate-400 rounded-full text-sm font-medium text-blue-600 mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15 
          }}
        >
          <TrendingUp className="w-4 h-4" />
          Notre Processus
        </motion.div>

        <motion.h3 
          className="text-3xl md:text-4xl font-bold text-slate-100 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Méthodologie Éprouvée
          <motion.span 
            className="block text-blue-600"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            pour Votre Succès
          </motion.span>
        </motion.h3>

        <motion.p 
          className="text-lg text-slate-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Une approche structurée et transparente pour garantir la
          réussite de votre projet digital.
        </motion.p>
      </motion.div>

      {/* Process Steps avec animations fluides */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {processSteps.map((step, index) => (
          <motion.div 
            key={index} 
            className="relative group"
            variants={stepVariants}
          >
            {/* Connection Line avec animation progressive */}
            {index < processSteps.length - 1 && (
              <motion.div 
                className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent z-0 origin-left"
                variants={lineVariants}
                style={{ 
                  background: 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, transparent 100%)',
                  filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))'
                }}
              />
            )}

            <motion.div 
              className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 overflow-hidden"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                borderColor: '#60a5fa',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)'
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20 
              }}
            >
              {/* Effet de brillance au hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full"
                whileHover={{ translateX: '200%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* Step Number avec animation élégante */}
              <motion.div 
                className="absolute -top-0 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-slate-100 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                variants={numberVariants}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 10,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {index + 1}
              </motion.div>

              {/* Icon avec animation */}
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 shadow-inner"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {step.icon}
              </motion.div>

              {/* Content avec animations décalées */}
              <motion.h4 
                className="text-lg font-bold text-slate-100 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
              >
                {step.title}
              </motion.h4>

              <motion.p 
                className="text-slate-400 text-sm mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7 + (index * 0.1), duration: 0.4 }}
              >
                {step.description}
              </motion.p>

              {/* Details avec animation staggered */}
              <ul className="space-y-1">
                {step.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-400"
                    custom={i}
                    variants={detailVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.div 
                      className="w-1 h-1 bg-blue-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        delay: 0.9 + (index * 0.1) + (i * 0.05),
                        type: "spring",
                        stiffness: 300
                      }}
                    />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animation de progression globale */}
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          {processSteps.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-blue-600"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ 
                delay: 1.6 + (index * 0.1),
                type: "spring",
                stiffness: 400
              }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessSection;