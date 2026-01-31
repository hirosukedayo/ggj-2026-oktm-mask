"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ... imports ...
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { TEXT } from "@/utils/locales";

export default function Home() {
  const [step, setStep] = useState<'title' | 'prologue'>('title');
  const [showPrologueButton, setShowPrologueButton] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    setStep('prologue');
    // Button will be shown after text completion
  };

  const handlePrologueClick = () => {
    router.push('/game');
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {step === 'title' ? (
          <>
            <h1 className={styles.title} style={{ whiteSpace: 'pre-wrap' }}>
              {TEXT.TITLE_SCREEN.TITLE}
            </h1>
            <p className={styles.description}>
              {TEXT.TITLE_SCREEN.DESCRIPTION}
            </p>

            <div className={styles.actions}>
              <button onClick={handleStart} className={styles.button}>
                {TEXT.TITLE_SCREEN.BUTTON_START}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.prologueContainer}>
            {!showPrologueButton ? (
              <ClickToAdvanceText
                segments={TEXT.PROLOGUE.SEGMENTS}
                onComplete={() => setShowPrologueButton(true)}
              />
            ) : (
              <div className={styles.buttonWrapper}>
                <button
                  onClick={handlePrologueClick}
                  className={`${styles.button} ${styles.fadeIn}`}
                >
                  {TEXT.PROLOGUE.BUTTON_ACTION}
                </button>
              </div>
            )}
          </div>
        )}
      </main >
    </div >
  );
}

