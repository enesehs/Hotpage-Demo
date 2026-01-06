import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Moved faqs array inside component to use translations

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { t } = useLanguage();

    const faqs = [
        {
            question: t.faq.items[0].q,
            answer: t.faq.items[0].a,
        },
        {
            question: t.faq.items[1].q,
            answer: t.faq.items[1].a,
        },
        {
            question: t.faq.items[2].q,
            answer: t.faq.items[2].a,
        },
        {
            question: t.faq.items[3].q,
            answer: t.faq.items[3].a,
        },
        {
            question: t.faq.items[4].q,
            answer: t.faq.items[4].a,
        },
    ];

    return (
        <section className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                        {t.faq.title}
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-heading font-medium text-lg text-white">
                                    {faq.question}
                                </span>
                                <div className={`p-1 rounded-full border border-white/10 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-white/10' : ''}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
