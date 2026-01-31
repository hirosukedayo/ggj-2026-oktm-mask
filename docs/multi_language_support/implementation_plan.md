# Implementation Plan - Multi-language Support

We will implement multi-language support (Japanese/English), using the existing Japanese text as the master.

## User Review Required
- [ ] Confirm English translations (Automated translations will be used initially).
- [ ] Language switching UI placement on Title Screen.

## Proposed Changes

### Locales Structure
#### [NEW] `utils/locales_ja.ts`
- Renamed from existing `utils/locales.ts`.
- Exports `TEXT_JA`.

#### [NEW] `utils/locales_en.ts`
- New file with English translations.
- Exports `TEXT_EN`.

#### [MODIFY] `utils/locales.ts`
- Re-export types.
- potentially removed or changed to export a helper or type.

### State Management
#### [NEW] `components/LanguageProvider.tsx`
- Context: `LanguageContext`.
- State: `language` ('ja' | 'en').
- Value: `text` (current dictionary), `setLanguage`.
- Persist formatting or choices in `localStorage` (optional for now, but good practice).

### Components
#### [MODIFY] `app/layout.tsx`
- Wrap application in `<LanguageProvider>`.

#### [MODIFY] `app/page.tsx` (Title Screen)
- Import `useLanguage`.
- Add Language Selector (Buttons: "日本語" / "English").
- Replace `TEXT` usages with `text` from context.

#### [MODIFY] `app/game/page.tsx`
- Import `useLanguage`.
- Replace `TEXT` usages with `text` from context.

#### [MODIFY] `components/MaskCamera/MaskCamera.tsx`
- Remove unused `TEXT` import.

## Verification Plan

### Automated Tests
- Build test: `npm run build` to check for type errors.
- Lint: `npm run lint`.

### Manual Verification
- Start app (`npm run dev`).
- Switch language on Title Screen.
- Verify Title text changes.
- Start Game.
- Verify Prologue text changes.
- Verify Game UI text changes.
- Verify Result/Ending text changes.
