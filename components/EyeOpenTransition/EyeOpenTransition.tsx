import React, { useEffect, useState } from 'react';
import styles from './EyeOpenTransition.module.css';

interface EyeOpenTransitionProps {
    onComplete?: () => void;
    duration?: number;
}

export const EyeOpenTransition: React.FC<EyeOpenTransitionProps> = ({
    onComplete,
    duration = 800
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    if (!isVisible) return null;

    return (
        <div className={styles.overlayWithShadow} />
    );
};
