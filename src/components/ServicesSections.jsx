import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Cloud,
  Code,
  Database,
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
} from "lucide-react";
import { useState } from "react";
import FloatingParticles from "./FloatingParticles";

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
      description: "Architecture solution et design d'expérience utilisateur",
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

  return (
    <>
      <section className="relative py-24 bg-black">
        <FloatingParticles />
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

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <Check
                        className={`w-4 h-4 ${
                          colorVariants[service.color].accent
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-t border-slate-100">
                  {service.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-slate-200">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => openModal(service)}
                  className="flex items-center justify-between w-full p-3 rounded-lg bg-slate-300 hover:bg-slate-100 transition-colors group-hover:bg-slate-200"
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
          <div className="mb-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 
              text-slate-400 rounded-full text-sm font-medium text-blue-600 mb-6"
              >
                <TrendingUp className="w-4 h-4" />
                Notre Processus
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                Méthodologie Éprouvée
                <span className="block text-blue-600">pour Votre Succès</span>
              </h3>
              <p className="text-lg text-slate-400">
                Une approche structurée et transparente pour garantir la
                réussite de votre projet digital.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0" />
                  )}

                  <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group-hover:border-blue-200">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-slate-100 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-100 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-1">
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-100"
                        >
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-100 mb-4">
                Technologies de Pointe
              </h3>
              <p className="text-lg text-slate-400 mb-6"></p>
              <p className="text-lg text-slate-400">
                Nous utilisons les dernières technologies pour créer des
                solutions performantes et évolutives
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">
                  Frontend
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  Interfaces modernes et réactives
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Angular", "Vue.js", "TypeScript"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">
                  Backend
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  APIs robustes et sécurisées
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Spring Boot", "MongoDB", "PostgreSQL"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  <Cloud className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2">
                  Cloud & DevOps
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  Déploiement et monitoring
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Docker", "Kubernetes", "CI/CD"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      colorVariants[selectedService.color].gradient
                    } text-white`}
                  >
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {selectedService.title}
                    </h3>
                    <p
                      className={`${
                        colorVariants[selectedService.color].accent
                      } font-medium`}
                    >
                      {selectedService.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <p className="text-lg text-slate-200 mb-8 leading-relaxed">
                  {selectedService.detailedDescription}
                </p>

                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                  <TabButton
                    id="technologies"
                    label="Technologies"
                    icon={<Code className="w-4 h-4" />}
                  />
                  <TabButton
                    id="process"
                    label="Processus"
                    icon={<ListChecks className="w-4 h-4" />}
                  />
                  <TabButton
                    id="deliverables"
                    label="Livrables"
                    icon={<Package className="w-4 h-4" />}
                  />
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {activeTab === "technologies" && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedService.technologies.map((tech, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                        >
                          <Check
                            className={`w-4 h-4 ${
                              colorVariants[selectedService.color].accent
                            }`}
                          />
                          <span className="text-slate-100 font-medium">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "process" && (
                    <div className="space-y-4">
                      {selectedService.processSteps.map((step, i) => (
                        <div
                          key={i}
                          className="flex gap-4 p-4 bg-slate-800/50 rounded-lg"
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${
                              colorVariants[selectedService.color].gradient
                            } text-slate-100 flex items-center justify-center text-sm font-bold`}
                          >
                            {i + 1}
                          </div>
                          <p className="text-slate-100 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "deliverables" && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedService.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                        >
                          <Package
                            className={`w-4 h-4 ${
                              colorVariants[selectedService.color].accent
                            }`}
                          />
                          <span className="text-slate-100 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-200 bg-slate-900">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                    colorVariants[selectedService.color].button
                  }`}
                >
                  Demander un devis
                </button>
                <button className="flex-1 px-6 py-3 rounded-lg border border-slate-300 text-slate-100 hover:text-slate-900 font-semibold hover:bg-white transition-colors">
                  Planifier un appel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServicesSection;
