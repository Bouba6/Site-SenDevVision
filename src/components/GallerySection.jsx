import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Users, Mail, Linkedin, Github, Eye, Award, X, Grid, Camera, Layers, Heart, Star, Phone, MapPin, Code2, Sparkles, ArrowRight, Globe, Zap, Target, Instagram, Calendar, Coffee } from 'lucide-react';
import GalleryHero from './ui/GalleryHero';
import GalleryGrid from './ui/GalleryGrid';

// Composant de particules ultra sophistiqué
const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 4,
                    duration: Math.random() * 6 + 4,
                    delay: Math.random() * 4,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'cyan'
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    const getParticleColor = (color, opacity) => {
        switch (color) {
            case 'blue': return `rgba(59, 130, 246, ${opacity})`;
            case 'purple': return `rgba(147, 51, 234, ${opacity})`;
            case 'cyan': return `rgba(6, 182, 212, ${opacity})`;
            default: return `rgba(59, 130, 246, ${opacity})`;
        }
    };

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
                        background: `radial-gradient(circle, ${getParticleColor(particle.color, particle.opacity)} 0%, transparent 70%)`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                        filter: 'blur(1px)'
                    }}
                />
            ))}
        </div>
    );
};

// Modal ultra moderne et immersif
const ImageModal = ({ isOpen, onClose, promoteur }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !promoteur || !mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal container - Taille réduite */}
                    <motion.div
                        className="relative w-full max-w-3xl mx-auto z-10"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    >
                        {/* Bouton fermer - Ajusté */}
                        <motion.button
                            onClick={onClose}
                            className="absolute -top-4 -right-4 z-20 w-12 h-12 bg-blue-800 hover:bg-blue-900 rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/20"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Card principal - Hauteur réduite */}
                        <motion.div
                            className="relative bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[75vh]"
                            layoutId={`card-${promoteur.id}`}
                        >
                            <div className="grid lg:grid-cols-2 gap-0 h-full">
                                {/* Section Image sans cadre - Image complète */}
                                <motion.div
                                    className="relative h-full min-h-[350px]"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {/* Image en plein écran */}
                                    <motion.img
                                        src={promoteur.image}
                                        alt={promoteur.nom}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />

                                    {/* Overlay léger pour meilleure lisibilité */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                    
                                </motion.div>

                                {/* Section Contenu - Padding réduit */}
                                <motion.div
                                    className="p-6 flex flex-col justify-center space-y-4"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {/* Header avec animation - Tailles réduites */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                                            {promoteur.nom}
                                        </h3>
                                        <p className={`text-xl font-bold bg-gradient-to-r ${promoteur.color} bg-clip-text text-transparent`}>
                                            {promoteur.role}
                                        </p>
                                    </motion.div>

                                    {/* Badge expertise - Plus compact */}
                                    <motion.div
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${promoteur.color} bg-opacity-20 rounded-full border border-white/20 backdrop-blur-sm w-fit`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                    >
                                        <Award className="w-3.5 h-3.5 text-white" />
                                        <span className="text-white font-medium text-sm">{promoteur.expertise}</span>
                                    </motion.div>

                                    {/* Citation avec animation typewriter - Plus compact */}
                                    <motion.blockquote
                                        className="relative"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="text-4xl text-blue-400/20 absolute -top-2 -left-1">"</div>
                                        <p className="text-white/90 text-base italic leading-relaxed pl-4">
                                            {promoteur.pensee}
                                        </p>
                                        <div className="text-4xl text-purple-400/20 absolute -bottom-4 -right-1 rotate-180">"</div>
                                    </motion.blockquote>

                                    {/* Actions avec hover effects - Plus compact */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="flex gap-2">
                                            <motion.a
                                                href={promoteur.linkedin}
                                                className="flex-1 bg-blue-600 text-white px-3 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                                whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </motion.a>

                                            <motion.a
                                                href={promoteur.github}
                                                className="flex-1 bg-slate-700 text-white px-3 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                                whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </motion.a>
                                        </div>

                                        <motion.button
                                            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                            whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Mail className="w-4 h-4" />
                                            Contacter
                                        </motion.button>
                                    </motion.div>

                                    {/* Footer - Plus compact */}
                                    <motion.div
                                        className="flex items-center justify-center gap-3 pt-3 opacity-70"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                        <div className="text-white/60 font-medium text-xs">
                                            Sen Dev Vision
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const GallerySection = () => {
    const [mounted, setMounted] = useState(false);
    const [selectedPromoter, setSelectedPromoter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

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
            color: "bg-red-500",
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

    const blocIcons = {
        1: Target,
        2: Code2,
        3: Sparkles
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
        <div className="min-h-screen bg-black overflow-hidden mt-18">
            {/* Header spectaculaire */}
            <GalleryHero />

            {/* Galerie restructurée */}
            <GalleryGrid
                groupedPromoteurs={groupedPromoteurs}
                handleImageClick={handleImageClick}
            />

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
                    33% { transform: translateY(-10px) rotate(120deg); }
                    66% { transform: translateY(5px) rotate(240deg); }
                }
                
                .animate-float {
                    animation: float 12s ease-in-out infinite;
                }

                .perspective-1000 {
                    perspective: 1000px;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }
                
                .animation-delay-400 {
                    animation-delay: 400ms;
                }

                /* Animation d'apparition */
                .grid > div {
                    animation: slideInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(50px);
                }

                @keyframes slideInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default GallerySection;