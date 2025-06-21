import { ChevronRight, Globe, Smartphone, Zap, ArrowUpRight, Sparkles } from 'lucide-react';

export function ServicesSection() {
    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Développement Web",
            subtitle: "Sites & Applications Web",
            description: "Créations digitales modernes avec des technologies de pointe. Des sites vitrines aux plateformes e-commerce complexes.",
            features: ["Angular/React.js", "Design Responsif", "Performance Optimisée", "SEO Intégré"],
            color: "from-blue-600 via-blue-500 to-cyan-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20 hover:border-blue-400/50"
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Applications Mobiles",
            subtitle: "iOS & Android",
            description: "Applications natives et cross-platform performantes avec une expérience utilisateur exceptionnelle.",
            features: ["Flutter", "GetX Framework", "UI/UX Design", "Apk Deploy"],
            color: "from-purple-600 via-purple-500 to-pink-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20 hover:border-purple-400/50"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Solutions Sur Mesure",
            subtitle: "Innovation & Consulting",
            description: "Développement personnalisé et consulting technique pour transformer vos idées en solutions digitales innovantes.",
            features: ["Architecture Custom", "API Development", "Cloud Solutions", "Maintenance 24/7"],
            color: "from-emerald-600 via-green-500 to-teal-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20 hover:border-green-400/50"
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
            {/* Éléments décoratifs en arrière-plan */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* En-tête de section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">NOS EXPERTISES</span>
                    </div>
                    
                    <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                        Services
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            d'Excellence
                        </span>
                    </h2>
                    
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Chez <span className="font-semibold text-white">SenDevVision</span>, nous transformons vos idées en solutions digitales innovantes avec des technologies de pointe et un savoir-faire artisanal.
                    </p>
                </div>

                {/* Grille des services */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border ${service.borderColor} transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10`}
                        >
                            {/* Effet de brillance au survol */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12"></div>
                            
                            {/* Icône avec gradient */}
                            <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-8 shadow-lg shadow-black/20`}>
                                <div className="text-white relative z-10">
                                    {service.icon}
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Contenu */}
                            <div className="relative z-10">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                                        {service.subtitle}
                                    </p>
                                </div>

                                <p className="text-slate-300 leading-relaxed mb-8 text-base">
                                    {service.description}
                                </p>

                                {/* Liste des fonctionnalités */}
                                <div className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mr-3"></div>
                                            <span className="text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Bouton CTA */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors cursor-pointer">
                                        <span className="text-sm font-semibold">Découvrir plus</span>
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                    
                                    <button className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110">
                                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* Indicateur de numéro */}
                            <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section CTA en bas */}
                <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-sm">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-slate-900"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-slate-900"></div>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">Prêt à démarrer votre projet ?</p>
                            <p className="text-xs text-slate-400">Parlons de vos besoins et objectifs</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-blue-400" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;