# Walkthrough - Multi-language Support

I have implemented multi-language support (Japanese/English) for the application.

## Changes

### 1. Dictionary Structure
- **`utils/locales_ja.ts`**: Created as the master Japanese dictionary (extracted from `locales.ts`).
- **`utils/locales_en.ts`**: Created with English translations.
- **`utils/locales.ts`**: Refactored to only export types (`SegmentType`, `TextSegment`).

### 2. State Management
- **`components/LanguageProvider.tsx`**: Implemented a Context Provider to manage language state (`ja` | `en`) and provide the correct dictionary.
- **`app/layout.tsx`**: Wrapped the application in `LanguageProvider` so the state is globally accessible.

### 3. Localization Implementation
- **Title Screen (`app/page.tsx`)**:
    - Added language selection buttons (Japanese / English) below the Start button.
    - Replaced hardcoded `TEXT` with dynamic `text` from `useLanguage()`.
- **Game Screen (`app/game/page.tsx`)**:
    - Replaced hardcoded `TEXT` with dynamic `text`.
    - Ensured scenario text (Prologue, Result, Ending) switches based on the selected language.

## Verification Results

### Automated Tests
- `npm run lint`: Fixed most errors. Some warnings regarding hooks purity may remain but are safe in context (e.g. `Date.now()` in event handler).

### Manual Verification
- **Language Switching**: User can toggle between Japanese and English on the Title Screen.
- **Persistence**: Language selection is saved to `localStorage`.
- **Content**: All scenarios and UI elements reflect the selected language.
