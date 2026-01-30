# Ending Transition & Full Localization

## Changes Created
- **Ending Transition**: Implemented a transition to the "Ending" screen when the player achieves a perfect score (Total: 6).
    - Added `ending` phase to `GamePage`.
    - Added conditional button ("真実の記憶へ") in Result screen.
    - Implemented Ending Overlay with special styling.
- **Full Localization**: Completed the dictionary (`locales.ts`) to cover the entire application.
    - Title Screen & Prologue (`app/page.tsx`).
    - Game UI & Results (`app/game/page.tsx`).
    - Ending Screen.

## Verification Results

### Automated Browser Test
A browser subagent verified the full flow:
1.  **Title/Prologue**: Verified text loaded from dictionary and navigation works.
2.  **Gameplay**: Successfully achieved a score of 6 by targeting the center.
3.  **Result Screen**: "真実の記憶へ" button appeared as expected.
4.  **Ending**: Transitioned to the ending screen ("THE TRUTH") correctly.
5.  **Reset**: Returned to title screen successfully.

### Key Logic
```ts
// app/game/page.tsx
{totalScore >= 6 ? (
    <button
        className={`${styles.resetButton} ${styles.endingButton}`}
        onClick={() => setPhase('ending')}
    >
        {TEXT.UI.BUTTON_ENDING}
    </button>
) : (
    // ... normal reset button
)}
```
