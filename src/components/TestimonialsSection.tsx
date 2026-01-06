import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const TestimonialsSection: React.FC = () => {
    const { t } = useLanguage();

    const testimonials = [
        {
            name: t.testimonials.items[0].name,
            content: t.testimonials.items[0].content,
        },
        {
            name: t.testimonials.items[1].name,
            content: t.testimonials.items[1].content,
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white">
                        {t.testimonials.title.split(' ')[0]} {t.testimonials.title.split(' ')[1]} <span className="text-green-400 relative inline-block">
                            {t.testimonials.title.split(' ').slice(2).join(' ')}
                            <ThumbsUp className="absolute -top-3 -right-7 text-green-400 rotate-12 opacity-80" size={28} strokeWidth={2.5} />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        {t.testimonials.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl relative hover:bg-white/10 transition-colors group flex flex-col h-full"
                        >
                            <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 rotate-180" />

                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed relative z-10 flex-grow">
                                "{t.content}"
                            </p>

                            {/* User info at bottom */}
                            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{t.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
