

import { ChevronDown, Smartphone, Globe, Zap } from 'lucide-react';


export function ServicesSection() {
    const services = [
        {
            icon: <Globe className="w-12 h-12" />,
            title: "Sites Web",
            description: "Des sites web modernes et responsives avec des designs qui marquent les esprits",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Smartphone className="w-12 h-12" />,
            title: "Applications Mobiles",
            description: "Applications natives et cross-platform pour iOS et Android",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: "Solutions Custom",
            description: "Développement sur mesure adapté à vos besoins spécifiques",
            color: "from-green-500 to-teal-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-black to-slate-900 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Nos Services Extraordinaires
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Nous maîtrisons les technologies les plus avancées pour créer des solutions digitales qui vous démarquent
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>

                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                                <div className="text-white">
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-300 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                                <span className="text-sm font-semibold">En savoir plus</span>
                                <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;