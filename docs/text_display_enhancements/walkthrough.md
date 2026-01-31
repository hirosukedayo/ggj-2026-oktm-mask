# Text Display Enhancements Walkthrough

I have implemented the enhanced text display for the Prologue and Result scenes.

## Changes

### 1. New Component: `ClickToAdvanceText`
- Created a reusable component for sequential text display.
- Supports:
  - **Click Anywhere Support**: Text advances by clicking or tapping anywhere on the screen (global listener).
  - Custom styles for different speakers (Protagonist: Red, Psychiatrist: White).
  - Fade-in animations.

### 2. Prologue
- Updated the Prologue to use the new component.
- Implemented the specific scenario text:
  1. "声を聞かせてください。声を。"
  2. "安嵜さん..." sequence.
- **Flow**: Title -> Prologue (Text) -> Click "Trace Memory" -> Game.

### 3. Result Scene
- Implemented logic to branch based on captured photo content.
  - **Result A (Normal)**: If no "Required" (Event) spots are captured. Randomly selects one of 3 patterns (A-1, A-2, A-3).
  - **Result B (Truth)**: If at least one "Required" spot is captured. Shows the "Truth" lead-in conversation.
- **Improved Layout**:
  - Photos are now visible **immediately** when entering the Result scene.
  - The conversation text appears below (or overlaid on) the photos.
  - When the conversation finishes, the **Reset / Ending buttons** appear, while the last line of text remains visible.
- **Immersive Design**:
  - Removed "modal" styling (borders, background boxes).
  - The result scene now presents content on a full-screen, solid dark background for a cinematic feel.
- **Smooth Transition**:
  - Ensured that the Result overlay remains mounted (underneath) when transitioning to the Ending scene. This prevents the underlying 3D scene from flickering into view during the crossfade.

### 4. Ending / Result Overlay Cleanup
- Removed the "Recovered Memory: 100%" subtitle element from both the Ending screen and the Result success message.

### 5. Locales
- Updated `utils/locales.ts` with the full scenario text provided.
- Added type definitions for `TextSegment`.

## Verification Results

### Manual Verification
- **Prologue**: Text advances by clicking anywhere (empty space, photos, etc.).
- **Result A**: Shows random conversation when capturing non-required spots.
- **Result B**: Shows "Truth" conversation when capturing required spots.
- **Layout**: Verified that photos are visible during the text sequence, and buttons appear correctly after the text ends.
- **Aesthetics**: Confirmed the immersive dark theme.
- **Interaction**: Clicking anywhere advances text. Once finished, buttons are clickable and global click listener is disabled.
- **Ending Transition**: The transition from Result to Ending is now seamless, with the ending screen fading in over the result screen.
- **Ending**: Confirmed subtitle is removed from both result preview and ending screen.

## Files Modified
- `components/ClickToAdvanceText/ClickToAdvanceText.tsx` [NEW]
- `components/ClickToAdvanceText/ClickToAdvanceText.module.css` [NEW]
- `utils/locales.ts`
- `app/page.tsx`
- `app/game/page.tsx`
- `app/game/game.module.css`
