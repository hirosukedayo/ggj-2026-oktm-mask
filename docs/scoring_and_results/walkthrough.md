# Result Screen & Scoring System Walkthrough

## Changes Created
- **Scoring Logic**: Implemented `calculateScore` in `app/game/page.tsx` to award points (1-3) based on the distance from the center of the image.
- **State Management**: Added `GamePhase` state (`'capturing' | 'result'`) to manage the game flow.
- **Result UI**: Created a result overlay in `app/game/page.tsx` and styled it in `app/game/game.module.css`.
    - Displays 2 captured photos with individual scores.
    - Shows total score.
    - Displays a dynamic message based on the total score.
    - Includes a "Try Again" button to reset the game.

## Verification Results

### Automated Browser Test
A browser subagent was used to verify the entire flow:
1.  **Capture**: Successfully captured 2 photos by clicking near the center.
2.  **Result Screen**: Verified that the result screen appears automatically after the second photo.
3.  **Content**: Confirmed presence of photos, scores, and result message.
4.  **Reset**: Verified that clicking the reset button returns the game to the initial capture state.

### Visual Verification
The result screen displays with a dark overlay, gold text for scores, and a clean layout for the photos.

```ts
// Scoring Logic Example
const calculateScore = (x: number, y: number, width: number, height: number): number => {
    // ... distance calculation ...
    if (dist < 100) return 3;
    if (dist < 250) return 2;
    return 1;
};
```
