import React, { useState, useEffect, useRef } from 'react';
import styles from './ClickToAdvanceText.module.css';
import { FlickerText } from '../FlickerText/FlickerText';
import { FLICKER_SOUND_VOLUME, FLICKER_SOUND_DURATION } from '@/utils/audioConfig';

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
    flickerSoundSrc?: string;
}

export const ClickToAdvanceText: React.FC<ClickToAdvanceTextProps> = ({
    segments,
    onComplete,
    className,
    finished = false,
    flickerSoundSrc,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flickerAudioRef = useRef<HTMLAudioElement | null>(null);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Flicker sound effect - play when segment changes
    useEffect(() => {
        if (!flickerSoundSrc) return;

        // Clean up previous audio and timeout
        if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current);
        }
        if (flickerAudioRef.current) {
            flickerAudioRef.current.pause();
            flickerAudioRef.current = null;
        }

        const audio = new Audio(flickerSoundSrc);
        audio.volume = FLICKER_SOUND_VOLUME;
        flickerAudioRef.current = audio;

        audio.play().catch(e => console.log("Flicker sound autoplay blocked:", e));

        // Fade out after animation duration
        fadeTimeoutRef.current = setTimeout(() => {
            if (flickerAudioRef.current) {
                // Quick fade out
                const fadeOut = () => {
                    if (flickerAudioRef.current && flickerAudioRef.current.volume > 0.05) {
                        flickerAudioRef.current.volume = Math.max(0, flickerAudioRef.current.volume - 0.05);
                        requestAnimationFrame(fadeOut);
                    } else if (flickerAudioRef.current) {
                        flickerAudioRef.current.pause();
                        flickerAudioRef.current = null;
                    }
                };
                fadeOut();
            }
        }, FLICKER_SOUND_DURATION);

        return () => {
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
            if (flickerAudioRef.current) {
                flickerAudioRef.current.pause();
                flickerAudioRef.current = null;
            }
        };
    }, [currentIndex, flickerSoundSrc]);

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
        <div className={`${styles.container} ${finished ? styles.finished : ''} ${className || ''}`}>
            <div className={styles.textContainer}>
                <div key={currentIndex} className={`${styles.segment} ${getTypeClass(currentSegment)}`} style={getStyle(currentSegment)}>
                    <FlickerText text={getText(currentSegment)} />
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
