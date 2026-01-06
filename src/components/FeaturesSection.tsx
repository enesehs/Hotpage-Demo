import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Palette, Puzzle, Globe, RefreshCw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

export const FeaturesSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="features-grid" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white">
                        {t.features.heading.title} <span className="text-indigo-400">{t.features.heading.highlight}</span> {t.features.heading.suffix}
                    </h2>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        {t.features.subheading}
                    </p>
                </motion.div>

                {/* Features Grid - Bento Style */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
                >
                    {/* Privacy - Large Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-green-500/20" />
                        <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit text-green-400 border border-white/10">
                            <Shield size={32} />
                        </div>
                        <h3 className="font-heading text-2xl font-semibold mb-3 text-white">
                            {t.features.cards.privacy.title}
                        </h3>
                        <p className="text-gray-300 text-base leading-relaxed max-w-lg mb-4 flex-grow">
                            {t.features.cards.privacy.desc}
                        </p>
                        <p className="text-sm text-green-300/80 font-medium border-t border-white/5 pt-3 mt-auto">
                            {t.features.cards.privacy.tag}
                        </p>
                    </motion.div>

                    {/* Speed - Card with Tech Stack */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute bottom-0 right-0 p-32 bg-yellow-500/10 rounded-full blur-3xl -mb-16 -mr-16 transition-all group-hover:bg-yellow-500/20" />
                        <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit text-yellow-400 border border-white/10">
                            <Zap size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                            {t.features.cards.speed.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3 flex-grow">
                            {t.features.cards.speed.desc}
                        </p>
                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-[#646CFF]/10 text-[#646CFF] rounded-lg border border-[#646CFF]/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m8.525 4.63l-5.132-.915a1.17 1.17 0 0 0-1.164.468a1.16 1.16 0 0 0-.07 1.28l8.901 15.58a1.182 1.182 0 0 0 2.057-.008l8.729-15.578c.49-.875-.262-1.917-1.242-1.739l-4.574.813l-.206.754l4.906-.871a.474.474 0 0 1 .498.697L12.5 20.689a.47.47 0 0 1-.5.234a.47.47 0 0 1-.326-.231L2.772 5.112a.474.474 0 0 1 .496-.7l5.133.916l.074.013z" /><path fill="currentColor" d="m15.097 5.26l.162-.593l-.6.107zm-5.88-.506l.513.09l-.542.427z" /><path fill="currentColor" d="m15.549 2.367l-6.1 1.26a.22.22 0 0 0-.126.077a.25.25 0 0 0-.055.142l-.375 6.685a.24.24 0 0 0 .079.194a.21.21 0 0 0 .195.05l1.698-.414c.16-.038.302.11.27.278l-.505 2.606c-.034.176.122.326.285.274l1.049-.336c.162-.052.319.098.284.274l-.801 4.093c-.05.257.272.396.407.177l.09-.147l4.97-10.464c.084-.175-.06-.375-.242-.338l-1.748.356c-.165.034-.304-.128-.258-.297l1.14-4.173c.047-.17-.093-.331-.257-.297" /></svg>
                                Vite
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-[#61DAFB]/10 text-[#61DAFB] rounded-lg border border-[#61DAFB]/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="currentColor"><path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5c.029-.18.077-.37.1-.545c.217-2.058-.273-3.543-1.379-4.182c-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182c.018.175.067.365.095.545c-2.127.819-3.466 2.071-3.466 3.5s1.339 2.681 3.466 3.5c-.028.18-.077.37-.095.545c-.218 2.058.272 3.543 1.379 4.182c.376.213.803.322 1.235.316a6 6 0 0 0 3.514-1.56a6 6 0 0 0 3.515 1.56a2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182c-.019-.175-.067-.365-.1-.545c2.132-.819 3.471-2.071 3.471-3.5m-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212c-.012.106-.043.222-.058.33q-1.263-.365-2.57-.523a16 16 0 0 0-1.747-1.972a4.9 4.9 0 0 1 2.731-1.234m-7.917 8.781c.172.34.335.68.529 1.017s.395.656.6.969a14 14 0 0 1-1.607-.376a14 14 0 0 1 .478-1.61m-.479-4.076a14 14 0 0 1 1.607-.376q-.308.468-.6.969c-.195.335-.357.677-.529 1.017q-.286-.79-.478-1.61M8.3 12a19 19 0 0 1 .888-1.75q.496-.852 1.076-1.65c.619-.061 1.27-.1 1.954-.1q1.025.001 1.952.1a20 20 0 0 1 1.079 1.654q.488.851.887 1.746a19 19 0 0 1-1.953 3.403a19.2 19.2 0 0 1-3.931 0a20 20 0 0 1-1.066-1.653A19 19 0 0 1 8.3 12m7.816 2.25c.2-.337.358-.677.53-1.017q.286.791.478 1.611a15 15 0 0 1-1.607.376c.202-.314.404-.635.597-.97zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20 20 0 0 0-.6-.97q.814.142 1.606.376a14 14 0 0 1-.478 1.611zM12.217 6.34q.6.563 1.13 1.193q-.555-.031-1.129-.033c-.574-.002-.76.013-1.131.033q.53-.63 1.13-1.193m-4.249-1.7a1.5 1.5 0 0 1 .76-.187a4.9 4.9 0 0 1 2.729 1.233A16 16 0 0 0 9.71 7.658q-1.306.158-2.569.524c-.015-.109-.047-.225-.058-.331c-.171-1.619.151-2.787.885-3.211M3.718 12c0-.9.974-1.83 2.645-2.506c.218.857.504 1.695.856 2.506c-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12m4.25 7.361c-.734-.423-1.056-1.593-.885-3.212c.011-.106.043-.222.058-.331q1.262.365 2.564.524a16.4 16.4 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037m3.11-2.895q.56.033 1.14.034q.58-.001 1.139-.034a14 14 0 0 1-1.14 1.215a14 14 0 0 1-1.139-1.215m5.39 2.895c-.782.451-2.075.072-3.5-1.038a16 16 0 0 0 1.757-1.981a16.4 16.4 0 0 0 2.565-.523c.015.108.046.224.058.33c.175 1.619-.148 2.789-.88 3.212m1.6-4.854A16.6 16.6 0 0 0 17.216 12q.529-1.22.856-2.507c1.671.677 2.646 1.607 2.646 2.507s-.975 1.83-2.646 2.507z" /><path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794" /></g></svg>
                                React
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-[#3178C6]/10 text-[#3178C6] rounded-lg border border-[#3178C6]/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="currentColor" d="M10 1.25V4.5c0 .28.22.5.5.5h3.25zM10.5 6C9.67 6 9 5.33 9 4.5V1H5.5C4.67 1 4 1.67 4 2.5V9c.4 0 .77.16 1.06.44c.4-.28.87-.44 1.36-.44h.15c.64 0 1.27.26 1.72.71S9 10.79 9 11.43c0 .34-.11.67-.32.94l.045.085l.045.085c.23.5.29 1.06.16 1.59c-.07.31-.21.61-.4.87h3.97c.83 0 1.5-.67 1.5-1.5V6zm-3.927 9h-.146A1.43 1.43 0 0 1 5 13.573a.533.533 0 0 1 .5-.537a.47.47 0 0 1 .35.125a.47.47 0 0 1 .15.339a.45.45 0 0 0 .428.5h.146a.428.428 0 0 0 .192-.808L5.79 12.7a1.424 1.424 0 0 1-.744-1.601A1.43 1.43 0 0 1 6.428 10h.146a1.43 1.43 0 0 1 1.427 1.427a.533.533 0 0 1-.5.537a.47.47 0 0 1-.35-.125a.47.47 0 0 1-.15-.339v-.073A.43.43 0 0 0 6.574 11h-.146a.428.428 0 0 0-.192.808l.976.489A1.426 1.426 0 0 1 6.573 15m-2.219-4.146a.504.504 0 0 0 0-.708A.5.5 0 0 0 4 10H1a.5.5 0 1 0 0 1h1v3.5a.5.5 0 1 0 1 0V11h1a.5.5 0 0 0 .354-.146" /></svg>
                                TS
                            </span>
                        </div>
                        <p className="text-xs text-yellow-300/80 font-medium border-t border-white/5 pt-2 mt-auto">
                            {t.features.cards.speed.tag}
                        </p>
                    </motion.div>

                    {/* Auto Sync - NEW Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute top-0 left-0 p-20 bg-cyan-500/10 rounded-full blur-2xl -ml-10 -mt-10 transition-all group-hover:bg-cyan-500/20" />
                        <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit text-cyan-400 border border-white/10">
                            <RefreshCw size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                            {t.features.cards.sync.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3 flex-grow">
                            {t.features.cards.sync.desc}
                        </p>
                        <p className="text-xs text-cyan-300/80 font-medium border-t border-white/5 pt-2 mt-auto">
                            {t.features.cards.sync.tag}
                        </p>
                    </motion.div>

                    {/* Customization - Normal Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute top-0 left-0 p-20 bg-purple-500/10 rounded-full blur-2xl -ml-10 -mt-10 transition-all group-hover:bg-purple-500/20" />
                        <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit text-purple-400 border border-white/10">
                            <Palette size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                            {t.features.cards.theming.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3 flex-grow">
                            {t.features.cards.theming.desc}
                        </p>
                        <p className="text-xs text-purple-300/80 font-medium border-t border-white/5 pt-2 mt-auto">
                            {t.features.cards.theming.tag}
                        </p>
                    </motion.div>

                    {/* Widgets - Normal Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute bottom-0 left-0 p-20 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 transition-all group-hover:bg-blue-500/20" />
                        <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit text-blue-400 border border-white/10">
                            <Puzzle size={24} />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                            {t.features.cards.widgets.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3 flex-grow">
                            {t.features.cards.widgets.desc}
                        </p>
                        <p className="text-xs text-blue-300/80 font-medium border-t border-white/5 pt-2 mt-auto">
                            {t.features.cards.widgets.tag}
                        </p>
                    </motion.div>

                    {/* Open Source - Wide Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="md:col-span-3 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-pink-500/20" />
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="mb-0 p-4 rounded-2xl bg-white/5 w-fit text-pink-400 border border-white/10">
                                <Globe size={32} />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-heading text-2xl font-semibold mb-2 text-white">
                                    {t.features.cards.openSource.title}
                                </h3>
                                <p className="text-gray-300 text-base leading-relaxed mb-3">
                                    {t.features.cards.openSource.desc}
                                </p>
                                <p className="text-sm text-pink-300/80 font-medium border-t border-white/5 pt-3">
                                    {t.features.cards.openSource.tag}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
