"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";
import { TEXT } from "@/utils/locales";

interface Photo {
    id: number;
    url: string;
    x: number;
    y: number;
    score: number;
}

type GamePhase = 'capturing' | 'result' | 'ending';

export default function GamePage() {
    const router = useRouter();
    const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
    const [phase, setPhase] = useState<GamePhase>('capturing');

    // Scoring logic based on distance from center
    const calculateScore = (x: number, y: number, width: number, height: number): number => {
        const centerX = width / 2;
        const centerY = height / 2;
        // Euclidean distance from center
        const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        // Define thresholds (arbitrary based on 800x600 size)
        // Center is (400, 300).
        // 100px radius -> 3 points
        // 250px radius -> 2 points
        // else -> 1 point

        if (dist < 100) return 3;
        if (dist < 250) return 2;
        return 1;
    };

    const handleCapture = (dataUrl: string, position: { x: number, y: number }) => {
        if (phase !== 'capturing') return;

        const width = 960; // Match component props
        const height = 540;

        const score = calculateScore(position.x, position.y, width, height);

        const newPhoto: Photo = {
            id: Date.now(),
            url: dataUrl,
            x: position.x,
            y: position.y,
            score: score
        };

        const newPhotos = [newPhoto, ...capturedPhotos];
        setCapturedPhotos(newPhotos);

        // Check if we hit the limit (2 photos)
        if (newPhotos.length >= 2) {
            // Small delay before showing results to let the user see the capture flash/feedback
            setTimeout(() => {
                setPhase('result');
            }, 1000);
        }
    };

    const handleReset = () => {
        setCapturedPhotos([]);
        setPhase('capturing');
    };

    const revealedAreas = capturedPhotos.map(p => ({ x: p.x, y: p.y }));
    const totalScore = capturedPhotos.reduce((sum, p) => sum + p.score, 0);

    // Dynamic result message based on total score
    const getResultMessage = (score: number) => {
        if (score >= 6) return TEXT.RESULT.MESSAGES.HIGH;
        if (score >= 4) return TEXT.RESULT.MESSAGES.MEDIUM;
        return TEXT.RESULT.MESSAGES.LOW;
    };

    return (
        <div className={styles.container}>
            {/* Main Game Area */}
            <main className={styles.mainArea}>
                <MaskCamera
                    imageSrc="/images/Okutama_Bteam_mock.png"
                    width={960}
                    height={540}
                    maskRadius={100}
                    onCapture={handleCapture}
                    disabled={phase === 'result' || capturedPhotos.length >= 2}
                    revealedAreas={revealedAreas}
                />
            </main>

            {/* Result Overlay */}
            {phase === 'result' && (
                <div className={styles.resultOverlay}>
                    <div className={styles.resultContent}>
                        <h2>{TEXT.RESULT.TITLE}</h2>
                        <div className={styles.resultPhotos}>
                            {capturedPhotos.map((photo, index) => (
                                <div key={photo.id} className={styles.photoCard}>
                                    <img src={photo.url} alt={`Capture ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <div className={styles.totalScore}>
                            <p className={styles.resultMessage}>{getResultMessage(totalScore)}</p>
                        </div>

                        {totalScore >= 6 ? (
                            <button
                                className={`${styles.resetButton} ${styles.endingButton}`}
                                onClick={() => setPhase('ending')}
                            >
                                {TEXT.UI.BUTTON_ENDING}
                            </button>
                        ) : (
                            <button className={styles.resetButton} onClick={handleReset}>
                                {TEXT.UI.BUTTON_RESET}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Ending Overlay */}
            {phase === 'ending' && (
                <div className={styles.endingOverlay}>
                    <div className={styles.endingContent}>
                        <h1 className={styles.endingTitle}>{TEXT.ENDING.TITLE}</h1>
                        <h2 className={styles.endingSubtitle}>{TEXT.ENDING.SUBTITLE}</h2>
                        <p className={styles.endingDescription}>{TEXT.ENDING.DESCRIPTION}</p>
                        <hr className={styles.separator} />
                        <p className={styles.credits}>{TEXT.ENDING.CREDITS}</p>

                        <button className={styles.resetButton} onClick={() => router.push('/')} style={{ marginTop: '40px' }}>
                            Title
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

