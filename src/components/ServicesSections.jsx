import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Code,
  Globe,
  ListChecks,
  Package,
  Rocket,
  Search,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  X,
  Zap,
  Calendar, MessageCircle, Phone, Mail
} from "lucide-react";
import { useState } from "react";
import FloatingParticles from "./FloatingParticles";
import { TechnologiesSection } from "./Page-sevice/TechnologiesSection";
import { motion, AnimatePresence } from "framer-motion";
import ProcessSection from "./Page-sevice/ProcessSection";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("technologies");

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Développement Web",
      subtitle: "Sites & Applications Web Modernes",
      description:
        "Solutions web sur mesure avec des technologies de pointe. Des sites vitrines performants aux plateformes e-commerce complexes.",
      features: [
        "React.js & Angular",
        "Design Responsive",
        "Performance Optimisée",
        "SEO Intégré",
      ],
      color: "blue",
      detailedDescription:
        "Nous créons des expériences web exceptionnelles qui allient performance, design moderne et fonctionnalités avancées. Notre approche holistique garantit des solutions web qui non seulement impressionnent visuellement, mais offrent également une expérience utilisateur fluide et intuitive.",
      technologies: [
        "Angular / React.js",
        "Angular 18+",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript / Spring-boot",
        "MongoDB / PostgreSQL / MySQL",
        "REST API Integration",
        "Docker",
        "Firebase / Superbase / Cloudinary",
        "Render / Vercel",
      ],
      processSteps: [
        "Analyse des besoins et wireframing",
        "Design UI/UX et prototypage",
        "Développement frontend et backend",
        "Tests et optimisation",
        "Déploiement et mise en production",
        "Formation et documentation",
      ],
      deliverables: [
        "Site web responsive complet",
        "Panel d'administration",
        "Documentation technique",
        "Formation utilisateur",
        "Support 3 mois inclus",
      ],
      timeline: "4-8 semaines",
      price: "À partir de 2,500€",
      stats: [
        { label: "Projets livrés", value: "50+" },
        { label: "Temps moyen", value: "6 sem" },
        { label: "Satisfaction", value: "98%" },
      ],
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Applications Mobiles",
      subtitle: "iOS & Android Natifs",
      description:
        "Applications cross-platform performantes avec Flutter. Une base de code unique pour une expérience utilisateur exceptionnelle.",
      features: [
        "Flutter & Dart",
        "GetX Framework",
        "UI/UX Design",
        "Store Deploy",
      ],
      color: "purple",
      detailedDescription:
        "Développement d'applications mobiles innovantes qui révolutionnent l'expérience utilisateur. Nous utilisons Flutter pour créer des applications cross-platform performantes avec un code base unique pour iOS et Android.",
      technologies: [
        "Flutter / Dart",
        "GetX State Management",
        "Firebase / Superbase / Cloudinary",
        "REST API Integration",
        "SQLite / Hive",
        "Push Notifications",
        "App Store Optimization",
        "CI/CD Pipeline",
      ],
      processSteps: [
        "Étude de marché et conception UX",
        "Prototypage interactif",
        "Développement MVP",
        "Tests sur appareils réels",
        "Optimisation et polish",
        "Publication sur stores",
      ],
      deliverables: [
        "Application iOS et Android",
        "Code source documenté",
        "Guide de publication",
        "Maintenance 6 mois",
      ],
      timeline: "6-12 semaines",
      price: "À partir de 4,000€",
      stats: [
        { label: "Apps développées", value: "30+" },
        { label: "Note moyenne", value: "4.8★" },
        { label: "Downloads", value: "100K+" },
      ],
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Solutions Sur Mesure",
      subtitle: "Architecture & Consulting",
      description:
        "Développement personnalisé et consulting technique pour transformer vos idées en solutions digitales évolutives et robustes.",
      features: [
        "Architecture Custom",
        "API Development",
        "Cloud Solutions",
        "Support 24/7",
      ],
      color: "emerald",
      detailedDescription:
        "Solutions technologiques sur mesure conçues spécifiquement pour vos besoins uniques. De l'architecture système complexe aux intégrations API avancées, nous créons des solutions qui évoluent avec votre entreprise.",
      technologies: [
        "Architecture Microservices",
        "Docker / Kubernetes",
        "GraphQL / REST APIs",
        "Redis / ElasticSearch",
        "CI/CD DevOps",
        "Monitoring & Analytics",
        "Security Best Practices",
      ],
      processSteps: [
        "Audit technique et consultation",
        "Architecture et planification",
        "Développement itératif",
        "Tests d'intégration",
        "Déploiement sécurisé",
        "Monitoring et support continu",
      ],
      deliverables: [
        "Solution technique complète",
        "Architecture documentée",
        "APIs et intégrations",
        "Dashboard de monitoring",
        "Support technique 24/7",
      ],
      timeline: "Sur mesure",
      price: "Sur devis",
      stats: [
        { label: "Systèmes créés", value: "25+" },
        { label: "Uptime", value: "99.9%" },
        { label: "Économies", value: "40%" },
      ],
    },
  ];

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setActiveTab("technologies");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "unset";
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
    <>
      <section className="relative py-24 bg-black">

        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-400 mb-6">
              <Sparkles className="w-4 h-4" />
              Nos Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              Solutions Digitales
              <span className="block text-blue-600">Sur Mesure</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Nous accompagnons les entreprises dans leur transformation
              digitale avec des solutions innovantes et performantes, adaptées à
              leurs besoins spécifiques.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gray-900 border ${
                  colorVariants[service.color].border
                } ${
                  colorVariants[service.color].hover
                } rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${
                    colorVariants[service.color].gradient
                  } text-white mb-6`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-300 mb-2">
                  {service.title}
                </h3>
                <p
                  className={`text-sm font-medium ${
                    colorVariants[service.color].accent
                  } mb-4`}
                >
                  {service.subtitle}
                </p>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <button
                  onClick={() => openModal(service)}
                  className="hidden md:flex items-center justify-between w-full p-3 rounded-lg bg-slate-300 hover:bg-slate-100 transition-colors group-hover:bg-slate-200"
                >
                  <span className="text-sm font-medium text-slate-700">
                    En savoir plus
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Process Section */}

          <ProcessSection />

          {/* Technologies Section */}

          <TechnologiesSection />

          {/* CTA Section */}
          <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-12 overflow-hidden group">
            {/* Éléments d'arrière-plan animés */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Grille de points animée */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 100}ms`,
                      animationDuration: "3s",
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Contenu principal */}
            <div className="relative z-10">
              {/* Badge animé */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Démarrons ensemble
                </span>
              </div>

              {/* Titre avec effet de révélation */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-500">
                Prêt à démarrer votre projet ?
              </h3>

              {/* Sous-titre avec animation */}
              <p className="text-xl text-slate-300 mb-8 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                Discutons de vos besoins et trouvons ensemble la solution
                idéale.
              </p>

              {/* Boutons avec animations avancées */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Bouton principal */}
                <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden">
                  {/* Effet de vague animé */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>

                  {/* Particules flottantes */}
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-white rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-white rounded-full animate-ping delay-200"></div>
                  </div>

                  {/* Contenu du bouton */}
                  <span className="relative flex items-center justify-center gap-2">
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    Demander un devis
                  </span>

                  {/* Bordure brillante */}
                  <div className="absolute inset-0 rounded-lg border border-white/20 group-hover/btn:border-white/40 transition-colors duration-300"></div>
                </button>

                {/* Bouton secondaire */}
                <button className="group/btn2 relative px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:border-slate-500 hover:text-white hover:shadow-lg focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden">
                  {/* Background animé */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800/0 via-slate-700/50 to-slate-800/0 -translate-x-full group-hover/btn2:translate-x-full transition-transform duration-500"></div>

                  {/* Effet de pulse sur la bordure */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-500/0 via-purple-500/30 to-blue-500/0 opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300 -z-10"></div>

                  {/* Contenu */}
                  <span className="relative flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 group-hover/btn2:rotate-12 transition-transform duration-200" />
                    Planifier un appel
                  </span>
                </button>
              </div>

              {/* Indicateurs de confiance animés */}
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-400">
                <div className="group/trust flex items-center gap-2 cursor-default">
                  <div className="relative">
                    <Shield className="w-4 h-4 text-green-400 group-hover/trust:text-green-300 transition-colors duration-200" />
                    <div className="absolute inset-0 w-4 h-4 border border-green-400 rounded-full opacity-0 group-hover/trust:opacity-100 group-hover/trust:scale-150 transition-all duration-300"></div>
                  </div>
                  <span className="group-hover/trust:text-slate-300 transition-colors duration-200">
                    100% sécurisé
                  </span>
                </div>

                <div className="group/trust flex items-center gap-2 cursor-default">
                  <div className="relative">
                    <Zap className="w-4 h-4 text-yellow-400 group-hover/trust:text-yellow-300 transition-colors duration-200" />
                    <div className="absolute inset-0 w-4 h-4 bg-yellow-400/20 rounded-full opacity-0 group-hover/trust:opacity-100 group-hover/trust:scale-125 transition-all duration-300"></div>
                  </div>
                  <span className="group-hover/trust:text-slate-300 transition-colors duration-200">
                    Réponse rapide
                  </span>
                </div>

                <div className="group/trust flex items-center gap-2 cursor-default">
                  <div className="relative">
                    <Star className="w-4 h-4 text-blue-400 group-hover/trust:text-blue-300 transition-colors duration-200" />
                    <div className="absolute inset-0 w-4 h-4 border border-blue-400 rounded-full opacity-0 group-hover/trust:opacity-100 group-hover/trust:scale-150 transition-all duration-300"></div>
                  </div>
                  <span className="group-hover/trust:text-slate-300 transition-colors duration-200">
                    Support premium
                  </span>
                </div>
              </div>
            </div>

            {/* Effet de brillance sur hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedService && (
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
                            <span className="font-medium text-slate-900">Solutions sur mesure</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <Check className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-slate-900">Technologies modernes</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <Check className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-slate-900">Support inclus</span>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <Check className="w-5 h-5 text-orange-600" />
                            <span className="font-medium text-slate-900">Livraison rapide</span>
                          </div>
                        </div>
      
                        {/* CTA Principal */}
                        <div className={`p-6 ${colorVariants[selectedService.color].light} rounded-xl ${colorVariants[selectedService.color].border}`}>
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
                              whileHover={{ scale: 1.05, borderColor: colorVariants[selectedService.color].accent }}
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
                              whileHover={{ scale: 1.03, borderColor: colorVariants[selectedService.color].accent }}
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
      
            {/* Footer Compact */}
            {/* <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-900">
              <div className="flex gap-4">
                <motion.button
                  className={`flex-1 flex items-center justify-between gap-4 px-6 py-3 rounded-xl text-white font-semibold ${
                    colorVariants[selectedService.color].button
                  } shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Nous contacter
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div> */}
          </motion.div>
        </div>
      </AnimatePresence>
      )}
    </>
  );
}

export default ServicesSection;
