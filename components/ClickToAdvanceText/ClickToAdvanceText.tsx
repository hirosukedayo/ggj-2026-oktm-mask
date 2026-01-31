import React, { useState, useEffect } from 'react';
import styles from './ClickToAdvanceText.module.css';

export type TextSegment = {
    text: string;
    type?: 'protagonist' | 'psychiatrist' | 'narrator';
    style?: React.CSSProperties;
};

interface ClickToAdvanceTextProps {
    segments: (string | TextSegment)[];
    onComplete: () => void;
    className?: string;
    finished?: boolean;
}

export const ClickToAdvanceText: React.FC<ClickToAdvanceTextProps> = ({
    segments,
    onComplete,
    className,
    finished = false,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const advance = () => {
        if (finished) return;

        if (currentIndex < segments.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleClick = () => {
        // Kept for direct binding if needed, but main logic is via effect
        advance();
    };

    // Global click support
    useEffect(() => {
        if (finished) return;

        const handleGlobalClick = () => {
            advance();
        };

        // Delay adding listener slightly to avoid catching the mount-triggering click
        const timer = setTimeout(() => {
            window.addEventListener('click', handleGlobalClick);
        }, 0);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handleGlobalClick);
        };
    }, [currentIndex, segments.length, onComplete, finished]);

    // Keyboard support (Space/Enter to advance)
    useEffect(() => {
        if (finished) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                advance();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, segments.length, onComplete, finished]);

    const currentSegment = segments[currentIndex];

    const getText = (segment: string | TextSegment) => {
        return typeof segment === 'string' ? segment : segment.text;
    };

    const getTypeClass = (segment: string | TextSegment) => {
        if (typeof segment === 'string') return styles.narrator;
        return styles[segment.type || 'narrator'];
    };

    const getStyle = (segment: string | TextSegment) => {
        if (typeof segment === 'string') return {};
        return segment.style || {};
    };

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div className={styles.textContainer}>
                <div key={currentIndex} className={`${styles.segment} ${getTypeClass(currentSegment)}`} style={getStyle(currentSegment)}>
                    {getText(currentSegment)}
                </div>
            </div>
            {!finished && (
                <div className={styles.instruction}>
                    Click anywhere to continue
                </div>
            )}
        </div>
    );
};
