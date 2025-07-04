import { useState,useEffect } from "react";
import {
  ArrowRight,
  Award,
  Code,
  Coffee,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// Composant FloatingParticles simulé avec CSS animations
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ))}
  </div>
);


export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("vision");
  useEffect(() => {
    window.scrollTo(0, 0) ;
    }, []) ;

  const stats = [
    {
      icon: <Code className="w-8 h-8" />,
      number: "0",
      label: "Projets Réalisés",
      color: "bg-blue-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "30+",
      label: "Clients Satisfaits",
      color: "bg-green-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "5+",
      label: "Années d'Expérience",
      color: "bg-purple-500",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      number: "1000+",
      label: "Cafés Consommés",
      color: "bg-orange-500",
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Nous repoussons constamment les limites de la technologie pour créer des solutions révolutionnaires.",
      color: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Chaque ligne de code est écrite avec passion et dévouement pour créer des expériences exceptionnelles.",
      color: "from-red-500/10 to-pink-500/10",
      borderColor: "border-red-500/20",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence",
      description: "Nous visons la perfection dans chaque détail, de la conception à la livraison finale.",
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Impact",
      description: "Nous créons des solutions qui transforment positivement les entreprises et leurs utilisateurs.",
      color: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
    },
  ];

  const team = [
    {
      name: "Moussa Diagne",
      role: "Fondateur & Lead Developer",
      description: "Passionné de technologies avec 5+ années d'expérience dans le développement web et mobile.",
      skills: ["React", "Node.js", "Python", "Mobile Dev"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Équipe Collaborative",
      role: "Développeurs & Designers",
      description: "Une équipe de talents créatifs et techniques qui travaillent ensemble pour concrétiser vos projets.",
      skills: ["UI/UX", "Backend", "DevOps", "Quality Assurance"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-green-500/3 to-cyan-500/3 rounded-full blur-3xl"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      </div>

      <FloatingParticles />

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Hero Section */}
       
       

        {/* Vision, Mission, Values Tabs */}
        <div className="mb-20">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50">
              {[
                { id: "histoire", label: "Notre Histoire", icon: <Users className="w-4 h-4" /> },
                { id: "vision", label: "Notre Vision", icon: <Eye className="w-4 h-4" /> },
                { id: "mission", label: "Notre Mission", icon: <Target className="w-4 h-4" /> },
                { id: "values", label: "Nos Valeurs", icon: <Heart className="w-4 h-4" /> },
                
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
          {activeTab === "histoire" && (
              <div className="text-center p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-in fade-in duration-500">
                <Target className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Notre Histoire</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Accompagner les entreprises dans leur transformation digitale en développant 
                  des solutions web et mobiles sur mesure. Nous nous engageons à livrer des 
                  produits de haute qualité qui répondent aux besoins spécifiques de nos clients, 
                  tout en respectant les délais et les budgets convenus.
                </p>
              </div>
            )}
            {activeTab === "vision" && (
              <div className="text-center p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-in fade-in duration-500">
                <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Notre Vision</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Devenir le partenaire technologique de référence au Sénégal et en Afrique, 
                  en créant des solutions digitales innovantes qui transforment les entreprises 
                  et améliorent la vie des utilisateurs. Nous aspirons à être reconnus pour 
                  notre excellence technique et notre impact positif sur l'écosystème numérique africain.
                </p>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="text-center p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 animate-in fade-in duration-500">
                <Target className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Notre Mission</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Accompagner les entreprises dans leur transformation digitale en développant 
                  des solutions web et mobiles sur mesure. Nous nous engageons à livrer des 
                  produits de haute qualité qui répondent aux besoins spécifiques de nos clients, 
                  tout en respectant les délais et les budgets convenus.
                </p>
              </div>
            )}
             

            {activeTab === "values" && (
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl bg-gradient-to-r ${value.color} border ${value.borderColor} backdrop-blur-xl hover:scale-105 transition-all duration-300`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-lg bg-white/10">
                        {value.icon}
                      </div>
                      <h4 className="text-xl font-bold text-white ml-3">{value.title}</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}

        {/* Location & Contact Info */}
        <div className="text-center">
     

          <div className="mt-8">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Travaillons ensemble
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}