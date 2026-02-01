"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";
import { TextSegment } from "@/utils/locales";
import { useLanguage } from "@/components/LanguageProvider";
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { EyeOpenTransition } from "@/components/EyeOpenTransition/EyeOpenTransition";
import { SPOTS, Spot } from "./constants";
import { SCENARIO_BGM_VOLUME, MAIN_BGM_VOLUME } from "@/utils/audioConfig";

interface Photo {
    id: number;
    url: string;
    x: number;
    y: number;
    spotId?: string;
}

type GamePhase = 'capturing' | 'result' | 'ending';

export default function AshidaScenarioPage() {
    const router = useRouter();
    const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
    const [phase, setPhase] = useState<GamePhase>('capturing');
    const { text } = useLanguage();
    const [showTransition, setShowTransition] = useState(true);

    // Route guard: Redirect to title if not started via prologue
    React.useEffect(() => {
        // @ts-expect-error
        const hasStarted = typeof window !== 'undefined' && window.oktmGameStartedA2;

        if (!hasStarted) {
            router.replace('/?unlock=y,e');
        }
    }, [router]);

    // Main BGM (Capturing -> Result -> Ending)
    const mainBgmRef = React.useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        const audio = new Audio('/sounds/bgm.mp3');
        audio.loop = true;
        audio.volume = MAIN_BGM_VOLUME;
        mainBgmRef.current = audio;

        audio.play().catch(e => console.log("Main BGM autoplay blocked:", e));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

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

        const newPhotos = [...capturedPhotos, newPhoto];
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

        // Condition 1: True Ending (Both Answer Spots Captured - 芦田 + 遠藤)
        const hasSpotA = capturedSpotIds.includes('spot_a');
        const hasSpotB = capturedSpotIds.includes('spot_b');

        if (hasSpotA && hasSpotB) {
            scenario = text.RESULT_A2.SCENARIO_ENDING[0];
        } else {
            // Condition 2: Incident Spots
            const incidentId = capturedSpotIds.find(id => ['miura', 'wildfire', 'anzaki'].includes(id));

            if (incidentId) {
                switch (incidentId) {
                    case 'miura':
                        scenario = text.RESULT_A2.SCENARIO_MIURA[0];
                        break;
                    case 'wildfire':
                        scenario = text.RESULT_A2.SCENARIO_WILDFIRE[0];
                        break;
                    case 'anzaki':
                        scenario = text.RESULT_A2.SCENARIO_ANZAKI[0];
                        break;
                    default:
                        scenario = text.RESULT_A2.SCENARIO_A[0];
                }
            } else {
                // Condition 3: Failure / Random
                const patterns = text.RESULT_A2.SCENARIO_A;
                const randomIndex = Math.floor(Math.random() * patterns.length);
                scenario = patterns[randomIndex];
            }
        }

        setResultScenario(scenario);
        setShowResultSummary(false);
    };

    const handleReset = () => {
        setCapturedPhotos([]);
        setPhase('capturing');
        setShowResultSummary(false);
        setShowTransition(true);
    };

    const revealedAreas = capturedPhotos.map(p => ({ x: p.x, y: p.y }));

    const capturedSpotIds = capturedPhotos.map(p => p.spotId).filter((id): id is string => !!id);
    const isEndingConditionMet = capturedSpotIds.includes('spot_a') && capturedSpotIds.includes('spot_b');

    const getPhotoInfo = (photo: Photo) => {
        if (!photo.spotId) {
            return {
                title: text.EPISODE_A2.NOTHING_TITLE,
                desc: text.EPISODE_A2.NOTHING_DESC
            };
        }
        const spot = SPOTS.find(s => s.id === photo.spotId);
        if (spot) {
            const ep = text.EPISODE_A2 as Record<string, string>;
            return {
                title: ep[spot.titleKey],
                desc: ep[spot.descKey]
            };
        }
        return { title: "Error", desc: "Unknown spot" };
    };

    return (
        <div className={styles.container}>
            {showTransition && (
                <EyeOpenTransition onComplete={() => setShowTransition(false)} />
            )}

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
                        <div className={styles.resultPhotos}>
                            {capturedPhotos.map((photo, index) => {
                                const info = getPhotoInfo(photo);
                                const spot = SPOTS.find(s => s.id === photo.spotId);
                                const isIncident = spot?.type === 'incident';

                                return (
                                    <div
                                        key={photo.id}
                                        className={`${styles.photoCard} ${isIncident ? styles.incidentPhoto : ''}`}
                                    >
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
                                flickerSoundSrc="/sounds/scenario_txt_bgm.mp3"
                            />
                        </div>


                        <button className={styles.resetButton} onClick={() => {
                            const currentUnlock = new URLSearchParams(window.location.search).get('unlock') || '';
                            const unlockSet = new Set(currentUnlock.split(',').filter(Boolean));
                            unlockSet.add('a2');

                            const newUnlock = Array.from(unlockSet).join(',');
                            router.push(`/?unlock=${newUnlock}`);
                        }} style={{ marginTop: '40px', color: '#000' }}>
                            {text.UI.BUTTON_TITLE_BACK}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
