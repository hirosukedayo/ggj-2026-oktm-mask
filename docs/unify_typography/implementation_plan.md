# Implementation Plan - Unify Typography

## Goal
Unify the application's typography by ensuring "Noto Serif JP" is used everywhere (including Prologue) and aligning body text sizes in Result/Ending to match the Prologue's sizing, while checking strictly that the Ending Title size remains unchanged.

## Proposed Changes

### 1. Fix Font Family Inconsistency
#### [MODIFY] [app/page.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/page.module.css)
- **Remove** `font-family: var(--font-geist-sans, sans-serif);` from `.page`.
- This ensures the Prologue inherits the global `Noto Serif JP` set in `globals.css`.

### 2. Unify Body Text Sizes (Match Prologue/CAT)
*Reference: `ClickToAdvanceText` is ~1.1rem. Prologue `description` is 1.5rem, `prologueText` is 1.2rem.*

#### [MODIFY] [app/game/game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- `.resultMessage`:
  - Change `font-size`: `0.95rem` -> **1.1rem** (Matches standard text flow).
  - Ensure `line-height: 2.0` (Already set, nice).
- `.endingDescription`:
  - Change `font-size`: `1.0rem` -> **1.1rem**.
- `.credits`:
  - Keep small or slightly adjust to `0.9rem`.

### 3. Ending Title
- **NO CHANGE**: Keep `.endingTitle` font size as is (`2.2rem`).

## Verification
- Verify Prologue uses Serif font.
- Verify Result/Ending use Serif font.
- Verify Result/Ending body text is readable and consistent with Prologue text.
