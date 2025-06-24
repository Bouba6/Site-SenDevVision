// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// export function ValuesSection() {
//     const containerRef = useRef(null);
//     const imagesRef = useRef(null);
//     const whyUsRef = useRef(null);
//     const valuesRef = useRef(null);

//     const { scrollYProgress: imagesScroll } = useScroll({
//         target: imagesRef,
//         offset: ["start end", "end start"]
//     });

//     const { scrollYProgress: whyUsScroll } = useScroll({
//         target: whyUsRef,
//         offset: ["start end", "end start"]
//     });

//     // Parallax effects pour les images du haut
//     const y1 = useTransform(imagesScroll, [0, 1], [0, -120]);
//     const y2 = useTransform(imagesScroll, [0, 1], [0, -180]);
//     const circleRotate = useTransform(whyUsScroll, [0, 1], [0, 360]);

//     const valuesData = [
//         {
//             id: 1,
//             title: "Innovation",
//             text: "Créativité sans limites pour repousser les frontières",
//             image1: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=350&h=400&fit=crop",
//             image2: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=350&h=400&fit=crop"
//         },
//         {
//             id: 2,
//             title: "Excellence",
//             text: "Qualité irréprochable dans chaque détail",
//             image1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
//             image2: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=350&h=400&fit=crop"
//         },
//         {
//             id: 3,
//             title: "Collaboration",
//             text: "Force collective pour des résultats exceptionnels",
//             image1: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=500&fit=crop",
//             image2: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=350&h=400&fit=crop"
//         },
//         {
//             id: 4,
//             title: "Durabilité",
//             text: "Impact positif pour construire l'avenir",
//             image1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop",
//             image2: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=350&h=400&fit=crop"
//         },
//         {
//             id: 5,
//             title: "Adaptation",
//             text: "Flexibilité pour évoluer avec les défis",
//             image1: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop",
//             image2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=350&h=400&fit=crop"
//         },
//         {
//             id: 6,
//             title: "Passion",
//             text: "Énergie contagieuse dans chaque projet",
//             image1: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=500&fit=crop",
//             image2: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=350&h=400&fit=crop"
//         }
//     ];

//     return (
//         <div ref={containerRef} className="bg-black text-white">
//             {/* Section 2 grandes images côte à côte */}
//             <section ref={imagesRef} className="relative min-h-screen flex items-center px-8 py-16">
//                 <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 text-center">
//                     <motion.h2
//                         initial={{ opacity: 0, y: -30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 1 }}
//                         className="text-white text-5xl font-bold"
//                     >
//                         Découvrez notre équipe
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0, y: -20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 1, delay: 0.2 }}
//                         className="text-black mt-4 text-lg"
//                     >
//                         Passionnés, créatifs et toujours prêts à innover
//                     </motion.p>
//                 </div>
//                 <div className="w-full max-w-7xl mx-auto flex gap-8">
//                     {/* Image 1 - Plus large, alignée en haut */}
//                     <motion.div className="flex-[3] relative">
//                         <motion.img
//                             initial={{
//                                 opacity: 0,
//                                 scale: 0.8,
//                                 clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
//                             }}
//                             whileInView={{
//                                 opacity: 1,
//                                 scale: 1,
//                                 clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
//                             }}
//                             transition={{ duration: 1.5, ease: "easeOut" }}
//                             viewport={{ once: false }}
//                             src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop"
//                             alt="Grande image principale"
//                             className="w-full h-96 object-cover rounded-2xl shadow-2xl"
//                         />
//                     </motion.div>

//                     {/* Image 2 - Plus petite, décalée vers le bas */}
//                     <motion.div
//                         style={{ y: y2 }}
//                         className="flex-[2] relative mt-20"
//                     >
//                         <motion.img
//                             initial={{
//                                 opacity: 0,
//                                 scale: 0.8,
//                                 clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
//                             }}
//                             whileInView={{
//                                 opacity: 1,
//                                 scale: 1,
//                                 clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
//                             }}
//                             transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
//                             viewport={{ once: false, margin: "-10%" }}
//                             src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop"
//                             alt="Image secondaire"
//                             className="w-full h-80 object-cover rounded-2xl shadow-2xl"
//                         />
//                         {/* Overlay gradient pour effet layered */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             whileInView={{ opacity: 0.3 }}
//                             transition={{ duration: 2, delay: 0.9 }}
//                             className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"
//                         />
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Section Pourquoi nous */}
//             <section ref={whyUsRef} className="py-20 px-8 max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//                     {/* Texte à gauche */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -80 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 1, ease: "easeOut" }}
//                         viewport={{ once: false, margin: "-20%" }}
//                         className="space-y-6"
//                     >
//                         <motion.h2
//                             className="text-6xl font-bold text-white"
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             Pourquoi nous ?
//                         </motion.h2>
//                         <motion.p
//                             className="text-xl text-gray-300 leading-relaxed"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                         >
//                             Nous combinons expertise technique, créativité débordante et passion
//                             authentique pour transformer vos idées en réalités exceptionnelles.
//                         </motion.p>
//                         <motion.p
//                             className="text-lg text-gray-400"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.6 }}
//                         >
//                             Chaque projet est une nouvelle aventure où nous investissons notre
//                             savoir-faire pour dépasser vos attentes.
//                         </motion.p>
//                     </motion.div>

//                     {/* Cercle animé à droite */}
//                     <motion.div
//                         className="flex justify-center"
//                         initial={{ opacity: 0, scale: 0 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
//                         viewport={{ once: false, margin: "-20%" }}
//                     >
//                         <motion.div
//                             style={{ rotate: circleRotate }}
//                             className="relative w-80 h-80 rounded-full border-2 border-white/20 flex items-center justify-center"
//                         >
//                             <div className="absolute inset-6 rounded-full border border-white/15" />
//                             <div className="absolute inset-12 rounded-full border border-white/10" />
//                             <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
//                             >
//                                 Read More
//                             </motion.button>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Section Valeurs - 6 éléments en 3 lignes de 2 */}
//             <section ref={valuesRef} className="py-20 px-8 max-w-7xl mx-auto">
//                 <motion.h2
//                     className="text-5xl text-start font-bold text-center mb-16 text-white"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 1 }}
//                 >
//                     Revelons Nos Valeurs Ajoutes
//                 </motion.h2>

//                 <div className="flex flex-col gap-y-24">
//                     {valuesData.map((value, index) => (
//                         <ValueItem key={value.id} value={value} index={index} />
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// const ValueItem = ({ value, index }) => {
//     const itemRef = useRef(null);
//     const isInView = useInView(itemRef, { once: false, margin: "-15%" });
//     // Déterminer si image1 est la grande selon l'index
//     const isLeftBig = index % 2 === 0;

//     // Définir les hauteurs dynamiquement - AMÉLIORÉ POUR RESPONSIVE
//     const leftHeight = isLeftBig
//         ? "h-[16rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem]"
//         : "h-[12rem] sm:h-[13rem] md:h-[14rem] lg:h-[15rem]";
//     const rightHeight = isLeftBig
//         ? "h-[12rem] sm:h-[13rem] md:h-[14rem] lg:h-[15rem]"
//         : "h-[16rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem]";

//     const { scrollYProgress } = useScroll({
//         target: itemRef,
//         offset: ["start end", "end start"]
//     });

//     // Parallax Reveal
//     const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
//     const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);

//     // Scroll Masking avec clipPath
//     const clipPath1 = useTransform(
//         scrollYProgress,
//         [0, 0.2, 0.8, 1],
//         [
//             "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
//         ]
//     );

//     const clipPath2 = useTransform(
//         scrollYProgress,
//         [0, 0.3, 0.7, 1],
//         [
//             "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
//         ]
//     );

//     return (
//         <motion.div
//             ref={itemRef}
//             className="relative"
//         >
//             {/* Container des 2 images côte à côte - remplissent toute la largeur */}
//             <div className="flex flex-col md:flex-row gap-6 w-full">
//                 {/* Image 1 */}
//                 <motion.div
//                     style={{ y: y1, clipPath: clipPath1 }}
//                     className={`flex-[3] relative ${leftHeight}`}
//                 >
//                     <motion.img
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.8, delay: index * 0.1 }}
//                         src={value.image1}
//                         alt={`${value.title} image 1`}
//                         className={`w-full object-cover rounded-xl shadow-xl ${leftHeight}`}
//                     />
//                     {/* Layered Scroll Reveal - Overlay graduel */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 1.1 }}
//                         animate={isInView ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 1.1 }}
//                         transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
//                         className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 rounded-xl"
//                     />
//                 </motion.div>

//                 {/* Image 2 - Plus petite, décalée verticalement */}
//                 <motion.div
//                     style={{ y: y2, clipPath: clipPath2 }}
//                     className={`flex-[2] relative mt-12 ${rightHeight}`}
//                 >
//                     <motion.img
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
//                         src={value.image2}
//                         alt={`${value.title} image 2`}
//                         className={`w-full object-cover rounded-xl shadow-xl ${rightHeight}`}
//                     />
//                     {/* Layered Scroll Reveal - Overlay graduel */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 1.1 }}
//                         animate={isInView ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 1.1 }}
//                         transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
//                         className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 rounded-xl"
//                     />
//                 </motion.div>
//             </div>

//             {/* Texte aligné selon quelle image est la plus grande - CORRIGÉ */}
//             {/* Texte aligné selon l'image principale */}
//             <div className={`flex flex-col md:flex-row w-full mt-6 ${isLeftBig ? "justify-start" : "justify-end"}`}>
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
//                     className={`max-w-sm ${isLeftBig ? "md:text-left" : "md:text-right"}`}
//                 >
//                     <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
//                     <p className="text-gray-300 text-sm leading-relaxed">{value.text}</p>
//                 </motion.div>
//             </div>

//         </motion.div>
//     );
// };

// export default ValuesSection;



import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FloatingParticles } from "./FloatingParticles";
export function ValuesSection() {
    const containerRef = useRef(null);
    const imagesRef = useRef(null);
    const whyUsRef = useRef(null);
    const valuesRef = useRef(null);

    const { scrollYProgress: imagesScroll } = useScroll({
        target: imagesRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: whyUsScroll } = useScroll({
        target: whyUsRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects pour les images du haut
    const y1 = useTransform(imagesScroll, [0, 1], [0, -120]);
    const y2 = useTransform(imagesScroll, [0, 1], [0, -180]);
    const circleRotate = useTransform(whyUsScroll, [0, 1], [0, 360]);

    const valuesData = [
        {
            id: 1,
            title: "Innovation",
            text: "Créativité sans limites pour repousser les frontières",
            image1: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 2,
            title: "Excellence",
            text: "Qualité irréprochable dans chaque détail",
            image1: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 3,
            title: "Collaboration",
            text: "Force collective pour des résultats exceptionnels",
            image1: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            title: "Durabilité",
            text: "Impact positif pour construire l'avenir",
            image1: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 5,
            title: "Adaptation",
            text: "Flexibilité pour évoluer avec les défis",
            image1: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 6,
            title: "Passion",
            text: "Énergie contagieuse dans chaque projet",
            image1: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=800",
            image2: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    return (
        <div ref={containerRef} className="bg-black text-white">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <FloatingParticles />
            </div>
            {/* Section 2 grandes images côte à côte */}
            <section ref={imagesRef} className="relative min-h-screen flex items-center px-8 py-16">
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white text-7xl font-bold"
                    >
                        Portés par une vision
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-gray-300 mt-4 text-xl"
                    >
                        , guidés par l’impact.
                    </motion.p>
                </div>
                <div className="w-full max-w-7xl mx-auto flex gap-8">
                    {/* Image 1 - Plus large, alignée en haut */}
                    <motion.div className="flex-[3] relative">
                        <motion.img
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: false }}
                            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900"
                            alt="Grande image principale"
                            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                        />
                    </motion.div>

                    {/* Image 2 - Plus petite, décalée vers le bas */}
                    <motion.div
                        style={{ y: y2 }}
                        className="flex-[2] relative mt-20"
                    >
                        <motion.img
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                            }}
                            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: false, margin: "-10%" }}
                            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=700"
                            alt="Image secondaire"
                            className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                        />
                        {/* Overlay gradient pour effet layered */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.3 }}
                            transition={{ duration: 2, delay: 0.9 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section Pourquoi nous */}
            <section ref={whyUsRef} className="py-20 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Texte à gauche */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: false, margin: "-20%" }}
                        className="space-y-6"
                    >
                        <motion.h2
                            className="text-6xl font-bold text-white"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Pourquoi nous ?
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Nous combinons expertise technique, créativité débordante et passion
                            authentique pour transformer vos idées en réalités exceptionnelles.
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-400"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Chaque projet est une nouvelle aventure où nous investissons notre
                            savoir-faire pour dépasser vos attentes.
                        </motion.p>
                    </motion.div>

                    {/* Cercle animé à droite */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: false, margin: "-20%" }}
                    >
                        <motion.div
                            style={{ rotate: circleRotate }}
                            className="relative w-80 h-80 rounded-full border-2 border-white/20 flex items-center justify-center"
                        >
                            <div className="absolute inset-6 rounded-full border border-white/15" />
                            <div className="absolute inset-12 rounded-full border border-white/10" />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
                            >
                                Read More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section Valeurs avec Sticky Scroll Effect */}
            <div className="relative">

                <motion.h2
                    className="text-5xl font-bold text-center py-20 text-white sticky top-0 z-10 bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Révélons Nos Valeurs Ajoutées
                </motion.h2>

                {/* Container pour l'effet sticky scroll */}
                <div className="relative">
                    {valuesData.map((value, index) => (
                        <StickyValueItem key={value.id} value={value} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const StickyValueItem = ({ value, index }) => {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: false, margin: "-15%" });

    // Alternance de layout - GARDE VOTRE DISPOSITION EXACTE
    const isLeftBig = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    // Effet de disparition propre - l'élément disparaît complètement quand le suivant arrive
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);

    // Parallax subtil pour les images - GARDE VOS EFFETS
    const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <motion.div
            ref={itemRef}
            className="sticky top-0 h-screen flex items-center justify-center px-8 bg-black"
            style={{
                opacity,
                scale,
                zIndex: 10 + index
            }}
        >
            {/* Contenu principal */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    {/* <FloatingParticles /> */}
                </div>
                <div className="flex flex-col gap-y-24">
                    {/* Container des 2 images côte à côte - GARDE VOTRE DISPOSITION */}
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                        {/* Image 1 */}
                        <motion.div
                            style={{ y: y1 }}
                            className={`${isLeftBig ? 'flex-[3]' : 'flex-[2]'} relative`}
                        >
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                src={value.image1}
                                alt={`${value.title} image 1`}
                                className={`w-full object-cover rounded-xl shadow-xl ${isLeftBig
                                    ? 'h-[16rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem]'
                                    : 'h-[12rem] sm:h-[13rem] md:h-[14rem] lg:h-[15rem]'
                                    }`}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
                                transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
                                className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 rounded-xl"
                            />
                        </motion.div>

                        {/* Image 2 - Plus petite, décalée verticalement */}
                        <motion.div
                            style={{ y: y2 }}
                            className={`${isLeftBig ? 'flex-[2]' : 'flex-[3]'} relative mt-12`}
                        >
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                                src={value.image2}
                                alt={`${value.title} image 2`}
                                className={`w-full object-cover rounded-xl shadow-xl ${isLeftBig
                                    ? 'h-[12rem] sm:h-[13rem] md:h-[14rem] lg:h-[15rem]'
                                    : 'h-[16rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem]'
                                    }`}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
                                transition={{ duration: 1.2, delay: index * 0.1 + 0.5 }}
                                className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50 rounded-xl"
                            />
                        </motion.div>
                    </div>

                    {/* Texte aligné selon quelle image est la plus grande - GARDE VOTRE LOGIQUE */}
                    <div className={`flex flex-col md:flex-row w-full ${isLeftBig ? "justify-start" : "justify-end"}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                            className={`max-w-sm ${isLeftBig ? "md:text-left" : "md:text-right"}`}
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{value.text}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ValuesSection;