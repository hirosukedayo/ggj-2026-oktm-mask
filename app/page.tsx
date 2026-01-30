"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ... imports ...
import { TEXT } from "@/utils/locales";

export default function Home() {
  const [step, setStep] = useState<'title' | 'prologue'>('title');
  const [showPrologueButton, setShowPrologueButton] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    setStep('prologue');
    setTimeout(() => {
      setShowPrologueButton(true);
    }, 3000);
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
            <div className={styles.prologueText}>
              <p>{TEXT.PROLOGUE.LINE_1}</p>
              <br />
              <p>{TEXT.PROLOGUE.LINE_2}</p>
              <br />
              <p>{TEXT.PROLOGUE.LINE_3}</p>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                onClick={handlePrologueClick}
                disabled={!showPrologueButton}
                className={`${styles.button} ${showPrologueButton ? styles.fadeIn : styles.hiddenState}`}
              >
                {TEXT.PROLOGUE.BUTTON_ACTION}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

