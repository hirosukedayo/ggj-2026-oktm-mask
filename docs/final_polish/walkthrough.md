# Final Polish and Internationalization Walkthrough

I have implemented the final polish requests to enhance the game's atmosphere and complete the localization.

## Changes

### 1. Localization & Text
- **Ending Button**: Changed the button text from "Title" to **"タイトルへ戻る"** (Back to Title).
- **Photo Descriptions**: Removed the title and description text from the photo display in the Result scene. Now, only the captured photo is displayed, creating a cleaner look.
- **Refined Result Text**: Removed the "まだ足りない記憶があるようだ..." message from the result summary to simplify the presentation.
- **Instruction Text**: configured "Click anywhere to continue" to disappear once the scenario text is fully displayed.

### 2. Atmosphere & Typography
- **Global Font**: Switched the entire application's font to **"Noto Serif JP" (Mincho)** to create a more poetic and settled atmosphere.
- **Font Sizing**:
  - Reduced the base font size (`14px`) and increased line height (`1.8`) for better readability and elegance.
  - Adjusted heading sizes in the Result and Ending scenes to be less aggressive and more refined (`3rem` -> `2.2rem`, etc.).
  - Updated `ClickToAdvanceText` component to match the new style.

### 3. Audio
- **Capture Sound**: Updated the camera capture sound effect from `cam1.mp3` to `recall1.mp3`, aligning with the "memory recall" theme.

## Manual Verification Checklist
- [ ] **Ending Screen**: Check that the button says "タイトルへ戻る".
- [ ] **Result Screen**: Confirm that photos are displayed without any text overlay or subtitles below them.
- [ ] **Result Summary**: Confirm that "まだ足りない記憶があるようだ..." does NOT appear.
- [ ] **Instruction**: Confirm "Click anywhere to continue" is hidden when buttons appear.
- [ ] **Audio**: Capture a photo and confirm the new sound effect plays.
- [ ] **Typography**: Verify that the text throughout the game (Prologue, Game, Result, Ending) is rendered in a Mincho/Serif font and feels "poetic".

## Files Modified
- `utils/locales.ts`
- `app/game/page.tsx`
- `app/game/game.module.css`
- `app/layout.tsx`
- `app/globals.css`
- `components/MaskCamera/MaskCamera.tsx`
- `components/ClickToAdvanceText/ClickToAdvanceText.module.css`
- `components/ClickToAdvanceText/ClickToAdvanceText.tsx`
