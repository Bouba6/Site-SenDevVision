import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Users, Mail, Linkedin, Github, Eye, Award, X, Grid, Camera, Layers, Heart, Star, Phone, MapPin, Code2, Sparkles, ArrowRight, Globe, Zap, Target, Instagram, Calendar, Coffee } from 'lucide-react';
import GalleryHero from './ui/GalleryHero';
import GalleryGrid from './ui/GalleryGrid';

// Hook personnalisé pour détecter mobile
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

// Composant de particules optimisé pour mobile
const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        const generateParticles = () => {
            const newParticles = [];
            const particleCount = isMobile ? 8 : 20; // Moins de particules sur mobile
            
            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: isMobile ? Math.random() * 4 + 2 : Math.random() * 8 + 4,
                    duration: Math.random() * 6 + 4,
                    delay: Math.random() * 4,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'purple' : 'cyan'
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, [isMobile]);

    const getParticleColor = (color, opacity) => {
        switch (color) {
            case 'blue': return `rgba(59, 130, 246, ${opacity})`;
            case 'purple': return `rgba(147, 51, 234, ${opacity})`;
            case 'cyan': return `rgba(6, 182, 212, ${opacity})`;
            default: return `rgba(59, 130, 246, ${opacity})`;
        }
    };

    // Pas de particules sur mobile pour les performances
    if (isMobile) return null;

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

// Modal ultra responsive avec scroll
const ImageModal = ({ isOpen, onClose, promoteur }) => {
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            // Restaurer le scroll du body
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.width = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.width = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !promoteur || !mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal container - Responsive */}
                    <motion.div
                        className={`relative z-10 mx-auto ${
                            isMobile 
                                ? 'w-full h-full p-0' 
                                : 'w-full max-w-3xl p-4'
                        }`}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    >
                        {/* Bouton fermer - Position adaptée */}
                        <motion.button
                            onClick={onClose}
                            className={`absolute z-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/20 ${
                                isMobile 
                                    ? 'top-4 right-4 w-10 h-10' 
                                    : '-top-4 -right-4 w-12 h-12'
                            }`}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <X className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                        </motion.button>

                        {/* Card principal - Layout adaptatif */}
                        <motion.div
                            className={`relative bg-white/5 backdrop-blur-2xl overflow-hidden border border-white/10 shadow-2xl ${
                                isMobile 
                                    ? 'h-full rounded-none' 
                                    : 'rounded-2xl max-h-[75vh]'
                            }`}
                            layoutId={`card-${promoteur.id}`}
                        >
                            {/* Version Mobile - Layout vertical avec scroll */}
                            {isMobile ? (
                                <div className="h-full overflow-y-auto overscroll-contain">
                                    {/* Image fixe en haut */}
                                    <motion.div
                                        className="relative h-64 flex-shrink-0"
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.img
                                            src={promoteur.image}
                                            alt={promoteur.nom}
                                            className="w-full h-full object-cover"
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    </motion.div>

                                    {/* Contenu scrollable */}
                                    <motion.div
                                        className="p-6 space-y-6 min-h-screen"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {/* Header */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                                                {promoteur.nom}
                                            </h3>
                                            <p className={`text-lg font-bold bg-gradient-to-r ${promoteur.color} bg-clip-text text-transparent`}>
                                                {promoteur.role}
                                            </p>
                                        </motion.div>

                                        {/* Badge expertise */}
                                        <motion.div
                                            className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${promoteur.color} bg-opacity-20 rounded-full border border-white/20 backdrop-blur-sm w-fit`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring" }}
                                        >
                                            <Award className="w-4 h-4 text-white" />
                                            <span className="text-white font-medium text-sm">{promoteur.expertise}</span>
                                        </motion.div>

                                        {/* Citation */}
                                        <motion.blockquote
                                            className="relative bg-white/5 p-6 rounded-xl border border-white/10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <div className="text-3xl text-blue-400/30 absolute -top-2 -left-2">"</div>
                                            <p className="text-white/90 text-base leading-relaxed pl-6 pr-6">
                                                {promoteur.pensee}
                                            </p>
                                            <div className="text-3xl text-purple-400/30 absolute -bottom-2 -right-2 rotate-180">"</div>
                                        </motion.blockquote>

                                        {/* Informations supplémentaires */}
                                        <motion.div
                                            className="space-y-4"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                    <div className="text-blue-400 text-2xl font-bold">5+</div>
                                                    <div className="text-white/70 text-sm">Années d'expérience</div>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                    <div className="text-green-400 text-2xl font-bold">20+</div>
                                                    <div className="text-white/70 text-sm">Projets réalisés</div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Actions */}
                                        <motion.div
                                            className="space-y-3 pb-8"
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <div className="grid grid-cols-2 gap-3">
                                                <motion.a
                                                    href={promoteur.linkedin}
                                                    className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    LinkedIn
                                                </motion.a>

                                                <motion.a
                                                    href={promoteur.github}
                                                    className="bg-slate-700 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </motion.a>
                                            </div>

                                            <motion.button
                                                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Contacter par email
                                            </motion.button>

                                            <motion.button
                                                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Phone className="w-4 h-4" />
                                                Appeler
                                            </motion.button>
                                        </motion.div>

                                        {/* Footer */}
                                        <motion.div
                                            className="flex items-center justify-center gap-3 pt-4 opacity-70 border-t border-white/10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                            <div className="text-white/60 font-medium text-xs">
                                                Sen Dev Vision
                                            </div>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            ) : (
                                /* Version Desktop - Layout horizontal */
                                <div className="grid lg:grid-cols-2 gap-0 h-full">
                                    {/* Section Image */}
                                    <motion.div
                                        className="relative h-full min-h-[350px]"
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.img
                                            src={promoteur.image}
                                            alt={promoteur.nom}
                                            className="w-full h-full object-cover"
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                    </motion.div>

                                    {/* Section Contenu Desktop */}
                                    <motion.div
                                        className="p-6 flex flex-col justify-center space-y-4 overflow-y-auto"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
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

                                        <motion.div
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${promoteur.color} bg-opacity-20 rounded-full border border-white/20 backdrop-blur-sm w-fit`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring" }}
                                        >
                                            <Award className="w-3.5 h-3.5 text-white" />
                                            <span className="text-white font-medium text-sm">{promoteur.expertise}</span>
                                        </motion.div>

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
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    LinkedIn
                                                </motion.a>

                                                <motion.a
                                                    href={promoteur.github}
                                                    className="flex-1 bg-slate-700 text-white px-3 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </motion.a>
                                            </div>

                                            <motion.button
                                                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Contacter
                                            </motion.button>
                                        </motion.div>

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
                            )}
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
            color: "from-red-500 to-orange-500",
            colorClass: "text-red-400",
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
            colorClass: "text-purple-400",
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
            colorClass: "text-teal-400",
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
            colorClass: "text-green-400",
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
            colorClass: "text-indigo-400",
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
            colorClass: "text-violet-400",
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
            colorClass: "text-orange-400",
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
            colorClass: "text-rose-400",
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
            colorClass: "text-amber-400",
            bloc: 3
        }
    ];

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
        <div className="min-h-screen bg-black overflow-hidden mt-0 sm:mt-12">
            {/* Particules optimisées pour mobile */}
            <FloatingParticles />

            {/* Header spectaculaire */}
            <GalleryHero />

            {/* Galerie restructurée */}
            <GalleryGrid
                groupedPromoteurs={groupedPromoteurs}
                handleImageClick={handleImageClick}
            />

            {/* Modal responsive avec scroll */}
            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                promoteur={selectedPromoter}
            />

            {/* Custom Styles optimisés pour mobile */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(120deg); }
                    66% { transform: translateY(5px) rotate(240deg); }
                }
                
                .animate-float {
                    animation: float 12s ease-in-out infinite;
                }

                /* Optimisations pour le scroll mobile */
                .overscroll-contain {
                    overscroll-behavior: contain;
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Scroll mobile optimisé */
                @media (max-width: 768px) {
                    .animate-float {
                        animation: float 8s ease-in-out infinite;
                    }
                    
                    /* Amélioration du scroll sur mobile */
                    .overflow-y-auto {
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    
                    .overflow-y-auto::-webkit-scrollbar {
                        display: none;
                    }
                    
                    /* Touch optimizations */
                    * {
                        -webkit-tap-highlight-color: transparent;
                        touch-action: manipulation;
                    }
                }

                /* Animation d'apparition optimisée */
                .grid > div {
                    animation: slideInUp 0.6s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                @keyframes slideInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Indicateur de scroll sur mobile */
                @media (max-width: 768px) {
                    .overflow-y-auto {
                        background: 
                            /* Shadow covers */
                            linear-gradient(white 30%, rgba(255,255,255,0)) 0 0,
                            linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,
                            
                            /* Shadows */
                            radial-gradient(50% 0, farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 0,
                            radial-gradient(50% 100%,farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
                        background-repeat: no-repeat;
                        background-color: transparent;
                        background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
                        background-attachment: local, local, scroll, scroll;
                    }
                }
            `}</style>
        </div>
    );
};

export default GallerySection;