import React, { useMemo } from 'react';
import styles from './FlickerText.module.css';

interface FlickerTextProps {
    text: string;
    duration?: number; // Total duration for the text to fully appear (rough estimate)
    delay?: number; // Initial delay
    className?: string;
}

export const FlickerText: React.FC<FlickerTextProps> = ({
    text,
    duration = 1.0, // Default 1 second for the effect
    delay = 0,
    className
}) => {

    // Memoize the characters config to prevent re-randomizing on re-renders unless text changes
    const chars = useMemo(() => {
        return text.split('').map((char, index) => {
            // Randomly choose one of the flicker animations
            const animationName = `flicker${Math.floor(Math.random() * 3) + 1}`;

            // Random duration for each character's flicker sequence
            // We want them to generally finish within the target duration
            const animDuration = 0.5 + Math.random() * 0.5; // 0.5s - 1.0s

            // Random delay start, but staggered slightly if we wanted typewriter effect.
            // For pure random flicker appear, just small random delay.
            const animDelay = delay + (Math.random() * 0.5);

            return {
                char,
                className: `${styles.char} ${styles[animationName]}`,
                style: {
                    animationDuration: `${animDuration}s`,
                    animationDelay: `${animDelay}s`,
                    animationFillMode: 'forwards',
                    animationTimingFunction: 'steps(2, start)',
                } as React.CSSProperties
            };
        });
    }, [text, delay]);

    return (
        <span className={className}>
            {chars.map((item, i) => (
                <span key={i} className={item.className} style={item.style}>
                    {item.char}
                </span>
            ))}
        </span>
    );
};
