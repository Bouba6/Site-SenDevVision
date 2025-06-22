import React, { useState, useEffect } from 'react';

export function ProcedureSection() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const procedureSteps = [
        {
            id: 1,
            title: "Planification",
            description: "Planification stratégique et analyse des besoins pour définir le périmètre et les objectifs du projet",
            phase: "DÉCOUVERTE",
            duration: "1 à 2 semaines",
            icon: "📋",
            color: "#3B82F6"
        },
        {
            id: 2,
            title: "Conception",
            description: "Conception UI/UX et planification de l’architecture pour une expérience utilisateur optimale",
            phase: "CONCEPTION",
            duration: "2 à 3 semaines",
            icon: "🎨",
            color: "#8B5CF6"
        },
        {
            id: 3,
            title: "Développement",
            description: "Développement full-stack avec des technologies modernes et les meilleures pratiques",
            phase: "CONSTRUCTION",
            duration: "4 à 8 semaines",
            icon: "⚡",
            color: "#10B981"
        },
        {
            id: 4,
            title: "Tests",
            description: "Tests complets et assurance qualité pour garantir des performances parfaites",
            phase: "VALIDATION",
            duration: "1 à 2 semaines",
            icon: "🔍",
            color: "#F59E0B"
        },
        {
            id: 5,
            title: "Lancement",
            description: "Déploiement et mise en ligne avec un support et un suivi continus",
            phase: "DÉPLOIEMENT",
            duration: "1 semaine",
            icon: "🚀",
            color: "#EF4444"
        }
    ];


    // Auto-advance animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => (prev + 1) % procedureSteps.length);
                setIsAnimating(false);
            }, 500);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black min-h-screen py-8 md:py-20 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, #000 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* En-tête */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-16 relative z-10">
                <div className="text-center">
                    <span className="text-sm font-semibold text-white tracking-wider uppercase mb-4 block">
                        Notre Processus
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                        De l'idée au
                        <span className="bg-white bg-clip-text text-transparent">
                            {" "}lancement
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
                        Découvrez notre processus fluide alors que nous transformons votre vision en réalité,
                        étape par étape avec précision et expertise.
                    </p>
                </div>
            </div>


            {/* Desktop Layout - Staircase */}
            <div className="hidden md:block w-full max-w-7xl mx-auto px-4 md:px-8 relative">
                <div className="flex justify-center">
                    <div className="relative h-[500px] flex items-end justify-center">
                        <div className="relative">
                            {procedureSteps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="absolute transition-all duration-600"
                                    style={{
                                        left: `${(index - 2) * 140}px`, // Centré autour de 0
                                        bottom: `${index * 60}px`,
                                        opacity: 1,
                                        transform: `translateY(0px)`,
                                    }}
                                >
                                    {/* Step Platform */}
                                    <div
                                        className="relative transition-all duration-300"
                                        style={{
                                            transform: currentStep >= index ? 'scale(1)' : 'scale(0.95)',
                                        }}
                                    >
                                        {/* Main step */}
                                        <div
                                            className={`w-32 h-16 rounded-lg shadow-lg transition-all duration-500 ${currentStep >= index
                                                ? 'bg-white border-2 shadow-xl'
                                                : 'bg-gray-100 border border-gray-200'
                                                }`}
                                            style={{
                                                borderColor: currentStep >= index ? step.color : undefined,
                                                boxShadow: currentStep >= index
                                                    ? `0 10px 30px ${step.color}20`
                                                    : undefined
                                            }}
                                        >
                                            {/* Step number */}
                                            <div
                                                className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                                                style={{ backgroundColor: step.color }}
                                            >
                                                {step.id}
                                            </div>

                                            {/* Step icon */}
                                            <div className="absolute bottom-2 right-2 text-2xl">
                                                {step.icon}
                                            </div>
                                        </div>

                                        {/* Connecting line to next step */}
                                        {index < procedureSteps.length - 1 && (
                                            <div
                                                className="absolute top-16 left-16 w-0.5 h-12 bg-gray-300 origin-bottom transition-all duration-500"
                                                style={{
                                                    transform: `scaleY(${currentStep > index ? 1 : 0})`,
                                                    backgroundColor: currentStep > index ? step.color : '#D1D5DB'
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Floating milestone card */}
                                    {currentStep >= index && (
                                        <div
                                            className="absolute -top-32 -left-8 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-10 transition-all duration-400"
                                            style={{
                                                boxShadow: `0 20px 40px ${step.color}15`,
                                                opacity: currentStep >= index ? 1 : 0,
                                                transform: currentStep >= index ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                                            }}
                                        >
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: step.color }}
                                                />
                                                <span
                                                    className="text-xs font-semibold uppercase tracking-wider"
                                                    style={{ color: step.color }}
                                                >
                                                    {step.phase}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-1 text-base">
                                                {step.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-2">
                                                {step.duration}
                                            </div>

                                            {/* Card pointer */}
                                            <div
                                                className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"
                                                style={{
                                                    boxShadow: `2px 2px 5px ${step.color}10`
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Climbing Character - Desktop */}
                            <div
                                className="absolute w-16 h-16 z-20 transition-all duration-1200 ease-out"
                                style={{
                                    left: `${(currentStep - 2) * 140 + 6}px`,
                                    bottom: `${currentStep * 60 + 12}px`,
                                }}
                            >
                                <div
                                    className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                                    style={{
                                        animation: isAnimating
                                            ? 'bounce 0.6s ease-in-out, wiggle 0.6s ease-in-out'
                                            : 'float 2s ease-in-out infinite',
                                    }}
                                >
                                    <div
                                        className="text-2xl"
                                        style={{
                                            transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
                                            transition: 'transform 0.3s',
                                        }}
                                    >
                                        🚶‍♂️
                                    </div>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{
                                            animation: 'shine 2s ease-in-out infinite 3s',
                                        }}
                                    />
                                </div>
                                <div
                                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-400/30 rounded-full blur-sm"
                                    style={{
                                        animation: isAnimating
                                            ? 'shadowBounce 0.6s ease-in-out'
                                            : 'shadowFloat 2s ease-in-out infinite',
                                    }}
                                />
                                {isAnimating && (
                                    <div className="absolute inset-0">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                                style={{
                                                    left: `${Math.random() * 60}px`,
                                                    top: `${Math.random() * 60}px`,
                                                    animation: `particle 1s ease-out ${i * 0.1}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Progress indicator - Desktop */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="flex justify-center space-x-2">
                                {procedureSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: index <= currentStep ? '24px' : '6px',
                                            backgroundColor: index <= currentStep ? step.color : '#E5E7EB',
                                            transform: index === currentStep ? 'scale(1.2)' : 'scale(1)',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Zigzag */}
            <div className="md:hidden w-full px-4 relative">
                <div className="max-w-sm mx-auto">
                    {procedureSteps.map((step, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={step.id} className="relative mb-16">
                                {/* Step Container */}
                                <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                    {/* Step Circle */}
                                    <div
                                        className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-500 ${currentStep >= index ? 'bg-white border-4' : 'bg-gray-100 border-2 border-gray-200'
                                            }`}
                                        style={{
                                            borderColor: currentStep >= index ? step.color : undefined,
                                            boxShadow: currentStep >= index ? `0 8px 25px ${step.color}30` : undefined,
                                            transform: currentStep >= index ? 'scale(1.1)' : 'scale(1)',
                                        }}
                                    >
                                        {/* Step Number */}
                                        <div
                                            className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                            style={{ backgroundColor: step.color }}
                                        >
                                            {step.id}
                                        </div>

                                        {/* Step Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center text-2xl">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Step Info Card */}
                                    <div
                                        className={`w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-4 transition-all duration-500 ${isLeft ? 'ml-6' : 'mr-6'
                                            }`}
                                        style={{
                                            opacity: currentStep >= index ? 1 : 0.7,
                                            transform: currentStep >= index ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                                            boxShadow: currentStep >= index ? `0 15px 35px ${step.color}15` : undefined,
                                        }}
                                    >
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: step.color }}
                                            />
                                            <span
                                                className="text-xs font-semibold uppercase tracking-wider"
                                                style={{ color: step.color }}
                                            >
                                                {step.phase}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1 text-sm">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                            {step.description}
                                        </p>
                                        <div className="text-xs text-gray-500">
                                            {step.duration}
                                        </div>
                                    </div>
                                </div>

                                {/* Connecting Line */}
                                {index < procedureSteps.length - 1 && (
                                    <div
                                        className={`absolute top-16 w-0.5 h-12 transition-all duration-500 ${isLeft ? 'left-8' : 'right-8'
                                            }`}
                                        style={{
                                            backgroundColor: currentStep > index ? step.color : '#E5E7EB',
                                            transform: `scaleY(${currentStep > index ? 1 : 0.3})`,
                                        }}
                                    />
                                )}

                                {/* Character Animation */}
                                {currentStep === index && (
                                    <div
                                        className={`absolute top-20 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-1000 ${isLeft ? 'left-6' : 'right-6'
                                            }`}
                                        style={{
                                            animation: isAnimating ? 'bounce 0.6s ease-in-out' : 'float 2s ease-in-out infinite',
                                        }}
                                    >
                                        <div className="text-lg">🚶‍♂️</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Progress Indicator - Mobile */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {procedureSteps.map((step, index) => (
                            <div
                                key={index}
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: index <= currentStep ? '20px' : '6px',
                                    backgroundColor: index <= currentStep ? step.color : '#E5E7EB',
                                    transform: index === currentStep ? 'scale(1.2)' : 'scale(1)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(-1px); }
                    50% { transform: translateY(1px); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(-2px) rotate(0deg); }
                    25% { transform: translateY(-8px) rotate(5deg); }
                    75% { transform: translateY(-2px) rotate(-5deg); }
                }
                
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(5deg); }
                    75% { transform: rotate(-5deg); }
                }

                @keyframes shadowFloat {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    50% { transform: translateX(-50%) scale(1.05); }
                }
                
                @keyframes shadowBounce {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    50% { transform: translateX(-50%) scale(1.2); }
                }

                @keyframes shine {
                    0% { transform: translateX(-100px); }
                    20% { transform: translateX(100px); }
                    100% { transform: translateX(100px); }
                }

                @keyframes particle {
                    0% { opacity: 0; transform: scale(0) translateY(0); }
                    50% { opacity: 1; transform: scale(1) translateY(-15px); }
                    100% { opacity: 0; transform: scale(0) translateY(-30px); }
                }
            `}</style>
        </div>
    );
}

export default ProcedureSection;