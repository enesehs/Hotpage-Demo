import React from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

/**
 * AnimatedBackground
 * A fully responsive, scrolling background with:
 * - Motion blur on scroll
 * - Animated floating orbs
 * - Grid overlay
 */

export const AnimatedBackground: React.FC = () => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Map velocity to blur amount (0-4px) - subtle, meshes stay visible
    const blurAmount = useTransform(scrollVelocity, [-2000, 0, 2000], [4, 0, 4]);
    const smoothBlur = useSpring(blurAmount, { stiffness: 50, damping: 40 });

    return (
        <motion.div
            className="absolute inset-0 -z-20 overflow-hidden bg-[#070726]"
            style={{
                filter: useTransform(smoothBlur, (v) => `blur(${v}px)`),
                minHeight: '100%',
                willChange: 'filter',
            }}
        >
            {/* Base Mesh Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120, 119, 198, 0.25), transparent 80%),
                        radial-gradient(ellipse 60% 50% at 0% 100%, rgba(147, 51, 234, 0.12), transparent 80%),
                        radial-gradient(ellipse 60% 40% at 100% 50%, rgba(59, 130, 246, 0.12), transparent 80%),
                        radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16, 185, 129, 0.08), transparent 80%)
                    `,
                }}
            />

            {/* Floating Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Orb 1 - Purple/Indigo - Top Left */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        top: '-10%',
                        left: '-10%',
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orb 2 - Cyan - Center Right */}
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                        top: '30%',
                        right: '-5%',
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orb 3 - Green - Bottom Left */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                        filter: 'blur(70px)',
                        bottom: '-15%',
                        left: '10%',
                    }}
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orb 4 - Pink/Magenta - Top Right */}
                <motion.div
                    className="absolute w-[350px] h-[350px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
                        filter: 'blur(45px)',
                        top: '5%',
                        right: '15%',
                    }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orb 5 - Blue - Bottom Right */}
                <motion.div
                    className="absolute w-[450px] h-[450px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                        filter: 'blur(55px)',
                        bottom: '10%',
                        right: '-10%',
                    }}
                    animate={{
                        x: [0, 70, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Radial Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(7,7,38,0.5) 100%)',
                }}
            />
        </motion.div>
    );
};
