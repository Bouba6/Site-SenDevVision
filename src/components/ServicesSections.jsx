import { ArrowUpRight, Clock, Shield, Star, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react"; // 1. Importer useEffect
import CinematicHeroSection from "./Page-sevice/heroSection";
import {servicesJson, servicesJson2 } from "./Page-sevice/json";
import Modal from "./Page-sevice/modal";
import OurSection from "./Page-sevice/ourSection";
import ProcessSection from "./Page-sevice/processSection";
import { TechnologiesSection } from "./Page-sevice/technologiesSection";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("technologies");

  const services = servicesJson2;

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

  const sectionRef = useRef(null);

  // --- Début de l'amélioration de l'animation 3D ---

  const rotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  // 2. Création de la boucle d'animation avec lissage
  const animate = () => {
    if (!sectionRef.current) return;

    // Appliquer un lissage pour une animation plus douce (damping)
    const smoothingFactor = 0.1;
    let currentX = rotation.current.x;
    let currentY = rotation.current.y;

    currentX += (targetRotation.current.x - currentX) * smoothingFactor;
    currentY += (targetRotation.current.y - currentY) * smoothingFactor;

    rotation.current = { x: currentX, y: currentY };

    sectionRef.current.style.setProperty("--rotate-x", `${currentX}deg`);
    sectionRef.current.style.setProperty("--rotate-y", `${currentY}deg`);

    // Continuer l'animation tant que la position cible n'est pas atteinte
    if (
      Math.abs(currentX - targetRotation.current.x) > 0.01 ||
      Math.abs(currentY - targetRotation.current.y) > 0.01
    ) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      // Stopper l'animation une fois la cible atteinte pour économiser les ressources
      animationFrameId.current = null;
    }
  };

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);

    // Mettre à jour la rotation cible
    targetRotation.current = { x: -y * 1, y: x * 4 };

    // Démarrer la boucle d'animation si elle n'est pas déjà en cours
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    // Ramener la carte à sa position d'origine
    targetRotation.current = { x: 0, y: 0 };

    // Démarrer la boucle d'animation pour le retour
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  // 3. Nettoyer l'animation lorsque le composant est démonté
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // --- Fin de l'amélioration de l'animation 3D ---

  return (
    <>
      <CinematicHeroSection />
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative py-24 bg-black transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "perspective(1000px) rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0))",
          willChange: "transform", // 4. Indice d'optimisation pour le navigateur
        }}
      >
        {/* Fond de grille de points subtil */}
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
          style={{ transform: "translateZ(-50px)" }}
        ></div>

        <div
          className="container mx-auto px-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header Section */}
          {/* <div
            className="max-w-4xl mx-auto text-center mb-16"
            style={{ transform: "translateZ(20px)" }}
          >
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
          </div> */}

          {/* Services Grid - Layout Masonry */}
          {/* <div className="md:columns-2 lg:columns-3 gap-8 space-y-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`break-inside-avoid group relative bg-gray-900/80 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 ${colorVariants[service.color].border
                  } ${colorVariants[service.color].glow}`}
                style={{ transform: "translateZ(40px)" }}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colorVariants[service.color].gradient
                    } text-white mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">
                  {service.title}
                </h3>
                <p
                  className={`text-sm font-medium ${colorVariants[service.color].accent
                    } mb-4`}
                >
                  {service.subtitle}
                </p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => openModal(service)}
                  className="hidden md:flex items-center justify-center w-full p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-300">
                    En savoir plus
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div> */}

          <OurSection />

          <ProcessSection />
          <TechnologiesSection />

          {/* CTA Section - Améliorée */}
          <div
            className="group relative max-w-4xl mx-auto text-center bg-black/50 backdrop-blur-md border border-slate-700 rounded-2xl p-12 overflow-hidden"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Fond animé "Aurora" */}
            <div className="absolute -inset-24 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <div className="absolute inset-0 [mask-image:radial-gradient(transparent,white)]">
                <div className="absolute inset-0 animate-aurora-1 [background-image:radial-gradient(ellipse_at_top_left,_var(--aurora-color-1),_transparent_50%)]"></div>
                <div className="absolute inset-0 animate-aurora-2 [background-image:radial-gradient(ellipse_at_top_right,_var(--aurora-color-2),_transparent_50%)]"></div>
                <div className="absolute inset-0 animate-aurora-3 [background-image:radial-gradient(ellipse_at_bottom_left,_var(--aurora-color-3),_transparent_50%)]"></div>
                <div className="absolute inset-0 animate-aurora-4 [background-image:radial-gradient(ellipse_at_bottom_right,_var(--aurora-color-4),_transparent_50%)]"></div>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à démarrer votre projet ?
              </h3>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Discutons de vos besoins et trouvons ensemble la solution
                idéale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group/btn relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    Demander un devis
                  </span>
                </button>
                <button className="group/btn2 relative px-8 py-4 bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:text-white">
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 group-hover/btn2:rotate-12 transition-transform" />
                    Planifier un appel
                  </span>
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Réponse rapide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>Support premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}

      {isModalOpen && selectedService && (
        <Modal
          selectedService={selectedService}
          closeModal={() => closeModal()}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default ServicesSection;
