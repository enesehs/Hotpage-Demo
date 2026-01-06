import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

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

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }}
        className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
    >
        <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit backdrop-blur-sm border border-white/10">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
);
