import React, { useEffect, useRef } from 'react';
import robotImage from '../assets/img/robotbanner.png'; // adapte le chemin selon où est ton fichier

// Simulation de Framer Motion avec des animations CSS personnalisées
const MotionDiv = ({ children, className, initial, whileInView, viewport, transition, whileHover, ...props }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} opacity-0 translate-y-8 transition-all duration-1000 ease-out`}
            {...props}
        >
            {children}
        </div>
    );
};

export default function Banner() {
    const canvasRef = useRef(null);

    // Animation des particules de fond
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Création des particules
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                ctx.fill();

                // Effet de glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden">
            {/* Canvas pour les particules */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-30"
            />

            {/* Motif de grille futuriste */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Effets de lumière */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />

            {/* Contenu principal */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <MotionDiv
                        className="text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Robot Image en arrière-plan */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 opacity-20">
                            <div className="relative group">
                                {/* Robot */}
                                <div className="relative robot-container">
                                    <img
                                        src={robotImage}
                                        alt="AI Robot"
                                        className="w-96 h-96 md:w-[500px] md:h-[500px] object-contain filter blur-none robot-float"
                                        onError={(e) => console.error('Erreur de chargement de l\'image :', e)}
                                    />

                                    {/* Robot SVG de fallback */}
                                    <div className="w-96 h-96 md:w-[500px] md:h-[500px] hidden items-center justify-center robot-float">
                                        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400 opacity-30">
                                            {/* Corps du robot */}
                                            <rect x="25" y="40" width="50" height="45" rx="8" fill="currentColor" opacity="0.8" />
                                            {/* Tête */}
                                            <rect x="30" y="15" width="40" height="35" rx="15" fill="currentColor" />
                                            {/* Yeux */}
                                            <circle cx="38" cy="28" r="3" fill="#00ffff" className="animate-pulse" />
                                            <circle cx="62" cy="28" r="3" fill="#00ffff" className="animate-pulse" />
                                            {/* Antenne */}
                                            <line x1="50" y1="15" x2="50" y2="8" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="50" cy="8" r="2" fill="#00ffff" className="animate-ping" />
                                            {/* Bras */}
                                            <rect x="15" y="45" width="12" height="25" rx="6" fill="currentColor" opacity="0.7" />
                                            <rect x="73" y="45" width="12" height="25" rx="6" fill="currentColor" opacity="0.7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Particules orbitales */}
                                <div className="absolute inset-0 particle-orbit opacity-50">
                                    <div className="particle particle-1"></div>
                                    <div className="particle particle-2"></div>
                                    <div className="particle particle-3"></div>
                                </div>
                            </div>
                        </div>

                        {/* Titre principal */}
                        <MotionDiv
                            className="mb-6 relative z-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                                Let's{' '}
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                                    work together
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse" />
                        </MotionDiv>

                        {/* Texte inspirant */}
                        <MotionDiv
                            className="mb-12 relative z-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                                Transformons vos idées en réalité numérique.
                                <span className="text-blue-400 font-medium"> L'intelligence artificielle</span> et
                                <span className="text-purple-400 font-medium"> la créativité humaine</span> s'unissent
                                pour créer des expériences extraordinaires.
                            </p>
                        </MotionDiv>
                        {/*
                        Bouton Contact
                        <MotionDiv
                            className="relative z-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95">
                              
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                       
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                        <span className="relative flex items-center justify-center gap-3">
                            Contact Us
                            <svg
                                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </MotionDiv>*/}

                        {/* Indicateurs de scroll */}
                        <MotionDiv
                            className="mt-16 relative z-20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.8 }}
                        >
                            <div className="flex justify-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
                            </div>
                        </MotionDiv>
                    </MotionDiv>
                </div>
            </div >

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        .robot-float {
          animation: float 6s ease-in-out infinite;
        }

        .robot-container:hover .robot-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-up.opacity-0 {
          animation: fadeUp 1s ease-out forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .particle-orbit {
          animation: orbit 20s linear infinite;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00ffff;
          box-shadow: 0 0 10px #00ffff;
        }

        .particle-1 {
          top: 10%;
          left: 50%;
          animation: orbit 15s linear infinite;
        }

        .particle-2 {
          top: 50%;
          right: 10%;
          animation: orbit 25s linear infinite reverse;
        }

        .particle-3 {
          bottom: 10%;
          left: 20%;
          animation: orbit 20s linear infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
        </section >
    );
}