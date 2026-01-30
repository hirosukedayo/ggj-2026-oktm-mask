"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
            <h1 className={styles.title}>2005年6月13日<br />香川県善通寺未解決暴動事件</h1>
            <p className={styles.description}>
              Okutama Game Jam 2026 - Team B
            </p>

            <div className={styles.actions}>
              <button onClick={handleStart} className={styles.button}>
                Start
              </button>
            </div>
          </>
        ) : (
          <div className={styles.prologueContainer}>
            <div className={styles.prologueText}>
              <p>その日、街は静寂に包まれていた。</p>
              <br />
              <p>しかし、カメラだけが真実を知っていた。</p>
              <br />
              <p>隠された痕跡を探せ。</p>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                onClick={handlePrologueClick}
                disabled={!showPrologueButton}
                className={`${styles.button} ${showPrologueButton ? styles.fadeIn : styles.hiddenState}`}
              >
                調査を開始する
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
