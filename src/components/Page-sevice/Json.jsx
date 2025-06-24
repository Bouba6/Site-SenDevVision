import { Code, Globe, Palette, Smartphone, Zap,PenTool } from "lucide-react";

export const servicesJson2 = [
  {
    id: "dev-web",
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
    id: "ui-ux",
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
    id: "branding",
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

// On exporte la palette de couleurs pour l'utiliser dans plusieurs composants
export const colorVariants = {
  blue: {
    accent: "text-blue-400",
    bg: "bg-blue-950",
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-400/60",
    gradient: "from-blue-500 to-cyan-400",
    button: "bg-blue-600 hover:bg-blue-500",
  },
  purple: {
    accent: "text-purple-400",
    bg: "bg-purple-950",
    border: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400/60",
    gradient: "from-purple-500 to-pink-400",
    button: "bg-purple-600 hover:bg-purple-500",
  },
  emerald: {
    accent: "text-emerald-400",
    bg: "bg-emerald-950",
    border: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-400/60",
    gradient: "from-emerald-500 to-green-400",
    button: "bg-emerald-600 hover:bg-emerald-500",
  },
};

// On exporte les données des services
export const servicesJson = [
  {
    id: "dev-web",
    title: "Développement Web Sur-Mesure",
    subtitle: "Applications robustes et performantes",
    icon: <Code className="w-8 h-8" />,
    color: "blue",
    description:
      "Nous transformons vos idées en applications web rapides, sécurisées et évolutives avec les meilleures technologies du marché.",
    detailedDescription:
      "Du front-end interactif au back-end solide, nous couvrons l'ensemble du cycle de développement. Notre expertise nous permet de construire des plateformes complexes, des APIs RESTful et des applications temps réel qui répondent précisément à vos besoins métiers tout en offrant une expérience utilisateur exceptionnelle.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
    ],
    processSteps: [
      "Analyse & Stratégie",
      "UX/UI Design",
      "Développement & Intégration",
      "Tests & Assurance Qualité",
      "Déploiement & Maintenance",
    ],
    deliverables: [
      "Code source complet",
      "Base de données",
      "Documentation technique",
      "Stratégie de déploiement",
    ],
  },
  {
    id: "ui-ux",
    title: "Design d'Interface & UX",
    subtitle: "Expériences utilisateur intuitives",
    icon: <Palette className="w-8 h-8" />,
    color: "purple",
    description:
      "Nous créons des interfaces esthétiques et fonctionnelles qui captivent vos utilisateurs et simplifient les parcours complexes.",
    detailedDescription: "Notre approche est centrée sur l'utilisateur...",
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Principle",
      "UserTesting.com",
      "Hotjar",
    ],
    processSteps: [
      "Recherche Utilisateur",
      "Wireframing & Prototypage",
      "Design UI & Système de Design",
      "Tests d'utilisabilité",
      "Handoff aux développeurs",
    ],
    deliverables: [
      "Maquettes haute-fidélité",
      "Prototype interactif",
      "Design System complet",
      "Rapport de recherche UX",
    ],
  },
  {
    id: "branding",
    title: "Stratégie de Marque & Identité",
    subtitle: "Une marque qui a de l'impact",
    icon: <PenTool className="w-8 h-8" />,
    color: "emerald",
    description:
      "Nous construisons des identités de marque fortes et cohérentes qui résonnent avec votre audience cible et vous distinguent.",
    detailedDescription: "Une grande marque est plus qu'un simple logo...",
    technologies: [
      "Adobe Illustrator",
      "Photoshop",
      "InDesign",
      "Analyse concurrentielle",
      "Ateliers de marque",
    ],
    processSteps: [
      "Atelier Découverte",
      "Analyse du Marché",
      "Développement des Concepts",
      "Création de l'Identité Visuelle",
      "Finalisation du Guide de Marque",
    ],
    deliverables: [
      "Logo & ses variations",
      "Guide de marque (Brandbook)",
      "Palette de couleurs & typographies",
      "Modèles de papeterie",
    ],
  },
];
