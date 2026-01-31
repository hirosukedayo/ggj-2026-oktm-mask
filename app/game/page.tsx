"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";
import { TEXT } from "@/utils/locales";
import { SPOTS, Spot } from "./constants";

interface Photo {
    id: number;
    url: string;
    x: number;
    y: number;
    spotId?: string;
}

type GamePhase = 'capturing' | 'result' | 'ending';

export default function GamePage() {
    const router = useRouter();
    const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
    const [phase, setPhase] = useState<GamePhase>('capturing');

    // Check collision with defined spots
    const checkSpotCollision = (x: number, y: number): string | undefined => {
        let closestSpot: Spot | null = null;
        let minDistance = Infinity;

        SPOTS.forEach(spot => {
            const dist = Math.sqrt(Math.pow(x - spot.x, 2) + Math.pow(y - spot.y, 2));
            if (dist <= spot.radius) {
                if (dist < minDistance) {
                    minDistance = dist;
                    closestSpot = spot;
                }
            }
        });

        return closestSpot?.id;
    };

    const handleCapture = (dataUrl: string, position: { x: number, y: number }) => {
        if (phase !== 'capturing') return;

        console.log("Captured at:", position);
        const spotId = checkSpotCollision(position.x, position.y);
        console.log("Detected Spot ID:", spotId);

        const newPhoto: Photo = {
            id: Date.now(),
            url: dataUrl,
            x: position.x,
            y: position.y,
            spotId
        };

        const newPhotos = [newPhoto, ...capturedPhotos];
        setCapturedPhotos(newPhotos);

        // Check if we hit the limit (2 photos)
        if (newPhotos.length >= 2) {
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

    // Check ending condition
    const capturedSpotIds = capturedPhotos.map(p => p.spotId).filter((id): id is string => !!id);
    const requiredSpots = SPOTS.filter(s => s.type === 'required');
    const isEndingConditionMet = requiredSpots.every(req => capturedSpotIds.includes(req.id));

    const getPhotoInfo = (photo: Photo) => {
        if (!photo.spotId) {
            return {
                title: TEXT.EPISODE.NOTHING_TITLE,
                desc: TEXT.EPISODE.NOTHING_DESC
            };
        }
        const spot = SPOTS.find(s => s.id === photo.spotId);
        if (spot) {
            // Accessing dynamic keys. Ensure TEXT.EPISODE matches keys in constants.ts
            const ep = TEXT.EPISODE as any;
            return {
                title: ep[spot.titleKey],
                desc: ep[spot.descKey]
            };
        }
        return { title: "Error", desc: "Unknown spot" };
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
                        <h2>{isEndingConditionMet ? TEXT.RESULT.TITLE : "記憶の断片"}</h2>

                        <div className={styles.resultPhotos}>
                            {capturedPhotos.map((photo, index) => {
                                const info = getPhotoInfo(photo);
                                return (
                                    <div key={photo.id} className={styles.photoCard}>
                                        <div className={styles.photoFrame}>
                                            <img src={photo.url} alt={`Capture ${index + 1}`} />
                                        </div>
                                        <div className={styles.photoText}>
                                            <h3>{info.title}</h3>
                                            <p>{info.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.totalScore}>
                            {isEndingConditionMet ? (
                                <p className={styles.resultMessage}>{TEXT.ENDING.SUBTITLE}</p>
                            ) : (
                                <p className={styles.resultMessage}>まだ足りない記憶があるようだ...</p>
                            )}
                        </div>

                        {isEndingConditionMet ? (
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

