"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";
import { TEXT, TextSegment } from "@/utils/locales";
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
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

    // Route guard: Redirect to title if not started via prologue
    React.useEffect(() => {
        // @ts-ignore
        const hasStarted = typeof window !== 'undefined' && window.oktmGameStarted;

        // In development (Strict Mode), effects run twice.
        // Window variable stays set during soft navs and double-effects.
        // But on reload, window is cleared, so hasStarted will be false.
        if (!hasStarted) {
            router.replace('/');
        }
    }, [router]);

    const [resultScenario, setResultScenario] = useState<TextSegment[]>([]);
    const [showResultSummary, setShowResultSummary] = useState(false);

    // Check collision with defined spots
    const checkSpotCollision = (x: number, y: number): string | undefined => {
        let closestSpot: Spot | undefined = undefined;
        let minDistance = Infinity;

        for (const spot of SPOTS) {
            const dist = Math.sqrt(Math.pow(x - spot.x, 2) + Math.pow(y - spot.y, 2));
            if (dist <= spot.radius) {
                if (dist < minDistance) {
                    minDistance = dist;
                    closestSpot = spot;
                }
            }
        }

        return closestSpot ? closestSpot.id : undefined;
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
                prepareResult(newPhotos);
                setPhase('result');
            }, 1000);
        }
    };

    const prepareResult = (photos: Photo[]) => {
        const capturedSpotIds = photos.map(p => p.spotId).filter((id): id is string => !!id);

        let scenario: TextSegment[] = [];

        // Condition 1: True Ending (Both Answer Spots Captured)
        const hasSpotA = capturedSpotIds.includes('spot_a');
        const hasSpotB = capturedSpotIds.includes('spot_b');

        if (hasSpotA && hasSpotB) {
            scenario = TEXT.RESULT.SCENARIO_ENDING[0];
        } else {
            // Condition 2: Incident Spots (Priority if no ending)
            // If multiple incidents are captured, we could prioritize or combine.
            // For now, let's pick the first one found, or have a hierarchy.
            const incidentId = capturedSpotIds.find(id => ['murder', 'bicycle', 'wildfire'].includes(id));

            if (incidentId) {
                switch (incidentId) {
                    case 'murder':
                        scenario = TEXT.RESULT.SCENARIO_MURDER[0];
                        break;
                    case 'bicycle':
                        scenario = TEXT.RESULT.SCENARIO_BICYCLE[0];
                        break;
                    case 'wildfire':
                        scenario = TEXT.RESULT.SCENARIO_WILDFIRE[0];
                        break;
                    default:
                        // Fallback shouldn't happen if check matches
                        scenario = TEXT.RESULT.SCENARIO_A[0];
                }
            } else {
                // Condition 3: Failure / Random (Only one answer spot or random spots)
                const patterns = TEXT.RESULT.SCENARIO_A;
                const randomIndex = Math.floor(Math.random() * patterns.length);
                scenario = patterns[randomIndex];
            }
        }

        setResultScenario(scenario);
        setShowResultSummary(false); // Reset summary state
    };

    const handleReset = () => {
        setCapturedPhotos([]);
        setPhase('capturing');
        setShowResultSummary(false);
    };

    const revealedAreas = capturedPhotos.map(p => ({ x: p.x, y: p.y }));

    // Check ending condition for button display logic
    // We can reuse the same logic or just check if the scenario is the Ending scenario
    // But relying on scenario text might be brittle, so checking spots is safer.
    const capturedSpotIds = capturedPhotos.map(p => p.spotId).filter((id): id is string => !!id);
    const isEndingConditionMet = capturedSpotIds.includes('spot_a') && capturedSpotIds.includes('spot_b');

    const getPhotoInfo = (photo: Photo) => {
        if (!photo.spotId) {
            return {
                title: TEXT.EPISODE.NOTHING_TITLE,
                desc: TEXT.EPISODE.NOTHING_DESC
            };
        }
        const spot = SPOTS.find(s => s.id === photo.spotId);
        if (spot) {
            // Accessing dynamic keys.
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
                    imageSrc="/images/Okutama_Bteam_mock2.png"
                    width={960}
                    height={540}
                    maskRadius={100}
                    onCapture={handleCapture}
                    disabled={phase === 'result' || capturedPhotos.length >= 2}
                    revealedAreas={revealedAreas}
                />
            </main>

            {/* Result Overlay */}
            {(phase === 'result' || phase === 'ending') && (
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
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.conversationContainer}>
                            <ClickToAdvanceText
                                segments={resultScenario}
                                onComplete={() => setShowResultSummary(true)}
                                className={showResultSummary ? styles.textFinished : ''}
                                finished={showResultSummary}
                            />
                        </div>

                        {showResultSummary && (
                            <div className={styles.actionButtons}>
                                <div className={styles.totalScore}>
                                    {/* Empty or just remove if not needed, but keeping structure for layout stability if necessary */}
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
                        )}
                    </div>
                </div>
            )}

            {/* Ending Overlay */}
            {phase === 'ending' && (
                <div className={styles.endingOverlay}>
                    <div className={styles.endingContent}>
                        <h1 className={styles.endingTitle}>{TEXT.ENDING.TITLE}</h1>
                        <p className={styles.endingDescription}>{TEXT.ENDING.DESCRIPTION}</p>
                        <hr className={styles.separator} />
                        <p className={styles.credits}>{TEXT.ENDING.CREDITS}</p>

                        <button className={styles.resetButton} onClick={() => router.push('/')} style={{ marginTop: '40px' }}>
                            {TEXT.UI.BUTTON_TITLE_BACK}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

