import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Sun, Cloud, Check, StickyNote, Timer, DollarSign, CheckCircle2 } from 'lucide-react';

// Floating Widget Card Component
const FloatingWidget: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    scrollY: MotionValue<number>;
    baseY: number;
    speedY: number;
    speedX: number; // Positive = move right, Negative = move left
    delay?: number;
    heroRef?: React.RefObject<HTMLHeadingElement | null>;
}> = ({ children, className = '', style, scrollY, baseY, speedY, speedX, delay = 0, heroRef }) => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const [isOverlapping, setIsOverlapping] = useState(false);
    const y = useTransform(scrollY, [0, 600], [baseY, baseY + speedY]);
    const x = useTransform(scrollY, [0, 600], [0, speedX]);
    const scrollOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const scale = useTransform(scrollY, [0, 600], [1, 0.8]);

    // Check for overlap with hero text
    useEffect(() => {
        const checkOverlap = () => {
            if (!widgetRef.current || !heroRef?.current) return;

            const widgetRect = widgetRef.current.getBoundingClientRect();
            const heroRect = heroRef.current.getBoundingClientRect();

            // Check if bounding boxes intersect
            const overlap = !(
                widgetRect.right < heroRect.left ||
                widgetRect.left > heroRect.right ||
                widgetRect.bottom < heroRect.top ||
                widgetRect.top > heroRect.bottom
            );

            setIsOverlapping(overlap);
        };

        checkOverlap();
        window.addEventListener('scroll', checkOverlap);
        window.addEventListener('resize', checkOverlap);

        return () => {
            window.removeEventListener('scroll', checkOverlap);
            window.removeEventListener('resize', checkOverlap);
        };
    }, [heroRef]);

    return (
        <motion.div
            ref={widgetRef}
            style={{ y, x, opacity: isOverlapping ? 0 : scrollOpacity, scale, ...style }}
            initial={{ opacity: 0, y: baseY + 50, scale: 0.9 }}
            animate={{ opacity: isOverlapping ? 0 : 1, y: baseY, scale: 1 }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            className={`absolute backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

const StickyNoteWidget = () => (
    <div className="p-6 w-64 h-64 bg-gradient-to-br from-yellow-300/90 to-amber-400/90 rounded-2xl shadow-lg transform -rotate-3">
        <div className="text-amber-900/80 text-sm font-medium mb-3 flex items-center gap-1.5">
            <StickyNote size={14} />
            Quick Note
        </div>
        <div className="text-amber-900/90 text-base font-handwriting leading-relaxed">
            Remember to check the RSS feeds 📰
        </div>
        <div className="absolute bottom-4 right-4 text-amber-700/50 text-xs">
            Today
        </div>
    </div>
);

const TodoWidget = () => (
    <div className="p-6 w-64">
        <div className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            Today's Tasks
        </div>
        <div className="space-y-3">
            {[
                { text: 'Setup Hotpage', done: true },
                { text: 'Customize theme', done: true },
                { text: 'Add RSS feeds', done: false },
            ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 text-sm ${item.done ? 'text-white/50 line-through' : 'text-white/90'}`}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.done ? 'bg-emerald-500/80 border-emerald-400' : 'border-white/30'}`}>
                        {item.done && <Check size={12} className="text-white" />}
                    </div>
                    {item.text}
                </div>
            ))}
        </div>
    </div>
);

const WeatherWidget = () => (
    <div className="p-6 w-56">
        <div className="flex items-center gap-3 mb-3">
            <div className="relative">
                <Sun size={36} className="text-yellow-400" />
                <Cloud size={22} className="text-white/80 absolute -bottom-1 -right-1" />
            </div>
            <div>
                <div className="text-3xl font-light text-white">24°</div>
                <div className="text-xs text-white/60">Istanbul</div>
            </div>
        </div>
        <div className="text-xs text-white/50">Partly Cloudy</div>
    </div>
);

const PomodoroWidget = () => (
    <div className="p-6 w-52 text-center">
        <div className="text-white/60 text-xs mb-3 flex items-center justify-center gap-1.5">
            <Timer size={12} />
            Focus Time
        </div>
        <div className="relative w-20 h-20 mx-auto mb-3">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="url(#pomodoroGradient)" strokeWidth="5" strokeLinecap="round" strokeDasharray="226" strokeDashoffset="56" />
                <defs>
                    <linearGradient id="pomodoroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-medium">18:45</span>
            </div>
        </div>
        <div className="text-xs text-red-400/80">Work Session</div>
    </div>
);

const CurrenciesWidget = () => (
    <div className="p-6 w-60">
        <div className="text-white/60 text-xs mb-4 flex items-center gap-1.5">
            <DollarSign size={12} />
            Exchange Rates
        </div>
        <div className="space-y-3">
            {[
                { from: 'USD', to: 'EUR', rate: '0.92', trend: '↑' },
                { from: 'JPY', to: 'USD', rate: '156.15', trend: '↓' },
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{item.from}/{item.to}</span>
                    <span className={`font-mono ${item.trend === '↑' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.rate} {item.trend}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

// Main Floating Widgets Container
const FloatingWidgets: React.FC<{ scrollY: MotionValue<number>; heroRef: React.RefObject<HTMLHeadingElement | null> }> = ({ scrollY, heroRef }) => {
    return (
        <div className="hidden xl:block absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Sticky Note - Top Right */}
            <FloatingWidget
                scrollY={scrollY}
                baseY={60}
                speedY={120}
                speedX={150}
                delay={0.1}
                heroRef={heroRef}
                style={{ right: '2%', top: '2%', transform: 'rotate(-6deg) perspective(1000px) rotateY(-5deg)' }}
            >
                <StickyNoteWidget />
            </FloatingWidget>

            {/* Todo - Right Side */}
            <FloatingWidget
                scrollY={scrollY}
                baseY={0}
                speedY={80}
                speedX={180}
                delay={0.2}
                heroRef={heroRef}
                style={{ right: '5%', top: '42%', transform: 'rotate(3deg) perspective(1000px) rotateY(-8deg)' }}
            >
                <TodoWidget />
            </FloatingWidget>

            {/* Weather - Top Left */}
            <FloatingWidget
                scrollY={scrollY}
                baseY={40}
                speedY={100}
                speedX={-150}
                delay={0.15}
                heroRef={heroRef}
                style={{ left: '4%', top: '12%', transform: 'rotate(4deg) perspective(1000px) rotateY(5deg)' }}
            >
                <WeatherWidget />
            </FloatingWidget>

            {/* Pomodoro - Left Middle */}
            <FloatingWidget
                scrollY={scrollY}
                baseY={20}
                speedY={90}
                speedX={-180}
                delay={0.25}
                heroRef={heroRef}
                style={{ left: '8%', top: '42%', transform: 'rotate(-2deg) perspective(1000px) rotateY(8deg)' }}
            >
                <PomodoroWidget />
            </FloatingWidget>

            {/* Currencies - Bottom Right */}
            <FloatingWidget
                scrollY={scrollY}
                baseY={-20}
                speedY={60}
                speedX={120}
                delay={0.3}
                heroRef={heroRef}
                style={{ right: '12%', top: '69%', transform: 'rotate(-4deg) perspective(1000px) rotateY(-6deg)' }}
            >
                <CurrenciesWidget />
            </FloatingWidget>
        </div>
    );
};
import { Star, ShieldCheck, Github, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';



type BrowserType = 'chrome' | 'firefox' | 'zen' | 'edge' | 'opera' | 'other';

interface BrowserInfo {
    type: BrowserType;
    name: string;
    icon: React.ReactNode;
    ctaText: string;
    link: string;
}

// Browser detection
const getBrowser = (): BrowserType => {
    if (typeof navigator === 'undefined') return 'other';
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes('zen')) return 'zen';
    if (ua.includes('edg/')) return 'edge';
    if (ua.includes('opr/') || ua.includes('opera')) return 'opera';
    if (ua.includes('firefox')) return 'firefox';
    if (ua.includes('chrome')) return 'chrome';
    return 'other';
};

// Browser SVG Icons
const ChromeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path fill="currentColor" d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
        <path fill="currentColor" d="M9.566 13.483l-.03-.058l-.074-.127a2.85 2.85 0 1 1 5.039.07l-.037.057l-.07.12a2.848 2.848 0 0 1-4.83-.063" />
        <path fill="currentColor" d="M4.139 7.197a.195.195 0 0 0-.336-.002A9.46 9.46 0 0 0 2.5 12c0 4.462 3.076 8.206 7.224 9.226a.2.2 0 0 0 .216-.092l2.466-4.14l.198-.343c.085-.148-.044-.333-.214-.318a4.35 4.35 0 0 1-4.247-2.32l-1.97-3.406z" />
        <path fill="currentColor" d="m15.675 14.329l-1.978 3.428l-2.051 3.445a.194.194 0 0 0 .161.296L12 21.5a9.5 9.5 0 0 0 9.5-9.5a9.5 9.5 0 0 0-.392-2.71a.2.2 0 0 0-.19-.14h-5.193c-.172 0-.267.205-.168.345c.5.708.793 1.572.793 2.505a4.33 4.33 0 0 1-.675 2.329M12 7.65h8.12c.15 0 .245-.158.172-.29A9.5 9.5 0 0 0 12 2.5a9.47 9.47 0 0 0-6.949 3.022a.2.2 0 0 0-.024.236L7.47 9.852l.2.345c.085.148.31.129.382-.027A4.35 4.35 0 0 1 12 7.65" />
    </svg>
);

const FirefoxIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M6.85 6.74q.015 0 0 0M21.28 8.6c-.43-1.05-1.32-2.18-2.01-2.54c.56 1.11.89 2.22 1.02 3.04v.02c-1.13-2.82-3.05-3.96-4.62-6.44c-.08-.12-.17-.25-.24-.38c-.04-.07-.07-.14-.11-.21c-.06-.13-.12-.26-.15-.4c0-.01-.01-.02-.02-.02h-.03c-2.22 1.3-3.15 3.59-3.38 5.04c-.69.04-1.37.21-1.99.51c-.12.05-.17.19-.13.31c.05.14.21.21.34.15c.54-.26 1.14-.41 1.74-.45h.05c.08-.01.17-.01.25-.01c.5-.01.97.06 1.44.2l.06.02c.1.02.17.06.25.06c.05.04.11.06.16.08l.14.06c.07.03.14.06.2.09c.03.02.06.03.09.05c.07.04.16.07.2.11c.04.02.08.05.12.07c.73.45 1.34 1.07 1.75 1.81c-.53-.37-1.49-.74-2.41-.58c3.6 1.81 2.63 8-2.36 7.76c-.44-.01-.88-.1-1.3-.25c-.1-.03-.2-.07-.29-.12c-.05-.02-.12-.05-.17-.08c-1.23-.63-2.24-1.82-2.38-3.27c0 0 .5-1.73 3.33-1.73c.31 0 1.17-.86 1.2-1.1c0-.09-1.74-.78-2.42-1.45c-.37-.36-.54-.53-.69-.66c-.08-.07-.17-.13-.26-.19a4.63 4.63 0 0 1-.03-2.45C7.6 6.12 6.8 6.86 6.22 7.5c-.4-.5-.37-2.15-.35-2.5c-.01 0-.3.16-.33.18c-.35.25-.68.53-.98.82c-.35.37-.66.74-.94 1.14c-.62.91-1.12 1.95-1.34 3.04c0 .01-.1.41-.17.92l-.03.23c-.02.17-.04.32-.08.58v.41c0 5.53 4.5 10.01 10 10.01c4.97 0 9.08-3.59 9.88-8.33c.02-.11.03-.24.05-.37c.2-1.72-.02-3.52-.65-5.03" />
    </svg>
);

const EdgeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path fill="currentColor" d="M10.184 11.77c.029 1.06.603 2.334 1.956 3.462C13.317 16.212 15.353 17 17 17a7 7 0 0 0 1.669-.2a1 1 0 0 1 1.004 1.613a10 10 0 0 1-6.34 3.499a.8.8 0 0 1-.31-.014C10.884 21.37 8.5 18.688 8.5 16c0-2.374.84-3.645 1.684-4.23m-.706-3.731a3.58 3.58 0 0 1 2.18 1.234a5.2 5.2 0 0 0-1.474.278C8.177 10.221 6.5 12.388 6.5 16c0 2.537 1.199 4.266 2.771 5.623c-3.987-1.129-6.962-4.667-7.248-8.944a.9.9 0 0 1 .21-.642l.17-.196l.324-.358l.267-.281l.149-.154l.332-.333l.378-.369l.208-.197c1.91-1.803 3.9-2.368 5.417-2.11M12 2c4.76 0 8.742 3.325 9.752 7.779c.36 1.585-.113 2.825-.827 3.688a5.03 5.03 0 0 1-2.09 1.476c-.965.341-2.05.327-2.912.176c-.77-.135-1.73-.395-2.203-1.072a1 1 0 0 1 .109-1.277c.485-.49.709-.995.742-1.447a2 2 0 0 0-.045-.54c-.582-2.62-2.386-4.321-4.713-4.716c-2.76-.469-5.379.957-7.315 2.808C3.81 4.883 7.568 2 12 2" />
    </svg>
);

const ZenIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12m-12 9.846c5.438 0 9.846-4.408 9.846-9.846S17.438 2.154 12 2.154S2.154 6.562 2.154 12S6.562 21.846 12 21.846M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0m-8 6.462a6.462 6.462 0 1 0 0-12.924a6.462 6.462 0 0 0 0 12.924m0-1.847a4.615 4.615 0 1 0 0-9.23a4.615 4.615 0 0 0 0 9.23M15.692 12a3.692 3.692 0 1 1-7.384 0a3.692 3.692 0 0 1 7.384 0" />
    </svg>
);

const OperaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M8.71 6.365c-1.107 1.305-1.822 3.236-1.872 5.4v.47c.051 2.165.765 4.093 1.872 5.4c1.434 1.862 3.566 3.044 5.95 3.044a7.2 7.2 0 0 0 4.005-1.226a9.94 9.94 0 0 1-7.139 2.535A10 10 0 0 1 2.001 12c0-5.524 4.477-10 10-10h.038a9.97 9.97 0 0 1 6.627 2.546a7.24 7.24 0 0 0-4.008-1.226c-2.382 0-4.514 1.183-5.95 3.045zM22.001 12a9.97 9.97 0 0 1-3.335 7.454c-2.565 1.25-4.955.376-5.747-.17c2.52-.554 4.423-3.6 4.423-7.284c0-3.685-1.903-6.73-4.423-7.283c.791-.545 3.182-1.42 5.747-.171A9.97 9.97 0 0 1 22.001 12" /></svg>
);

const GlobalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M2.05 13h5.477a17.9 17.9 0 0 0 2.925 8.88A10.005 10.005 0 0 1 2.049 13m0-2a10.005 10.005 0 0 1 8.402-8.881a17.9 17.9 0 0 0-2.925 8.88zm19.9 0h-5.477a17.9 17.9 0 0 0-2.925-8.881a10.005 10.005 0 0 1 8.403 8.88m0 2a10.005 10.005 0 0 1-8.402 8.88A17.9 17.9 0 0 0 16.473 13zM9.53 13h4.94A15.9 15.9 0 0 1 12 20.592A15.9 15.9 0 0 1 9.53 13m0-2A15.9 15.9 0 0 1 12 3.408A15.9 15.9 0 0 1 14.47 11z" /></svg>
);

const getBrowserInfo = (browser: BrowserType): BrowserInfo => {
    const browsers: Record<BrowserType, BrowserInfo> = {
        chrome: {
            type: 'chrome',
            name: 'Chrome',
            icon: <ChromeIcon />,
            ctaText: 'Add to Chrome',
            link: 'https://chromewebstore.google.com/detail/hotpage-customizable-home/ikfpbpapkibdkponpnfeedlfmfdkgmof?hl=en'
        },
        firefox: {
            type: 'firefox',
            name: 'Firefox',
            icon: <FirefoxIcon />,
            ctaText: 'Add to Firefox',
            link: 'https://addons.mozilla.org/en-US/firefox/addon/hotpage-customizable-homepage/'
        },
        zen: {
            type: 'zen',
            name: 'Zen',
            icon: <ZenIcon />,
            ctaText: 'Add to Zen',
            link: 'https://addons.mozilla.org/en-US/firefox/addon/hotpage-customizable-homepage/'
        },
        edge: {
            type: 'edge',
            name: 'Edge',
            icon: <EdgeIcon />,
            ctaText: 'Add to Edge',
            link: 'https://chromewebstore.google.com/detail/hotpage-customizable-home/ikfpbpapkibdkponpnfeedlfmfdkgmof?hl=en'
        },
        opera: {
            type: 'opera',
            name: 'Opera',
            icon: <OperaIcon />,
            ctaText: 'Add to Opera',
            link: 'https://chromewebstore.google.com/detail/hotpage-customizable-home/ikfpbpapkibdkponpnfeedlfmfdkgmof?hl=en'
        },
        other: {
            type: 'other',
            name: 'Browser',
            icon: <GlobalIcon />,
            ctaText: 'Install Extension',
            link: 'https://chromewebstore.google.com/detail/hotpage-customizable-home/ikfpbpapkibdkponpnfeedlfmfdkgmof?hl=en'
        },
    };
    return browsers[browser] as BrowserInfo;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 100,
            damping: 12,
        },
    },
};

// SVG Filter Text Morphing Component - gooey blur threshold effect
const TextMorph: React.FC<{ texts: string[] }> = ({ texts }) => {
    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!text1Ref.current || !text2Ref.current || !containerRef.current) return;

        const morphTime = 1;
        const cooldownTime = 2.5;

        let textIndex = texts.length - 1;
        let morph = 0;
        let cooldown = cooldownTime;
        let lastTime = Date.now();
        let animationFrame: number;

        // Initial setup
        text1Ref.current.textContent = texts[textIndex % texts.length];
        text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];

        const doMorph = () => {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        };

        const setMorph = (fraction: number) => {
            if (!text1Ref.current || !text2Ref.current || !containerRef.current) return;

            // Enable blur filter during morph
            containerRef.current.style.filter = 'url(#threshold) blur(0.6px)';

            text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            const inverseFraction = 1 - fraction;
            text1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
            text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;

            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
        };

        const doCooldown = () => {
            if (!text1Ref.current || !text2Ref.current || !containerRef.current) return;

            morph = 0;
            // Disable blur filter during cooldown for crisp text
            containerRef.current.style.filter = 'none';
            text2Ref.current.style.filter = 'none';
            text2Ref.current.style.opacity = '100%';
            text1Ref.current.style.filter = 'none';
            text1Ref.current.style.opacity = '0%';
        };

        const animate = () => {
            animationFrame = requestAnimationFrame(animate);

            const newTime = Date.now();
            const shouldIncrementIndex = cooldown > 0;
            const dt = (newTime - lastTime) / 1000;
            lastTime = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }
                doMorph();
            } else {
                doCooldown();
            }
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [texts]);

    return (
        <>
            {/* SVG Filter Definition */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Morphing Text Container */}
            <div
                ref={containerRef}
                className="relative h-[1.2em] flex items-center justify-center"
            >
                <span
                    ref={text1Ref}
                    className="absolute text-blue-400 whitespace-nowrap"
                    style={{ opacity: 0 }}
                />
                <span
                    ref={text2Ref}
                    className="absolute text-blue-400 whitespace-nowrap"
                />
            </div>
        </>
    );
};

export const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const [browser, setBrowser] = useState<BrowserType>('other');
    const [releaseVersion, setReleaseVersion] = useState<string | null>(null);
    const [badgeHovered, setBadgeHovered] = useState(false);
    const [badgeClicked, setBadgeClicked] = useState(false);
    const heroRef = useRef<HTMLHeadingElement>(null);

    // Detect browser
    useEffect(() => {
        setBrowser(getBrowser());
    }, []);

    // Fetch GitHub release version
    useEffect(() => {
        fetch('https://api.github.com/repos/enesehs/Hotpage/releases/latest')
            .then(res => res.json())
            .then(data => {
                if (data.tag_name) {
                    setReleaseVersion(data.tag_name);
                }
            })
            .catch(() => setReleaseVersion('v1.0.0'));
    }, []);

    const browserInfo = getBrowserInfo(browser);

    const getCtaText = (type: BrowserType) => {
        switch (type) {
            case 'chrome': return t.hero.cta.chrome;
            case 'firefox': return t.hero.cta.firefox;
            case 'edge': return t.hero.cta.edge;
            case 'opera': return t.hero.cta.opera;
            case 'zen': return t.hero.cta.zen;
            default: return t.hero.cta.other;
        }
    };

    const handleBadgeClick = () => {
        setBadgeClicked(true);
        setTimeout(() => setBadgeClicked(false), 600);
        window.open('https://github.com/enesehs/Hotpage', '_blank');
    };

    const { scrollY } = useScroll();

    return (
        <main id="features" className="relative flex flex-col items-center justify-center pt-32 md:pt-48 pb-32 text-center overflow-hidden">
            {/* Floating Widgets - Desktop Only */}
            <FloatingWidgets scrollY={scrollY} heroRef={heroRef} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center max-w-7xl mx-auto"
                >
                    {/* GitHub Badge with Hover/Click Animations */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <motion.button
                            onClick={handleBadgeClick}
                            onMouseEnter={() => setBadgeHovered(true)}
                            onMouseLeave={() => setBadgeHovered(false)}
                            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm shadow-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            animate={badgeClicked ? {
                                boxShadow: ['0 0 0 0 rgba(96,165,250,0)', '0 0 0 8px rgba(96,165,250,0.3)', '0 0 0 16px rgba(96,165,250,0)']
                            } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <Github size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="font-medium">{releaseVersion || 'v1.0.0'}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{t.hero.badge.released}</span>
                            <motion.svg
                                className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors"
                                viewBox="0 0 12 12"
                                fill="none"
                                animate={badgeHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </motion.button>
                    </motion.div>

                    {/* Headline with Text Morphing */}
                    <motion.h1 ref={heroRef} variants={itemVariants} className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                        <span className="text-white">{t.hero.headline.prefix}</span> <br className="hidden md:block" />
                        <div className="h-[1.2em] flex justify-center items-center">
                            <TextMorph texts={t.hero.morphText} />
                        </div>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        {t.hero.subheadline.part1} <span className="text-white font-medium">{t.hero.subheadline.part2}</span>
                    </motion.p>

                    {/* Elegant CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
                            {/* Primary Button - Elegant & Slim */}
                            <motion.a
                                id="hero-download-btn"
                                href={browserInfo.link}
                                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-full transition-all duration-300 w-full sm:w-auto overflow-hidden"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 0 30px rgba(59,130,246,0.4)'
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.span
                                    className="flex items-center gap-2.5 relative z-10"
                                    initial={false}
                                >
                                    <span className="transition-transform group-hover:scale-110">
                                        {browserInfo.icon}
                                    </span>
                                    <span>{getCtaText(browser)}</span>
                                    <span className="text-blue-200 text-xs font-normal">{t.hero.cta.free}</span>
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.a>

                            {/* Secondary Button - Elegant Glass with Glow */}
                            <motion.a
                                href="https://enesehs.dev/Hotpage-Demo"
                                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full overflow-hidden transition-all duration-300 w-full sm:w-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 group-hover:border-white/30 transition-colors rounded-full" />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />

                                <span className="relative z-10 flex items-center gap-2 text-white/90 group-hover:text-white font-medium text-sm">
                                    <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors group-hover:fill-current" />
                                    <span>{t.hero.cta.demo}</span>
                                </span>
                            </motion.a>
                        </div>

                        {/* Enhanced Trust Badge - More Radius */}
                        <motion.div
                            className="flex items-center justify-center gap-5 py-3 px-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm"
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                        >
                            <div className="flex flex-col items-end">
                                <div className="flex gap-0.5 text-yellow-400 mb-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} size={14} fill="currentColor" />
                                    ))}
                                </div>
                                <span className="text-[11px] text-gray-500">5.0/5.0</span>
                            </div>
                            <div className="w-px h-7 bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-blue-400" size={18} />
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-medium text-white">Chrome Web Store</span>
                                    <span className="text-[10px] text-gray-500">Featured Extension</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Risk Reversal */}
                        <p className="text-xs text-gray-500">
                            {t.hero.risk}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
};
