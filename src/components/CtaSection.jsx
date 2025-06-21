
import { Star } from 'lucide-react';



export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Prêt à Révolutionner Votre Présence Digitale ?
                </h2>

                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                    Contactez-nous dès aujourd'hui et découvrez comment nous pouvons transformer votre vision en réalité digitale extraordinaire
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                        <span className="relative z-10 flex items-center">
                            Commencer Maintenant
                            <Star className="ml-3 w-6 h-6 group-hover:animate-spin" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
