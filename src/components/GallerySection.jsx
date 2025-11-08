import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, Linkedin, Github, Eye, Award, X, Grid, Camera, Layers, Heart, Star, Phone, MapPin, Code2, Sparkles, ArrowRight, Globe, Zap, Target, Instagram, Calendar, Coffee } from 'lucide-react';
import GalleryHero from './Gallery/GalleryHero';
import GalleryGrid from './Gallery/GalleryGrid';

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
    // Remplacer useState par useRef pour la position du scroll
    const scrollPosition = React.useRef(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Sauvegarder la position de scroll
            const currentScrollY = window.scrollY;
            scrollPosition.current = currentScrollY;
            // Bloquer le scroll en maintenant la position
            document.body.style.position = 'fixed';
            document.body.style.top = `-${currentScrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restaurer le scroll APRÈS avoir réinitialisé le style du body
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            // Utiliser setTimeout pour laisser le DOM se mettre à jour
            setTimeout(() => {
                window.scrollTo(0, scrollPosition.current);
            }, 0);
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
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
                        className="absolute inset-0 bg-black/10 backdrop-blur-2xl"
                        onClick={onClose}
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Modal container - Responsive */}
                    <motion.div
                        className={`relative z-10 mx-auto ${
                            isMobile 
                                ? 'w-full h-full p-4' 
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
                                    ? 'h-[85vh] rounded-xl' 
                                    : 'rounded-2xl max-h-[75vh]'
                            }`}
                            layoutId={`card-${promoteur.id}`}
                        >
                            {/* Version Mobile - Layout vertical avec scroll */}
                            {isMobile ? (
                                <div className="h-full overflow-y-auto overscroll-contain">
                                    {/* Image masquée sur mobile pour économiser l'espace */}

                                    {/* Contenu scrollable - commencé dès le haut */}
                                    <motion.div
                                        className="p-6 space-y-6 min-h-screen pt-8"
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

                                            <motion.a
                                                href={`mailto:${promoteur.email}`}
                                                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Contacter par email
                                            </motion.a>
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

                                            <motion.a
                                                href={`mailto:${promoteur.email}`}
                                                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Contacter
                                            </motion.a>
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

    useEffect(() => {
        setMounted(true);
    }, []);

    const promoteurs = [
        {
            id: 1,
            nom: "Ameth BA",
            role: "Développeur Full-Stack",
            image: "/promoteur/ameth.jpg",
            pensee: "SenDev Vision est bien plus qu’une entreprise. C’est une aventure collective née à l’école, où nous avons grandi et collaboré. Aujourd’hui, cette confiance commune est la force technique qui soutient chaque ligne de notre code.",
            expertise: "Esprit d’équipe - Communication",
            linkedin: "https://www.linkedin.com/in/ameth-ba-2920b3253/",
            github: "https://github.com/Bameth",
            email: "amethba8826@gmail.com",
            color: "from-[#007AFF] to-[#007AFF]",
            colorClass: "text-[#007AFF]",
        },
        {
            id: 2,
            nom: "Henri Pierre BASSENE",
            role: "Développeur Full-Stack",
            image: "",
            pensee: "Chaque ligne de code est un pas de plus vers l’impact.",
            expertise: "Capacité d’adaptation - Prise d’initiative",
            linkedin: "https://www.linkedin.com/in/henri-pierre-bassene/",
            github: "https://github.com/henripierre03",
            email: "henripierrebassene@gmail.com",
            color: "from-orange-500 to-orange-700",
            colorClass: "text-orange-500",
        },
        {
            id: 3,
            nom: "Seydina Aboubacar Sadikh Bathily",
            role: "Developpeur FullStack",
            image: "/promoteur/sadikh.png",
            pensee: "J'ai su développer une forte capacité à travailler en équipe et à faire avancer les projets dans une dynamique collaborative. SendevVision est le fruit de cette passion partagée. et je suis convaincu que nous irons loin avec ce groupe.",
            expertise: "Esprit d’équipe - rigueur - Adaptabilité",
            linkedin: "https://www.linkedin.com/in/aboubacar-sadikh-bathily/",
            github: "https://github.com/Bouba6/",
            email: "seydinaaboubacarsadikhbathily@gmail.com",
            color: "from-[#d2b48c] to-[#d2b48c]",
            colorClass: "text-[#d2b48c]",
        },
        {
            id: 4,
            nom: "Cheikh Ibnoul Arabi LY",
            role: "Full-Stack Développeur",
            image: "/promoteur/ibnoul.jpg",
            pensee: "Petit a petit nous tendons à rendre meilleur le monde de par nos sollution digital",
            expertise: "Esprit de dépassement - esprit d'equipe",
            linkedin: "https://www.linkedin.com/in/cheikh-ibnoul-arabi-ly-b1444025b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFt9kgA64TzW4l1QYK977Qw%3D%3D",
            github: "https://github.com/CheikhLy",
            email: "lyibnoul2@gmail.com",
            color: "from-[#D2691E] to-[#D2691E]",
            colorClass: "text-[#D2691E]",
        },
        {
            id: 5,
            nom: "Assane Ndiaye",
            role: "Développeur Full-Stack",
            image: "/promoteur/assane.jpeg",
            pensee: "SenDev Vision, c’est l’histoire de développeurs réunis dès l’école autour d’une idée simple : faire de la technologie un moteur de confiance et de performance, avec une précision sans compromis.",
            expertise: "Esprit d'équipe - Gestion des priorités",
            linkedin: "https://www.linkedin.com/in/assane-ndiaye-859429340/",
            github: "https://github.com/Assane818",
            email: "assanen818@gmail.com",
            color: "from-green-500 to-green-500",
            colorClass: "text-green-500",
        },
        {
            id: 6,
            nom: "Birane Ndiaye",
            role: "Développeur Full-Stack",
            image: "/promoteur/birane.jpeg",
            pensee: "Je suis un développeur Full-Stack, capable de transformer des idées complexes en applications fiables et bien conçues, en alliant rigueur technique, vision produit et sens de la collaboration.",
            expertise: "Sang froid - Communication",
            linkedin: "https://www.linkedin.com/in/birane-ndiaye-377765253/",
            github: "https://github.com/Fairyghost007",
            email: "biranenini6762@gmail.com",
            color: "from-blue-500 to-blue-700",
            colorClass: "text-blue-500",
        },
        {
            id: 7,
            nom: "Ousseynou Ndiaye",
            role: "Full stack développeur",
            image: "/promoteur/ousseynou.jpeg",
            pensee: "La technologie n'est qu'un levier. Le pouvoir de façonner le monde a toujours résidé, et résidera toujours, dans la bonté et l'ingéniosité de ceux qui s'en saisissent . Je suis ambitieux et déterminé à apporter des solutions innovantes et efficaces pour répondre aux besoins de nos clients.",
            expertise: "Esprit d’équipe - Capacité d’adaptation",
            linkedin: "https://www.linkedin.com/in/ousseynou-ndiaye-0aa429340/",
            github: "https://github.com/Ouzeon007",
            email: "nousseynou20@gmail.com",
            color: "from-indigo-600 to-indigo-600",
            colorClass: "text-indigo-600",
        },
        {
            id: 8,
            nom: "Sidy Mohamed Saizonou",
            role: "Full-Stack & Designer Graphique",
            image: "/promoteur/sidy.jpeg",
            pensee: "Je ne travaille pas pour briller, mais pour construire. Je veux que ce que je crée soit utile. Chaque détail compte.",
            expertise: "Esprit d'équipe - Curieux - Rigoureux",
            linkedin: "https://www.linkedin.com/in/sidy-mohamed-saizonou",
            github: "https://github.com/sidymohamed12",
            email: "mohamedsaizonou86@gmail.com",
            color: "from-green-500 to-green-700",
            colorClass: "text-green-500",
        },
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