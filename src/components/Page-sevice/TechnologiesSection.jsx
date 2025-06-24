import { motion } from "framer-motion";
import { Cloud, Code, Globe, Server, Shield, Smartphone } from "lucide-react";
import { useRef } from "react";

// Données des technologies (inchangées)
const technologies = {
  frontend: {
    icon: Globe,
    color: "#3b82f6", // blue-500
    techs: [
      "React",
      "TypeScript",
      "JavaScript",
      "Angular",
      "Tailwind CSS",
      "Framer Motion",
    ],
    title: "Frontend",
    description: "Interfaces modernes, animées et ultra-réactives.",
    span: "lg:col-span-2",
  },
  backend: {
    icon: Server,
    color: "#10b981", // emerald-500
    techs: [
      "Spring-Boot",
      "C#",
      "Java",
      "PostgreSQL",
      "MongoDB",
      "Restful APIs",
    ],
    title: "Backend",
    description: "APIs robustes et architectures microservices.",
    span: "lg:col-span-1",
  },
  cloud: {
    icon: Cloud,
    color: "#8b5cf6", // purple-500
    techs: ["AWS", "Docker", "Firebase", "Vercel", "CI/CD"],
    title: "Cloud & DevOps",
    description: "Infrastructure as Code et déploiement continu.",
    span: "lg:col-span-1",
  },
  mobile: {
    icon: Smartphone,
    color: "#f97316", // orange-500
    techs: ["Dart", "Flutter", "iOS", "Android", "GetX"],
    title: "Mobile",
    description: "Applications natives cross-platform performantes.",
    span: "lg:col-span-2",
  },
  security: {
    icon: Shield,
    color: "#ef4444", // red-500
    techs: ["Auth0", "JWT", "OAuth 2.0", "Encryption"],
    title: "Sécurité",
    description: "Authentification forte et protection des données.",
    span: "lg:col-span-1",
  },
};

// Variants pour l'animation du conteneur principal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variants pour l'animation de chaque carte
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// Le composant principal de la section
export function TechnologiesSection() {
  const gridRef = useRef(null);

  // Gère l'effet de "spotlight" qui suit la souris
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty("--mouse-x", `${x}px`);
    gridRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête de la section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm font-medium text-blue-400 mb-6">
            <Code className="w-4 h-4" />
            <span>Au coeur de nos créations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Une stack technologique
            <br />
            <span className="text-transparent bg-clip-text bg-blue-600">
              puissante et flexible
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nous sélectionnons le meilleur de la technologie pour construire des
            applications qui ne sont pas seulement fonctionnelles, mais
            exceptionnelles.
          </p>
        </motion.div>

        {/* Grille "Bento" avec effet de spotlight */}
        <motion.div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="group/grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
          style={{
            // @ts-ignore
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          }}
        >
          {/* Pseudo-élément pour le spotlight */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover/grid:opacity-100"
            style={{
              background:
                "radial-gradient(400px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 80%)",
            }}
          />

          {Object.entries(technologies).map(([key, tech]) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className={`card-container rounded-xl bg-slate-900/80 before:rounded-xl before:bg-slate-900/50 ${tech.span}`}
              >
                <div className="card-content p-8 h-full flex flex-col justify-between">
                  <div>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                      style={{
                        backgroundColor: tech.color + "20",
                        border: `1px solid ${tech.color}60`,
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: tech.color }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">
                      {tech.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2">
                      {tech.techs.map((techName) => (
                        <span
                          key={techName}
                          className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-sm rounded-md font-medium"
                        >
                          {techName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
