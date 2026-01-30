# Game Image & Atmosphere Update

## Changes Created
- **Image Resource**: Replaced the main game image with `Okutama_Bteam_mock.png`, moved to `public/images/`.
- **Atmosphere**: Updated `locales.ts` to use more poetic, introspective language for the Prologue.
    - "深い霧の向こうに..." (Beyond the deep fog...) instead of simple descriptive text.
- **UI Cleanup**: Removed numerical score displays from the Result screen in `app/game/page.tsx` to focus on the narrative and visual feedback only.

## Verification Results

### Automated Browser Test
A browser subagent verified the updates:
1.  **Prologue**: Confirmed new poetic text is displayed.
2.  **Visuals**: Verified the game now uses the new background image.
3.  **Result Screen**: Confirmed that **numerical scores are NO LONGER visible**. Only photographic results and the story message are shown.
4.  **Flow**: Confirmed the game flow (Capture -> Result -> Ending/Reset) still functions correctly without the score numbers.

### Key Code Changes
```ts
// utils/locales.ts (Prologue)
PROLOGUE: {
    LINE_1: "深い霧の向こうに、\n置き忘れた景色がある。",
    // ...
}
```

```tsx
// app/game/page.tsx (Result Screen)
// Removed: <p>{TEXT.RESULT.SCORE_LABEL}: {photo.score}</p>
// Removed: <h3>{TEXT.RESULT.TOTAL_SCORE_LABEL}: {totalScore}</h3>
```
