"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { SCENARIO_BGM_VOLUME, MAIN_BGM_VOLUME } from "@/utils/audioConfig";

type Phase = 'main' | 'ending';

export default function XScenarioPage() {
    const router = useRouter();
    const { text } = useLanguage();
    const [phase, setPhase] = useState<Phase>('main');
    const [showButton, setShowButton] = useState(false);

    // Route guard: Redirect to title if not started via prologue
    React.useEffect(() => {
        // @ts-expect-error
        const hasStarted = typeof window !== 'undefined' && window.oktmGameStartedX;

        if (!hasStarted) {
            router.replace('/?unlock=a,e,a2,n');
        }
    }, [router]);

    // Main BGM
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

    // Ending BGM (Scenario Text BGM) - only plays during 'ending' phase if needed, 
    const handleMainComplete = () => {
        setShowButton(true);
    };

    const handleGoToEnding = () => {
        setPhase('ending');
    };

    return (
        <div className={styles.container}>
            {phase === 'main' && (
                <div className={styles.textContainer}>
                    <ClickToAdvanceText
                        segments={text.RESULT_X.SCENARIO_MAIN[0]}
                        onComplete={handleMainComplete}
                        className=""
                        finished={showButton}
                        flickerSoundSrc="/sounds/scenario_txt_bgm.mp3"
                    />
                    {showButton && (
                        <button className={styles.actionButton} onClick={handleGoToEnding}>
                            {text.UI.BUTTON_ENDING}
                        </button>
                    )}
                </div>
            )}

            {phase === 'ending' && (
                <div className={styles.endingContainer}>
                    <h1 className={styles.endingTitle}>{text.ENDING_X.TITLE}</h1>
                    <p className={styles.endingDescription}>{text.ENDING_X.DESCRIPTION}</p>
                    <p className={styles.credits}>{text.ENDING_X.CREDITS}</p>

                    <button className={styles.resetButton} onClick={() => {
                        const currentUnlock = new URLSearchParams(window.location.search).get('unlock') || '';
                        const unlockSet = new Set(currentUnlock.split(',').filter(Boolean));
                        unlockSet.add('x');

                        const newUnlock = Array.from(unlockSet).join(',');
                        router.push(`/?unlock=${newUnlock}`);
                    }} style={{ marginTop: '40px' }}>
                        {text.UI.BUTTON_TITLE_BACK}
                    </button>
                </div>
            )}
        </div>
    );
}
