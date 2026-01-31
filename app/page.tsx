"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ... imports ...
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const [step, setStep] = useState<'title' | 'prologue'>('title');
  const [showPrologueButton, setShowPrologueButton] = useState(false);
  const router = useRouter();
  const { text, setLanguage, language } = useLanguage();

  const handleStart = () => {
    setStep('prologue');
    // Button will be shown after text completion
  };

  const handlePrologueClick = () => {
    // Use window global to track state. This persists on soft nav, dies on reload.
    // @ts-expect-error
    window.oktmGameStarted = true;
    router.push('/game');
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {step === 'title' ? (
          <>
            <h1 className={styles.title} style={{ whiteSpace: 'pre-wrap' }}>
              {text.TITLE_SCREEN.TITLE}
            </h1>
            <p className={styles.description}>
              {text.TITLE_SCREEN.DESCRIPTION}
            </p>

            <div className={styles.actions}>
              <button onClick={handleStart} className={styles.button}>
                {text.TITLE_SCREEN.BUTTON_START}
              </button>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setLanguage('ja')}
                  style={{ opacity: language === 'ja' ? 1 : 0.5, textDecoration: language === 'ja' ? 'underline' : 'none', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  日本語
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  style={{ opacity: language === 'en' ? 1 : 0.5, textDecoration: language === 'en' ? 'underline' : 'none', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  English
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.prologueContainer}>
            <div className={styles.prologueContainer}>
              <ClickToAdvanceText
                segments={text.PROLOGUE.SEGMENTS}
                onComplete={() => setShowPrologueButton(true)}
                finished={showPrologueButton}
                className={showPrologueButton ? styles.textFinished : ''}
              />

              {showPrologueButton && (
                <div className={styles.buttonWrapper}>
                  <button
                    onClick={handlePrologueClick}
                    className={`${styles.button} ${styles.fadeIn}`}
                  >
                    {text.PROLOGUE.BUTTON_ACTION}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main >
    </div >
  );
}

