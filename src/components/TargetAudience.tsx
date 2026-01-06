import React from 'react';
import { motion } from 'framer-motion';
import { Code, Battery, EyeOff } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Moved audiences array inside component to use translations

export const TargetAudience: React.FC = () => {
    const { t } = useLanguage();

    const audieneces = [
        {
            title: t.targetAudience.audiences.dev.title,
            description: t.targetAudience.audiences.dev.desc,
            icon: Code,
            benefits: t.targetAudience.audiences.dev.benefits,
            color: 'text-blue-400',
            bgDot: 'bg-blue-400',
            bg: 'bg-blue-500/10',
        },
        {
            title: t.targetAudience.audiences.minimalist.title,
            description: t.targetAudience.audiences.minimalist.desc,
            icon: Battery, // Using Battery to signify efficiency/lightweight
            benefits: t.targetAudience.audiences.minimalist.benefits,
            color: 'text-yellow-400',
            bgDot: 'bg-yellow-400',
            bg: 'bg-yellow-500/10',
        },
        {
            title: t.targetAudience.audiences.privacy.title,
            description: t.targetAudience.audiences.privacy.desc,
            icon: EyeOff,
            benefits: t.targetAudience.audiences.privacy.benefits,
            color: 'text-green-400',
            bgDot: 'bg-green-400',
            bg: 'bg-green-500/10',
        },
    ];

    return (
        <section className="py-24 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                        {t.targetAudience.title}
                    </h2>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        {t.targetAudience.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {audieneces.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                        >
                            <div className={`absolute top-0 right-0 p-24 ${item.bg} rounded-full blur-[80px] -mr-12 -mt-12 transition-all group-hover:scale-110 opacity-50`} />

                            <div className={`mb-6 p-4 rounded-2xl w-fit border border-white/10 bg-white/5 ${item.color}`}>
                                <item.icon size={28} />
                            </div>

                            <h3 className="font-heading text-xl font-bold text-white mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-6 h-20">
                                {item.description}
                            </p>

                            <ul className="space-y-3">
                                {item.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-300">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.bgDot}`} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
