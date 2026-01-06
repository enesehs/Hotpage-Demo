import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Star, ChevronDown, Zap, Eye, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { languageNames, languageFlags, type Language } from '../i18n/translations';

export const FloatingHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);
    const { t, language, setLanguage } = useLanguage();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsLangOpen(false);
    };


    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring' as const, stiffness: 80, damping: 15 }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
            >
                <div className="relative rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-indigo-900/20">
                    <div className="px-4 md:px-8 h-14 flex items-center justify-center gap-4 md:gap-8">
                        {/* Logo */}
                        <img
                            src={`${import.meta.env.BASE_URL}header-logo.webp`}
                            alt="Hotpage"
                            className="h-10 md:h-16 w-auto"
                            style={{ opacity: 0.5 }}
                        />

                        {/* Divider - Hidden on mobile */}
                        <div className="hidden md:block w-px h-5 bg-white/10" />

                        {/* Nav Links - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
                            <button
                                onClick={() => document.getElementById('features-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.features}
                            </button>
                            <a
                                href="https://enesehs.dev/Hotpage-Demo"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.preview}
                            </a>
                            <button
                                onClick={() => document.getElementById('hero-download-btn')?.click()}
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.download}
                            </button>
                            <a
                                href="https://github.com/enesehs/Hotpage"
                                className="hover:text-white transition-colors"
                            >
                                {t.nav.docs}
                            </a>
                        </div>

                        {/* Divider - Hidden on mobile */}
                        <div className="hidden md:block w-px h-5 bg-white/10" />

                        {/* Language Dropdown */}
                        <div ref={langRef} className="hidden md:block relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5 backdrop-blur-xl"
                            >
                                <span className="text-base">{languageFlags[language]}</span>
                                <span className="uppercase text-xs font-medium">{language}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full mt-2 right-0 w-44 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-900/20 z-50"
                                    >
                                        {(Object.keys(languageNames) as Language[]).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => handleLanguageChange(lang)}
                                                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-200 ${language === lang
                                                    ? 'text-white bg-white/10'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span className="text-base">{languageFlags[lang]}</span>
                                                <span className="text-xs font-medium">{languageNames[lang]}</span>
                                                {language === lang && (
                                                    <span className="ml-auto text-indigo-400 text-xs">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Divider - Hidden on mobile */}
                        <div className="hidden md:block w-px h-5 bg-white/10" />

                        {/* GitHub - Give us a star */}
                        <a
                            href="https://github.com/enesehs/Hotpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex group relative items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <Github size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{t.nav.starOnGithub}</span>
                            <div className="w-px h-3 bg-white/10 mx-1" />
                            <Star
                                size={14}
                                className="text-yellow-500 fill-yellow-500/20 group-hover:fill-yellow-500 group-hover:rotate-[72deg] transition-all duration-500"
                            />
                        </a>

                        {/* Mobile Menu Button - Animated Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full origin-center"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-center"
                                />
                            </div>
                        </button>
                    </div>
                    {/* Scroll Progress Bar */}
                    <motion.div
                        style={{ scaleX }}
                        className="absolute bottom-0 left-5 right-5 h-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 origin-left rounded-b-full"
                    />
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed top-24 left-4 right-4 z-40 md:hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden"
                    >
                        {/* Gradient accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                        <div className="p-6 space-y-2">
                            {/* Menu Items with staggered animation */}
                            {[
                                { label: t.nav.features, icon: <Zap size={18} />, action: () => { document.getElementById('features-grid')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); } },
                                { label: t.nav.preview, icon: <Eye size={18} />, href: 'https://enesehs.dev/Hotpage-Demo' },
                                { label: t.nav.download, icon: <Download size={18} />, action: () => { document.getElementById('hero-download-btn')?.click(); setIsMenuOpen(false); } },
                                { label: t.nav.docs, icon: <Github size={18} />, href: 'https://github.com/enesehs/Hotpage' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                                        >
                                            <span className="p-2 rounded-lg bg-white/5 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">{item.label}</span>
                                            <ChevronDown size={14} className="ml-auto -rotate-90 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={item.action}
                                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                                        >
                                            <span className="p-2 rounded-lg bg-white/5 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">{item.label}</span>
                                            <ChevronDown size={14} className="ml-auto -rotate-90 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}

                            <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* Mobile Language Selector */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="px-2"
                            >
                                <p className="text-xs text-gray-500 mb-3 px-2">Language</p>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                handleLanguageChange(lang);
                                                setIsMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${language === lang
                                                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'
                                                }`}
                                        >
                                            <span className="text-lg">{languageFlags[lang]}</span>
                                            <span className="text-xs">{lang.toUpperCase()}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* GitHub Star Button */}
                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                href="https://github.com/enesehs/Hotpage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-yellow-500/20 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300 group"
                            >
                                <Github size={18} className="text-gray-300" />
                                <span className="text-gray-200 font-medium">{t.nav.starOnGithub}</span>
                                <Star size={16} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
