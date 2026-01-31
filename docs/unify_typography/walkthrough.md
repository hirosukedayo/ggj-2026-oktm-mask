# Unify Typography Walkthrough

I have unified the game's typography to ensure a consistent "poetic" feel using the Mincho font across all scenes, including the Prologue.

## Changes

### 1. Font Family (Prologue)
- Removed the local font override in `app/page.module.css`.
- The Prologue now inherits the global **Noto Serif JP** font defined in `globals.css` / `layout.tsx`.

### 2. Font Sizing (Result & Ending)
- **Body Text**: Increased from `0.95rem` to **`1.1rem`** in both the Result message and Ending description to match the Prologue and Conversation text size.
- **Ending Title**: Maintained at **`2.2rem`** as requested.

## Verification
- **Prologue**: Check that the title and buttons are now rendered in Mincho (Serif).
- **Result/Ending**: Check that the descriptive text is slightly larger (`1.1rem`) and consistent with the rest of the game.

## Files Modified
- `app/page.module.css`
- `app/game/game.module.css`
