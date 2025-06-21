import React, { useState, useEffect } from "react";
import { ChevronDown, Rocket, ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { FloatingParticles } from "./FloatingParticles";
export function HeroSection() {
    const [currentText, setCurrentText] = useState(0);
    const [mounted, setMounted] = useState(false);

    const texts = [
        { text: "Sites Web Extraordinaires", color: "from-blue-400 to-cyan-400" },
        { text: "Applications Mobiles", color: "from-purple-400 to-pink-400" },
        { text: "Solutions Digitales", color: "from-green-400 to-emerald-400" },
        { text: "Expériences Uniques", color: "from-orange-400 to-red-400" }
    ];

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCurrentText((prev) => (prev + 1) % texts.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative min-h-screen overflow-hidden bg-black ">
            {/* Background effects */}
            <div className="absolute inset-0">
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
            </div>

            <FloatingParticles />

            {/* Geometric accents */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-2 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left column - Main content */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Badge */}
                            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                                <span className="text-sm font-medium text-blue-300">Jeunes Développeurs Passionnés</span>
                            </div> */}

                            {/* Main heading */}
                            <div className="space-y-6">
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    <span className="block text-white mb-2">Nous créons des</span>
                                    <span className={`block bg-gradient-to-r text-3xl ${texts[currentText].color} bg-clip-text text-transparent transition-all duration-700`}>
                                        {texts[currentText].text}
                                    </span>
                                </h1>

                                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>

                            {/* Description */}
                            <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                                Diplômés en génie logiciel, nous transformons vos idées les plus audacieuses
                                en <span className="text-blue-400 font-semibold">expériences digitales extraordinaires</span>.
                            </p>

                            {/* CTA buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <span className="relative z-10 flex items-center justify-center">
                                        Démarrer un projet
                                        <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                <button className="group px-8 py-4 border border-slate-600 text-slate-300 rounded-xl font-semibold text-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-400/5">
                                    <span className="flex items-center justify-center">
                                        Voir nos réalisations
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Right column - Visual elements */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative">
                                {/* Main visual element */}
                                <div className="relative aspect-square max-w-md mx-auto">
                                    {/* Rotating border */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-0.5 animate-spin-slow">
                                        <div className="w-full h-full rounded-full bg-slate-950"></div>
                                    </div>

                                    {/* Center content */}
                                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center">
                                        <div className="text-center">
                                            <Code2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                                            <div className="text-2xl font-bold text-white mb-2">SenDevVision</div>
                                            <div className="text-sm text-slate-400">Innovation • Créativité • Excellence</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating cards */}
                                <div className="absolute -top-4 -right-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 animate-float">
                                    <div className="text-xs text-slate-400 mb-1">Stack Technique</div>
                                    <div className="text-sm font-semibold text-white">Java • Angular • Spring Boot • Flutter </div>
                                </div>

                                <div className="absolute -bottom-4 -left-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 animate-float-delayed">
                                    <div className="text-xs text-slate-400 mb-1">Spécialités</div>
                                    <div className="text-sm font-semibold text-white">UI/UX • Mobile • Web</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="flex flex-col items-center text-slate-400">
                            <span className="text-xs mb-2">Découvrir</span>
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 6s ease-in-out infinite 3s;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </section>
    );
}
