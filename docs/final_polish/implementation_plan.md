# Implementation Plan - Final Polish

## Goal
Update the application to use "Mincho" (Serif) fonts globally with a smaller, more poetic sizing. Localize the Ending scene's "Title" button to "タイトルへ戻る", simplify the Result scene by removing photo descriptions, and update the audio sound effect.

## Proposed Changes

### Localization
#### [MODIFY] [locales.ts](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/utils/locales.ts)
- Add `BUTTON_TITLE_BACK: "タイトルへ戻る"` to `UI` section.

#### [MODIFY] [page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- Replace hardcoded "Title" text with `TEXT.UI.BUTTON_TITLE_BACK`.

### Styling (Font & Size)
#### [MODIFY] [layout.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/layout.tsx)
- Import `Noto_Serif_JP` from `next/font/google`.
- Apply the variable globally.

#### [MODIFY] [globals.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/globals.css)
- Update `body` font-family to prioritize the new Serif font.
- Reduce base font size (e.g., to `0.9rem` or `14px`) and line-height for a cleaner look.

#### [MODIFY] [ClickToAdvanceText.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/ClickToAdvanceText/ClickToAdvanceText.module.css)
- Adjust font sizes for conversation text to align with the "smaller, poetic" direction.

### Result Scene Refinement
#### [MODIFY] [page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- Remove the rendering of `info.title` and `info.desc` in the `resultPhotos` map loop.
- Only display the image.

#### [MODIFY] [game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- Remove `photoText` styles.
- Ensure `photoCard` layout works well with just the image.

### Audio Update
#### [MODIFY] [MaskCamera.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/components/MaskCamera/MaskCamera.tsx)
- Update audio source from `/se/cam1.mp3` to `/se/recall1.mp3` (assuming path structure, verify grep result).

## Verification
- Check Ending screen button text is "タイトルへ戻る".
- Verify global font is Mincho/Serif.
- Verify font sizes are slightly smaller and feel "calm".
- Verify result screen only shows photos.
- Verify the shutter/capture sound plays `recall1.mp3`.
