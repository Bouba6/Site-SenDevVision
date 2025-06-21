import React, { useEffect, useState } from 'react';
import { Users, Heart, Star, Mail, Phone, MapPin, Code2, Sparkles, ArrowRight, Globe, Zap, Target, Instagram, Linkedin, Github, Eye } from 'lucide-react';

// Composant de particules amélioré
const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {                        
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 15; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 6 + 3,
                    duration: Math.random() * 4 + 3,
                    delay: Math.random() * 3,
                    opacity: Math.random() * 0.3 + 0.1
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full animate-float"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `radial-gradient(circle, rgba(59, 130, 246, ${particle.opacity}) 0%, rgba(147, 51, 234, ${particle.opacity * 0.5}) 100%)`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

// Composant Modal pour voir l'image en grand
const ImageModal = ({ isOpen, onClose, promoteur }) => {
    if (!isOpen || !promoteur) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={onClose}>
            <div className="relative max-w-5xl w-full bg-slate-900/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl" onClick={e => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 hover:scale-110"
                >
                    ✕
                </button>
                <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative">
                        <img 
                            src={promoteur.image} 
                            alt={promoteur.nom}
                            className="w-full h-96 lg:h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${promoteur.color} opacity-20`}></div>
                    </div>
                    <div className="p-10 flex flex-col justify-center bg-slate-900/50">
                        <h3 className="text-4xl font-black text-white mb-3 tracking-tight">{promoteur.nom}</h3>
                        <p className="text-2xl text-blue-300 mb-6 font-semibold">{promoteur.role}</p>
                        <div className={`inline-block px-6 py-3 bg-gradient-to-r ${promoteur.color} rounded-full text-white text-base font-bold mb-8 w-fit shadow-lg`}>
                            {promoteur.expertise}
                        </div>
                        <p className="text-slate-200 text-xl italic mb-8 leading-relaxed font-medium">
                            "{promoteur.pensee}"
                        </p>
                        <div className="flex gap-4">
                            <a href={promoteur.linkedin} className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                            <a href={promoteur.github} className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GallerySection = () => {
    const [mounted, setMounted] = useState(false);
    const [selectedPromoter, setSelectedPromoter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const promoteurs = [
        // Bloc 1 - Leadership
        {
            id: 1,
            nom: "Amadou Diallo",
            role: "Fondateur & CEO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
            pensee: "Sen Dev Vision est né de ma passion pour l'innovation technologique au service de l'Afrique. Je crois fermement que nous pouvons révolutionner le secteur tech africain.",
            expertise: "Strategy & Leadership",
            linkedin: "#",
            github: "#",
            color: "from-blue-500 to-cyan-500",
            bloc: 1
        },
        {
            id: 2,
            nom: "Fatou Sarr",
            role: "CTO & Co-fondatrice",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=800&fit=crop&crop=face",
            pensee: "Chaque ligne de code contribue à bâtir l'avenir numérique du Sénégal. Notre mission est de créer des solutions qui transforment vraiment la vie des gens.",
            expertise: "Tech Innovation",
            linkedin: "#",
            github: "#",
            color: "from-purple-500 to-pink-500",
            bloc: 1
        },
        {
            id: 3,
            nom: "Khadija Ndiaye",
            role: "Product Manager",
            image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&h=800&fit=crop&crop=face",
            pensee: "Je traduis les besoins utilisateurs en solutions concrètes. Mon rôle est de m'assurer que chaque feature apporte une vraie valeur ajoutée.",
            expertise: "Product Strategy",
            linkedin: "#",
            github: "#",
            color: "from-teal-500 to-cyan-500",
            bloc: 1
        },
        // Bloc 2 - Développement
        {
            id: 4,
            nom: "Ibrahima Kane",
            role: "Lead Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
            pensee: "Nous transformons les idées en solutions technologiques révolutionnaires. La créativité et la technique se rencontrent ici pour créer l'extraordinaire.",
            expertise: "Full-Stack Development",
            linkedin: "#",
            github: "#",
            color: "from-green-500 to-emerald-500",
            bloc: 2
        },
        {
            id: 5,
            nom: "Moussa Traoré",
            role: "DevOps Engineer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
            pensee: "L'infrastructure est l'épine dorsale de toute innovation. Je m'assure que nos solutions soient robustes, scalables et disponibles 24/7.",
            expertise: "Infrastructure & Security",
            linkedin: "#",
            github: "#",
            color: "from-indigo-500 to-purple-500",
            bloc: 2
        },
        {
            id: 6,
            nom: "Omar Fall",
            role: "Data Scientist",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face",
            pensee: "Les données racontent des histoires fascinantes. Mon travail consiste à extraire des insights précieux qui guident nos décisions stratégiques.",
            expertise: "Data & AI",
            linkedin: "#",
            github: "#",
            color: "from-violet-500 to-purple-500",
            bloc: 2
        },
        // Bloc 3 - Design & Marketing
        {
            id: 7,
            nom: "Aïssatou Ba",
            role: "UI/UX Designer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
            pensee: "Le design n'est pas juste l'apparence, c'est l'expérience. Chaque pixel compte pour créer des interfaces qui enchantent nos utilisateurs.",
            expertise: "Design & Experience",
            linkedin: "#",
            github: "#",
            color: "from-orange-500 to-red-500",
            bloc: 3
        },
        {
            id: 8,
            nom: "Aminata Seck",
            role: "Marketing Digital",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&crop=face",
            pensee: "Je construis des ponts entre nos innovations et nos utilisateurs. Chaque campagne est une opportunité de créer des connexions authentiques.",
            expertise: "Growth & Marketing",
            linkedin: "#",
            github: "#",
            color: "from-rose-500 to-pink-500",
            bloc: 3
        },
        {
            id: 9,
            nom: "Cheikh Ly",
            role: "QA Engineer",
            image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=600&h=800&fit=crop&crop=face",
            pensee: "La qualité n'est pas négociable. Je m'assure que chaque produit qui sort de nos mains répond aux plus hauts standards d'excellence.",
            expertise: "Quality Assurance",
            linkedin: "#",
            github: "#",
            color: "from-amber-500 to-orange-500",
            bloc: 3
        }
    ];

    const blocTitles = {
        1: "Leadership & Vision",
        2: "Développement & Tech",
        3: "Design & Marketing"
    };

    const blocSubtitles = {
        1: "L'équipe dirigeante qui guide notre vision",
        2: "Les architectes de nos solutions techniques",
        3: "Les créatifs qui donnent vie à nos idées"
    };

    const handleImageClick = (promoteur) => {
        setSelectedPromoter(promoteur);
        setIsModalOpen(true);
    };

    const groupedPromoteurs = promoteurs.reduce((acc, promoteur) => {
        if (!acc[promoteur.bloc]) {
            acc[promoteur.bloc] = [];
        }
        acc[promoteur.bloc].push(promoteur);
        return acc;
    }, {});

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            {/* Header de la Galerie */}
            <section className="relative py-24 px-6">
                <FloatingParticles />
                
                <div className="relative z-10 text-center">
                    <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl mb-10 animate-pulse shadow-2xl">
                        <Users className="w-14 h-14 text-white" />
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                        GALERIE
                    </h1>
                    <div className="w-40 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-10 rounded-full shadow-lg"></div>
                    <p className="text-3xl text-white max-w-4xl mx-auto leading-relaxed font-medium">
                        Découvrez les <span className="text-blue-400 font-bold">visages</span> et les <span className="text-purple-400 font-bold">talents</span> qui construisent l'avenir technologique du Sénégal
                    </p>
                    <div className="mt-10 text-slate-300">
                        <p className="text-xl font-semibold">Cliquez sur une photo pour en savoir plus</p>
                        <Eye className="w-8 h-8 mx-auto mt-4 animate-bounce text-blue-400" />
                    </div>
                </div>
            </section>

            {/* Galerie en Blocs */}
            <section className="relative px-6 pb-20">
                <div className="container mx-auto max-w-7xl">
                    {Object.entries(groupedPromoteurs).map(([blocNumber, membres]) => (
                        <div key={blocNumber} className="mb-20">
                            {/* Titre du bloc */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    {blocTitles[blocNumber]}
                                </h2>
                                <p className="text-xl text-slate-400 font-medium">
                                    {blocSubtitles[blocNumber]}
                                </p>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                            </div>

                            {/* Grille de 3 images */}
                            <div className="grid md:grid-cols-3 gap-10">
                                {membres.map((promoteur, index) => (
                                    <div
                                        key={promoteur.id}
                                        className="group cursor-pointer"
                                        onClick={() => handleImageClick(promoteur)}
                                        style={{ 
                                            animationDelay: `${index * 200}ms`,
                                            transform: `rotate(${(index - 1) * 3}deg)`
                                        }}
                                    >
                                        {/* Ombre et effets */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${promoteur.color} opacity-0 group-hover:opacity-40 rounded-3xl blur-2xl transition-all duration-500 w-full h-full`}></div>
                                        
                                        {/* Conteneur de l'image */}
                                        <div className="relative w-full h-96 group-hover:scale-105 group-hover:rotate-0 transition-all duration-700 ease-out">
                                            {/* Image principale */}
                                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group-hover:border-white/50 transition-all duration-500">
                                                <img
                                                    src={promoteur.image}
                                                    alt={promoteur.nom}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                
                                                {/* Overlay gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                
                                                {/* Badge expertise */}
                                                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                    <div className={`px-4 py-2 bg-gradient-to-r ${promoteur.color} rounded-full text-white text-sm font-bold shadow-xl border border-white/20`}>
                                                        {promoteur.expertise}
                                                    </div>
                                                </div>

                                                {/* Info au hover */}
                                                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                    <h3 className="text-white text-2xl font-black mb-2 drop-shadow-lg">{promoteur.nom}</h3>
                                                    <p className="text-blue-300 text-base font-bold drop-shadow-md">{promoteur.role}</p>
                                                </div>

                                                {/* Icône "voir plus" */}
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                                    <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-xl">
                                                        <Eye className="w-10 h-10 text-white drop-shadow-lg" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Badge nom fixe en bas */}
                                        <div className="mt-6 text-center">
                                            <h4 className="text-white text-xl font-bold mb-1">{promoteur.nom}</h4>
                                            <p className="text-slate-400 text-base">{promoteur.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Instructions d'interaction */}
            <section className="relative py-20 px-6">
                <div className="text-center">
                    <div className="inline-flex items-center gap-6 px-10 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full shadow-2xl">
                        <div className="flex items-center gap-3 text-blue-400">
                            <Eye className="w-6 h-6" />
                            <span className="text-lg font-bold">Cliquez pour explorer</span>
                        </div>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="flex items-center gap-3 text-purple-400">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-lg font-bold">Survolez pour prévisualiser</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <ImageModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                promoteur={selectedPromoter} 
            />

            {/* Custom Styles */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-5px) rotate(180deg); }
                }
                
                .animate-float {
                    animation: float 10s ease-in-out infinite;
                }

                /* Animation d'apparition */
                .grid > div {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default GallerySection;