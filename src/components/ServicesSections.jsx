import {
  ArrowUpRight,
  ChevronRight,
  Globe,
  Smartphone,
  Sparkles,
  Zap,
  X,
  Check,
  Clock,
  Star,
  Code,
  Package,
  ListChecks,
} from "lucide-react";
import { useState } from "react";
import FloatingParticles from "./FloatingParticles";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("technologies");

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Développement Web",
      subtitle: "Sites & Applications Web",
      description:
        "Créations digitales modernes avec des technologies de pointe. Des sites vitrines aux plateformes e-commerce complexes.",
      features: [
        "Angular/React.js",
        "Design Responsif",
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
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Applications Mobiles",
      subtitle: "iOS & Android",
      description:
        "Applications natives et cross-platform performantes avec une expérience utilisateur exceptionnelle.",
      features: ["Flutter", "GetX Framework", "UI/UX Design", "Apk Deploy"],
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
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Solutions Sur Mesure",
      subtitle: "Innovation & Consulting",
      description:
        "Développement personnalisé et consulting technique pour transformer vos idées en solutions digitales innovantes.",
      features: [
        "Architecture Custom",
        "API Development",
        "Cloud Solutions",
        "Maintenance 7/7",
      ],
      color: "emerald",
      detailedDescription:
        "Solutions technologiques sur mesure conçues spécifiquement pour vos besoins uniques. De l'architecture système complexe aux intégrations API avancées, nous créons des solutions qui évoluent avec votre entreprise.",
      technologies: [
        "Monolitique distribuée Architecture",
        "Docker / Kubernetes",
        // "AWS / Azure / GCP",
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
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setActiveTab("technologies"); // Reset tab on open
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
      from: "from-blue-600",
      via: "via-blue-500",
      to: "to-cyan-400",
      borderColor: "border-blue-500/20 hover:border-blue-400/50",
      textColor: "text-blue-400",
      borderBottom: "border-blue-400",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
    },
    purple: {
      from: "from-purple-600",
      via: "via-purple-500",
      to: "to-pink-400",
      borderColor: "border-purple-500/20 hover:border-purple-400/50",
      textColor: "text-purple-400",
      borderBottom: "border-purple-400",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
    },
    emerald: {
      from: "from-emerald-600",
      via: "via-green-500",
      to: "to-teal-400",
      borderColor: "border-green-500/20 hover:border-green-400/50",
      textColor: "text-emerald-400",
      borderBottom: "border-emerald-400",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
    },
  };

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-t-lg ${
        activeTab === id
          ? `${colorVariants[selectedService.color].textColor} border-b-2 ${
              colorVariants[selectedService.color].borderBottom
            }`
          : "text-slate-400 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );



  return (
    <>
      <section className="relative py-24 bg-black overflow-hidden">
         {/* Éléments de fond améliorés */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <FloatingParticles />
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Des Services d'Excellence
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Nous transformons vos idées en solutions digitales innovantes avec
              des technologies de pointe et un savoir-faire artisanal.
            </p>
          </div>
          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border ${
                  colorVariants[service.color].borderColor
                } transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10`}
              >
                <div
                  className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${
                    colorVariants[service.color].from
                  } ${colorVariants[service.color].to} mb-8`}
                >
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p
                  className={`text-sm font-semibold ${
                    colorVariants[service.color].textColor
                  } uppercase tracking-wider mb-4`}
                >
                  {service.subtitle}
                </p>
                <p className="text-slate-300 leading-relaxed mb-8">
                  {service.description}
                </p>
                <button
                  onClick={() => openModal(service)}
                  className="flex items-center text-sm font-semibold text-white group-hover:text-blue-300 transition-colors"
                >
                  Découvrir plus
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${
                    colorVariants[selectedService.color].from
                  } ${colorVariants[selectedService.color].to}`}
                >
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <p
                    className={`${
                      colorVariants[selectedService.color].textColor
                    } font-semibold`}
                  >
                    {selectedService.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <p className="text-slate-300 mb-6">
                {selectedService.detailedDescription}
              </p>

              {/* <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-800">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Délai estimé</p>
                  <p className="text-lg font-semibold text-white">
                    {selectedService.timeline}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Investissement</p>
                  <p className="text-lg font-semibold text-white">
                    {selectedService.price}
                  </p>
                </div>
              </div> */}

              {/* Tabs */}
              <div className="border-b border-slate-800 mb-4">
                <nav className="-mb-px flex gap-4" aria-label="Tabs">
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
                </nav>
              </div>

              {/* Tab Content */}
              <div className="animate-in fade-in duration-500">
                {activeTab === "technologies" && (
                  <ul className="space-y-2">
                    {selectedService.technologies.map((tech, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check
                          className={`w-4 h-4 ${
                            colorVariants[selectedService.color].textColor
                          }`}
                        />
                        <span className="text-slate-300">{tech}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "process" && (
                  <ol className="relative border-l border-slate-700 ml-2">
                    {selectedService.processSteps.map((step, i) => (
                      <li key={i} className="mb-6 ml-6">
                        <span
                          className={`absolute flex items-center justify-center w-6 h-6 bg-slate-800 rounded-full -left-3 ring-4 ring-slate-900 ${
                            colorVariants[selectedService.color].textColor
                          }`}
                        >
                          {i + 1}
                        </span>
                        <p className="text-slate-300">{step}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {activeTab === "deliverables" && (
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {selectedService.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Package
                          className={`w-4 h-4 ${
                            colorVariants[selectedService.color].textColor
                          }`}
                        />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 mt-auto border-t border-slate-800 bg-slate-900/50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button
                  className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                    colorVariants[selectedService.color].buttonBg
                  }`}
                >
                  Demander un devis
                </button> */}
                <button className="flex-1 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 hover:border-slate-600 transition-colors duration-300">
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