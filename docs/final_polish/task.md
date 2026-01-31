# Final Polish and Internationalization

- [x] Localize Ending Title Button <!-- id: 1 -->
    - [x] Update `utils/locales.ts` with "タイトルへ戻る"
    - [x] Update `app/game/page.tsx` to use the new key
- [x] Update Global Font to Mincho & Smaller Size <!-- id: 2 -->
    - [x] Configure `app/layout.tsx` with `Noto Serif JP`
    - [x] Update `app/globals.css` to use Serif font
    - [x] Reduce base font size and adjust headings for a "poetic" feel
- [x] Refine Result Scene Photos <!-- id: 3 -->
    - [x] Remove title and description from photo display in `app/game/page.tsx`
    - [x] Adjust CSS if necessary to center photos or fix spacing
- [x] Update Audio Reference <!-- id: 4 -->
    - [x] Change `cam1.mp3` to `recall1.mp3` in `components/MaskCamera/MaskCamera.tsx`
