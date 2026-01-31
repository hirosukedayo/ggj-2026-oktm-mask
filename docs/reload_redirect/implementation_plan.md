# Implementation Plan - Force Title Redirect

## Goal
Ensure that if the user reloads the `/game` page directly, they are redirected back to the title screen (`/`). This ensures the game is always played from the beginning (Title -> Prologue).

## Proposed Changes

### Prologue
#### [MODIFY] [app/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/page.tsx)
- In `handlePrologueClick`, set a flag in `sessionStorage`:
  ```javascript
  sessionStorage.setItem('oktm_game_started', 'true');
  ```

### Game Page
#### [MODIFY] [app/game/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- Add a `useEffect` hook on mount.
- Check for `sessionStorage.getItem('oktm_game_started')`.
- If the flag is **missing**:
  - `router.replace('/')`
  - Return `null` or a loading state to prevent game render.
- If the flag is **present**:
  - `sessionStorage.removeItem('oktm_game_started')` (Consume the flag so a subsequent reload fails).

## Verification
1. Start at Title -> Prologue -> Enter Game. Game should load.
2. Reload the Game page. Should redirect to Title.
3. Try accessing `/game` directly URL bar. Should redirect to Title.
