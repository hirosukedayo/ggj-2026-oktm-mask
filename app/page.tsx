"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { useLanguage } from "@/components/LanguageProvider";

type Step = 'title' | 'prologue_y' | 'prologue_e' | 'prologue_a' | 'prologue_m' | 'prologue_x';

function HomeContent() {
  const [step, setStep] = useState<Step>('title');
  const [showPrologueButton, setShowPrologueButton] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { text, setLanguage, language } = useLanguage();

  // Check unlock status via URL parameter
  const unlockParam = searchParams.get('unlock') ?? '';
  const isYUnlocked = unlockParam.includes('y');
  const isEUnlocked = unlockParam.includes('e');
  const isAUnlocked = unlockParam.includes('a');
  const isMUnlocked = unlockParam.includes('m');
  const isXUnlocked = unlockParam.includes('x');

  const handleStartY = () => {
    setStep('prologue_y');
    setShowPrologueButton(false);
  };

  const handleStartE = () => {
    setStep('prologue_e');
    setShowPrologueButton(false);
  };

  const handleStartA = () => {
    setStep('prologue_a');
    setShowPrologueButton(false);
  };

  const handleStartM = () => {
    setStep('prologue_m');
    setShowPrologueButton(false);
  };

  const handleStartX = () => {
    setStep('prologue_x');
    setShowPrologueButton(false);
  };

  const handlePrologueClickY = () => {
    // @ts-expect-error
    window.oktmGameStarted = true;
    router.push('/y');
  };

  const handlePrologueClickE = () => {
    // @ts-expect-error
    window.oktmGameStartedE = true;
    router.push('/e');
  };

  const handlePrologueClickA = () => {
    // @ts-expect-error
    window.oktmGameStartedA = true;
    router.push('/a');
  };

  const handlePrologueClickM = () => {
    // @ts-expect-error
    window.oktmGameStartedM = true;
    router.push('/m');
  };

  const handlePrologueClickX = () => {
    // @ts-expect-error
    window.oktmGameStartedX = true;
    router.push('/x');
  };

  const getCurrentPrologue = () => {
    switch (step) {
      case 'prologue_e': return text.PROLOGUE_E;
      case 'prologue_a': return text.PROLOGUE_A;
      case 'prologue_m': return text.PROLOGUE_M;
      case 'prologue_x': return text.PROLOGUE_X;
      default: return text.PROLOGUE;
    }
  };

  const getCurrentPrologueClick = () => {
    switch (step) {
      case 'prologue_e': return handlePrologueClickE;
      case 'prologue_a': return handlePrologueClickA;
      case 'prologue_m': return handlePrologueClickM;
      case 'prologue_x': return handlePrologueClickX;
      default: return handlePrologueClickY;
    }
  };

  const currentPrologue = getCurrentPrologue();
  const handlePrologueClick = getCurrentPrologueClick();

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
              {isYUnlocked ? (
                // Scenario Selection Mode
                <div className={styles.scenarioList}>
                  <button
                    onClick={handleStartY}
                    className={`${styles.button} ${styles.scenarioButton} ${styles.completed}`}
                  >
                    ☑ {text.TITLE_SCREEN.SCENARIO_Y}
                  </button>
                  <button
                    onClick={handleStartE}
                    className={`${styles.button} ${styles.scenarioButton} ${isEUnlocked ? styles.completed : ''}`}
                  >
                    {isEUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_E}
                  </button>
                  {isEUnlocked && (
                    <button
                      onClick={handleStartA}
                      className={`${styles.button} ${styles.scenarioButton} ${isAUnlocked ? styles.completed : ''}`}
                    >
                      {isAUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_A}
                    </button>
                  )}
                  {isAUnlocked && (
                    <button
                      onClick={handleStartM}
                      className={`${styles.button} ${styles.scenarioButton} ${isMUnlocked ? styles.completed : ''}`}
                    >
                      {isMUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_M}
                    </button>
                  )}
                  {isMUnlocked && (
                    <button
                      onClick={handleStartX}
                      className={`${styles.button} ${styles.scenarioButton} ${isXUnlocked ? styles.completed : ''}`}
                    >
                      {isXUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_X}
                    </button>
                  )}
                </div>
              ) : (
                // Normal Start Mode
                <button onClick={handleStartY} className={styles.button}>
                  {text.TITLE_SCREEN.BUTTON_START}
                </button>
              )}

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
                segments={currentPrologue.SEGMENTS}
                onComplete={() => setShowPrologueButton(true)}
                finished={showPrologueButton}
                className={showPrologueButton ? styles.textFinished : ''}
                flickerSoundSrc="/sounds/scenario_txt_bgm.mp3"
              />

              {showPrologueButton && (
                <div className={styles.buttonWrapper}>
                  <button
                    onClick={handlePrologueClick}
                    className={`${styles.button} ${styles.fadeIn} ${styles.redText}`}
                  >
                    {currentPrologue.BUTTON_ACTION}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className={styles.page}><main className={styles.main}>Loading...</main></div>}>
      <HomeContent />
    </Suspense>
  );
}
