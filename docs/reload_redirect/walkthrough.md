# Reload Redirect Implementation Walkthrough

I have implemented a mechanism to force users back to the title screen if they reload the game page (`/game`). This ensures the narrative flow always starts from the beginning.

## Implementation Details

### 1. Prologue (`app/page.tsx`)
- When the user clicks "Trace Memory" (記憶を辿る), a global flag `window.oktmGameStarted = true` is set.
- This flag persists during client-side navigation (SPA transitions) but is cleared when the browser page is reloaded.

### 2. Game Page (`app/game/page.tsx`)
- On component mount (`useEffect`), the system checks for `window.oktmGameStarted`.
- **If Flag is Missing**: The user is immediately redirected to the Title screen (`/`).
- **If Flag is Present**: The game continues normally.

*Note: Originally I used `sessionStorage`, but this caused issues in development (React Strict Mode) where the flag was consumed and removed prematurely. The `window` global approach is more robust for this specific "session persistence" requirement.*

## Verification
- Start from Title -> Prologue -> Enter Game. (Should work now)
- Reload the Game page. (Should redirect to Title)
- Copy the `/game` URL and open it in a new tab. (Should redirect to Title)

## Files Modified
- `app/page.tsx`
- `app/game/page.tsx`
