import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { X, Check } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ from, to, duration = 1.5, delay = 0, className }: { from: number; to: number; duration?: number; delay?: number; className?: string }) => {
    const nodeRef = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    React.useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;
        const controls = animate(from, to, {
            duration,
            delay,
            ease: "easeOut",
            onUpdate(value) {
                if (node) node.textContent = Math.round(value).toString();
            }
        });
        return () => controls.stop();
    }, [from, to, duration, delay, isInView]);

    return <span ref={nodeRef} className={className}>{from}</span>;
};

import { useLanguage } from '../i18n/LanguageContext';

// Animated strikethrough component
const StrikeThrough: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <span className="relative inline-block">
        <span className="text-red-400/60">{children}</span>
        <motion.span
            className="absolute left-0 top-1/2 h-0.5 bg-red-500"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        />
    </span>
);

// Green highlight component
const GreenHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-green-400 font-medium">{children}</span>
);

// Image Modal Component
const ImageModal: React.FC<{ src: string; alt: string; isOpen: boolean; onClose: () => void }> = ({ src, alt, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-xl bg-[#1a1b1e] border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <img src={src} alt={alt} className="w-full h-auto" />
            </motion.div>
        </div>
    );
};

export const ManifestoSection: React.FC = () => {
    const [modalImage, setModalImage] = React.useState<{ src: string; alt: string } | null>(null);
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <ImageModal
                src={modalImage?.src || ''}
                alt={modalImage?.alt || ''}
                isOpen={!!modalImage}
                onClose={() => setModalImage(null)}
            />

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                        {t.manifesto.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        {t.manifesto.p1}
                    </p>
                </motion.div>

                {/* Main Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* The Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-3xl border border-red-500/10 bg-red-500/5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3 mb-6 text-red-400">
                            <div className="p-2 rounded-lg bg-red-500/10">
                                <X size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-bold">{t.manifesto.problem.title}</h3>
                        </div>
                        <ul className="text-gray-300 text-base leading-relaxed space-y-4">
                            {t.manifesto.problem.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-red-500/40 shrink-0" />
                                    <span><StrikeThrough delay={0.2 + (i * 0.2)}>{item}</StrikeThrough></span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-3xl border border-green-500/10 bg-green-500/5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3 mb-6 text-green-400">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Check size={24} />
                            </div>
                            <h3 className="font-heading text-xl font-bold">{t.manifesto.solution.title}</h3>
                        </div>
                        <ul className="text-gray-300 text-base leading-relaxed space-y-4">
                            {t.manifesto.solution.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-green-400 shrink-0" />
                                    <span><GreenHighlight>{item.highlight}</GreenHighlight> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                        <p className="text-3xl font-bold text-green-400 mb-1">&lt;50ms</p>
                        <p className="text-sm text-gray-400">{t.manifesto.performance.lcp}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                        <p className="text-3xl font-bold text-green-400 mb-1">0</p>
                        <p className="text-sm text-gray-400">{t.manifesto.performance.trackers}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                        <p className="text-3xl font-bold text-green-400 mb-1">100%</p>
                        <p className="text-sm text-gray-400">{t.manifesto.performance.openSource}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                        <p className="text-3xl font-bold text-green-400 mb-1">∞</p>
                        <p className="text-sm text-gray-400">{t.manifesto.performance.customization}</p>
                    </div>
                </motion.div>

                {/* Proof of Performance - LCP & Lighthouse */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                >
                    <div className="text-center mb-8">
                        <h3 className="font-heading text-2xl font-bold text-white mb-2">{t.manifesto.performance.title}</h3>
                        <p className="text-gray-400">{t.manifesto.performance.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* LCP Score */}
                        <div className="space-y-4">
                            <div
                                className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 h-64 flex flex-col justify-center items-center group cursor-pointer hover:border-green-500/30 transition-colors"
                                onClick={() => setModalImage({ src: '/LCP.webp', alt: 'LCP Performance Report' })}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative w-full max-w-[280px]">
                                    {/* Timeline */}
                                    <div className="flex items-end justify-between h-32 w-full mb-2 px-2 relative">
                                        {/* Grid lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                                            <div className="w-full h-px bg-white border-t border-dashed" />
                                            <div className="w-full h-px bg-white border-t border-dashed" />
                                            <div className="w-full h-px bg-white border-t border-dashed" />
                                            <div className="w-full h-px bg-white border-t border-dashed" />
                                        </div>

                                        {/* Bars - Linear Increase */}
                                        {[
                                            { time: '0.10s', height: '20%', color: 'bg-green-500/90', isHotpage: true },
                                            { time: '0.20s', height: '40%', color: 'bg-yellow-600/15', isHotpage: false },
                                            { time: '0.30s', height: '60%', color: 'bg-orange-600/15', isHotpage: false },
                                            { time: '0.40s', height: '80%', color: 'bg-orange-600/15', isHotpage: false },
                                            { time: '0.50s', height: '100%', color: 'bg-red-600/15', isHotpage: false },
                                        ].map((bar, index) => (
                                            <motion.div
                                                key={bar.time}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: bar.height }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                                className={`w-8 rounded-t-sm mx-1 relative group/bar ${bar.isHotpage
                                                    ? `${bar.color} rounded-t-md shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10`
                                                    : bar.color
                                                    }`}
                                            >
                                                {bar.isHotpage && (
                                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-400 font-bold text-xs whitespace-nowrap opacity-100">
                                                        {bar.time}
                                                    </div>
                                                )}
                                                {!bar.isHotpage && (
                                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                                        {bar.time}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* X-Axis */}
                                    <div className="w-full h-px bg-white/20 mb-2" />
                                    <div className="flex justify-between text-[10px] text-gray-500 font-mono px-1">
                                        <span className="text-green-400 font-bold">0.10s</span>
                                        <span>0.20s</span>
                                        <span>0.30s</span>
                                        <span>0.40s</span>
                                        <span>0.50s</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-0 w-full text-center">
                                    <span className="text-sm text-gray-400 font-medium group-hover:text-green-400 transition-colors">{t.manifesto.performance.clickLcp}</span>
                                </div>
                            </div>
                        </div>

                        {/* Lighthouse Scores */}
                        <div className="space-y-4">
                            <div
                                className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 h-64 flex flex-col justify-center items-center group cursor-pointer hover:border-green-500/30 transition-colors"
                                onClick={() => setModalImage({ src: '/lighthouse.webp', alt: 'Lighthouse Performance Report' })}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    style={{ backgroundSize: "200% 200%" }}
                                />

                                <div className="flex justify-center gap-4 w-full px-2">
                                    {[
                                        { label: t.manifesto.performance.metrics.perf, score: 100, delay: 0.2 },
                                        { label: t.manifesto.performance.metrics.a11y, score: 100, delay: 0.4 },
                                        { label: t.manifesto.performance.metrics.best, score: 92, delay: 0.6 }
                                    ].map((metric) => (
                                        <div key={metric.label} className="flex flex-col items-center gap-3">
                                            {/* Radial Chart */}
                                            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                                                {/* Background Circle */}
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        stroke="currentColor"
                                                        strokeWidth="6"
                                                        fill="transparent"
                                                        className="text-white/10"
                                                    />
                                                    {/* Progress Circle */}
                                                    <motion.circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        stroke="currentColor"
                                                        strokeWidth="6"
                                                        fill="transparent"
                                                        strokeLinecap="round"
                                                        className={metric.score >= 90 ? "text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "text-yellow-500"}
                                                        initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                                                        whileInView={{ strokeDashoffset: String(251.2 - (251.2 * metric.score) / 100) }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.5, ease: "easeOut", delay: metric.delay }}
                                                    />
                                                </svg>

                                                {/* Score Text */}
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <AnimatedCounter
                                                        from={0}
                                                        to={metric.score}
                                                        delay={metric.delay}
                                                        className={`text-xl md:text-2xl font-bold font-mono ${metric.score >= 90 ? 'text-green-400' : 'text-yellow-400'}`}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-[10px] md:text-xs text-gray-400 font-medium text-center max-w-[80px] leading-tight">
                                                {metric.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute bottom-4 left-0 w-full text-center">
                                    <span className="text-sm text-gray-400 font-medium group-hover:text-green-400 transition-colors">{t.manifesto.performance.clickLighthouse}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 italic">
                        {t.manifesto.performance.quote}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
