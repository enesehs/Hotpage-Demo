import React, { useEffect, useState, useRef } from 'react';

export const CursorGlow: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setTargetPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    // Smooth follow with delay
    useEffect(() => {
        const animate = () => {
            setPosition(prev => ({
                x: prev.x + (targetPosition.x - prev.x) * 0.08,
                y: prev.y + (targetPosition.y - prev.y) * 0.08,
            }));
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetPosition]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed pointer-events-none z-0 w-72 h-72 rounded-full"
            style={{
                left: position.x - 144,
                top: position.y - 144,
                opacity: isVisible ? 0.15 : 0,
                background: 'rgba(0, 102, 255, 0.26)',
                filter: 'blur(60px)',
            }}
        />
    );
};
