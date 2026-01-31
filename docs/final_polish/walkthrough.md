# Final Polish and Internationalization Walkthrough

I have implemented the final polish requests to enhance the game's atmosphere and complete the localization.

## Changes

### 1. Localization & Text
- **Ending Title**: Updated to match the Game Title ("2005年6月13日...").
- **Ending Button (Result Phase)**: Changed "真実の記憶へ" to **"全て思い出す"** (Remember Everything).
- **Back to Title (Ending Phase)**: Changed "Title" to **"タイトルへ戻る"**.
- **Photo Descriptions**: Removed the title and description text from the photo display in the Result scene. Now, only the captured photo is displayed, creating a cleaner look.
- **Refined Result Text**: Removed the "まだ足りない記憶があるようだ..." message from the result summary to simplify the presentation.
- **Instruction Text**: configured "Click anywhere to continue" to disappear once the scenario text is fully displayed.

### 2. Atmosphere & Typography
- **Global Font**: Switched the entire application's font to **"Noto Serif JP" (Mincho)**.
    - Included the Prologue scene in this change by removing its custom font override.
- **Font Sizing**:
  - Unified body text size to **`1.1rem`** across Result and Ending scenes to match the Prologue.
  - Reduced heading sizes in Result (`2.5rem` for titles).
  - Maintained Ending Title size at `2.2rem`.

### 3. Audio & Logic
- **Capture Sound**: Updated the camera capture sound effect from `cam1.mp3` to `recall1.mp3`.
- **Reload Logic**: Implemented a forced redirect to the Title screen upon reloading the Game page via `window` state.

## Manual Verification Checklist
- [ ] **Ending Screen**: Check that the title matches the Game Title.
- [ ] **Result Screen (Success)**: Check that the button says "全て思い出す".
- [ ] **Typography**: Confirmed Mincho font and consistent sizing.
- [ ] **Reload Behavior**: Confirmed redirect logic.

## Files Modified
- `utils/locales.ts`
- `app/game/page.tsx`
- `app/game/game.module.css`
- `app/page.tsx`
- `app/page.module.css`
- `app/layout.tsx`
- `app/globals.css`
- `components/MaskCamera/MaskCamera.tsx`
- `components/ClickToAdvanceText/ClickToAdvanceText.tsx`
