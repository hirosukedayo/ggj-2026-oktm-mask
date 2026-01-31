"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { ClickToAdvanceText } from "@/components/ClickToAdvanceText/ClickToAdvanceText";
import { useLanguage } from "@/components/LanguageProvider";

type Step = 'title' | 'prologue_a' | 'prologue_e' | 'prologue_a2' | 'prologue_n' | 'prologue_x';

function HomeContent() {
  const [step, setStep] = useState<Step>('title');
  const [showPrologueButton, setShowPrologueButton] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { text, setLanguage, language } = useLanguage();

  // Check unlock status via URL parameter
  const unlockParam = searchParams.get('unlock') ?? '';
  // Anzaki (old Y) -> a
  const isAUnlocked = unlockParam.includes('a') && !unlockParam.includes('a2'); // 'a' might match 'a2', need careful check or split. 
  // Wait, .includes('a') will match 'a2'. Better split by comma.
  const unlockedList = unlockParam.split(',');
  const isAnzakiUnlocked = unlockedList.includes('a');
  const isEndoUnlocked = unlockedList.includes('e');
  const isAshidaUnlocked = unlockedList.includes('a2');
  const isNashiroUnlocked = unlockedList.includes('n');
  const isPlayerUnlocked = unlockedList.includes('x');

  const handleStartAnzaki = () => {
    setStep('prologue_a');
    setShowPrologueButton(false);
  };

  const handleStartEndo = () => {
    setStep('prologue_e');
    setShowPrologueButton(false);
  };

  const handleStartAshida = () => {
    setStep('prologue_a2');
    setShowPrologueButton(false);
  };

  const handleStartNashiro = () => {
    setStep('prologue_n');
    setShowPrologueButton(false);
  };

  const handleStartPlayer = () => {
    setStep('prologue_x');
    setShowPrologueButton(false);
  };

  const handlePrologueClickAnzaki = () => {
    // @ts-expect-error Global flag for route guard
    window.oktmGameStartedA = true;
    router.push('/a');
  };

  const handlePrologueClickEndo = () => {
    // @ts-expect-error Global flag for route guard
    window.oktmGameStartedE = true;
    router.push('/e');
  };

  const handlePrologueClickAshida = () => {
    // @ts-expect-error Global flag for route guard
    window.oktmGameStartedA2 = true;
    router.push('/a2');
  };

  const handlePrologueClickNashiro = () => {
    // @ts-expect-error Global flag for route guard
    window.oktmGameStartedN = true;
    router.push('/n');
  };

  const handlePrologueClickPlayer = () => {
    // @ts-expect-error Global flag for route guard
    window.oktmGameStartedX = true;
    router.push('/x');
  };

  const getCurrentPrologue = () => {
    switch (step) {
      case 'prologue_e': return text.PROLOGUE_E;
      case 'prologue_a2': return text.PROLOGUE_A2;
      case 'prologue_n': return text.PROLOGUE_N;
      case 'prologue_x': return text.PROLOGUE_X;
      default: return text.PROLOGUE_A; // Default to Anzaki (was PROLOGUE)
    }
  };

  const getCurrentPrologueClick = () => {
    switch (step) {
      case 'prologue_e': return handlePrologueClickEndo;
      case 'prologue_a2': return handlePrologueClickAshida;
      case 'prologue_n': return handlePrologueClickNashiro;
      case 'prologue_x': return handlePrologueClickPlayer;
      default: return handlePrologueClickAnzaki;
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
              {isAnzakiUnlocked ? (
                // Scenario Selection Mode
                <div className={styles.scenarioList}>
                  <button
                    onClick={handleStartAnzaki}
                    className={`${styles.button} ${styles.scenarioButton} ${styles.completed}`}
                  >
                    ☑ {text.TITLE_SCREEN.SCENARIO_A}
                  </button>
                  <button
                    onClick={handleStartEndo}
                    className={`${styles.button} ${styles.scenarioButton} ${isEndoUnlocked ? styles.completed : ''}`}
                  >
                    {isEndoUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_E}
                  </button>
                  {isEndoUnlocked && (
                    <button
                      onClick={handleStartAshida}
                      className={`${styles.button} ${styles.scenarioButton} ${isAshidaUnlocked ? styles.completed : ''}`}
                    >
                      {isAshidaUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_A2}
                    </button>
                  )}
                  {isAshidaUnlocked && (
                    <button
                      onClick={handleStartNashiro}
                      className={`${styles.button} ${styles.scenarioButton} ${isNashiroUnlocked ? styles.completed : ''}`}
                    >
                      {isNashiroUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_N}
                    </button>
                  )}
                  {isNashiroUnlocked && (
                    <button
                      onClick={handleStartPlayer}
                      className={`${styles.button} ${styles.scenarioButton} ${isPlayerUnlocked ? styles.completed : ''}`}
                    >
                      {isPlayerUnlocked ? '☑' : '☐'} {text.TITLE_SCREEN.SCENARIO_X}
                    </button>
                  )}
                </div>
              ) : (
                // Normal Start Mode
                <button onClick={handleStartAnzaki} className={styles.button}>
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
