import React, { useState, useEffect } from 'react';
import styles from './ClickToAdvanceText.module.css';
import { FlickerText } from '../FlickerText/FlickerText';

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
    bgmSrc?: string;
    bgmVolume?: number;
}

export const ClickToAdvanceText: React.FC<ClickToAdvanceTextProps> = ({
    segments,
    onComplete,
    className,
    finished = false,
    bgmSrc,
    bgmVolume = 0.5,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // BGM Effect
    useEffect(() => {
        if (!bgmSrc) return;

        const audio = new Audio(bgmSrc);
        audio.loop = true;
        audio.volume = bgmVolume;
        audioRef.current = audio;

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Auto-play prevented, waiting for interaction:", error);
                setIsPlaying(false);
            }
        };

        playAudio();

        return () => {
            audio.pause();
            audio.currentTime = 0;
            audioRef.current = null;
        };
    }, [bgmSrc, bgmVolume]);

    const advance = () => {
        // Try to resume audio if not playing (e.g. autoplay blocked)
        if (audioRef.current && !isPlaying && !finished) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Still blocked", e));
        }

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
