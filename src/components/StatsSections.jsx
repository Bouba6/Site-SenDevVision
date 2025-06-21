



export function StatsSection() {
    const stats = [
        { number: "50+", label: "Projets Réalisés" },
        { number: "100%", label: "Clients Satisfaits" },
        { number: "24/7", label: "Support Disponible" },
        { number: "3", label: "Années d'Expérience" }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>
                            <div className="text-xl text-blue-200 group-hover:text-white transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;