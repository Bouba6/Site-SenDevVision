import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/img/Logo.png'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-blue-500/30' : 'bg-transparent'
                }`}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center">
                                <img src={Logo} alt="" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] bg-clip-text text-transparent">
                                SenDevVision
                            </span>
                        </div>

                        {/* Navigation desktop */}
                        <nav className="hidden md:flex space-x-8">
                            {['Accueil', 'Services', 'Portfolio', 'À Propos', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href= {item.toLowerCase()}
                                    className="text-[var(--color-quaternary)] hover:text-[var(--color-quaternary)] transition-colors duration-300 relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </nav>

                        {/* Bouton burger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white hover:text-blue-400 transition-colors z-60"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                        ? 'max-h-80 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    } bg-black/95 backdrop-blur-lg border-t border-blue-500/30`}>
                    <nav className="container mx-auto px-6 py-4">
                        <div className="flex flex-col space-y-4">
                            {['Accueil', 'Services', 'Portfolio', 'À Propos', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-[var(--color-quaternary)] hover:text-[var(--color-primary)] transition-colors duration-300 py-2 border-b border-gray-800/50 last:border-b-0"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default Header;