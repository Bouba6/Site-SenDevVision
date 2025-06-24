import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { colorVariants, servicesJson2 } from "./json";

function ServicesPage() {
  return (
    <div className="relative bg-black text-white p-8 md:p-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- TITRE DE LA SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Des services <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">innovants</span> pour des projets ambitieux.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Nous combinons design, technologie et stratégie pour donner vie à vos idées et créer des produits numériques exceptionnels.
          </p>
        </motion.div>

        {/* --- GRILLE DES SERVICES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesJson2.map((service) => (
            // Chaque carte est maintenant un lien vers la page de détail
            <Link to={`/service/${service.id}`} key={service.id}>
              <motion.div
                layoutId={`service-card-${service.id}`} // L'animation partagée fonctionnera toujours !
                className={`p-8 h-full rounded-2xl cursor-pointer transition-all duration-300 ${colorVariants[service.color].bg} border ${colorVariants[service.color].border} ${colorVariants[service.color].hoverBorder}`}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className={`inline-block p-4 rounded-xl mb-6 bg-gradient-to-br ${colorVariants[service.color].gradient}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{service.title}</h3>
                <p className="text-slate-400 mb-6">{service.description}</p>
                <div className="flex items-center font-medium text-slate-300 group mt-auto">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;