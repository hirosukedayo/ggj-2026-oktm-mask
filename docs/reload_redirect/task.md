# Force Title Redirect on Reload

- [x] Implement Session Flag in Prologue <!-- id: 1 -->
    - [x] Update `app/page.tsx` to set `gameState='started'` in sessionStorage before navigation.
- [x] Implement Route Guard in Game Page <!-- id: 2 -->
    - [x] Update `app/game/page.tsx` to check for `gameState='started'`.
    - [x] If missing, `router.replace('/')`.
    - [x] If present, `sessionStorage.removeItem('gameState')` (to ensure reload triggers redirect).
- [x] Fix Strict Mode Issue (User Report) <!-- id: 3 -->
    - [x] Replace `sessionStorage` logic with `window` global state or module state to handle Strict Mode and Reloads correctly.
