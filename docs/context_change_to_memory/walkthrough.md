# Game Context Update: Memory Recall

## Changes Created
- **Context Change**: Updated the game concept from taking photos to recalling memories.
    - Updated text in `MaskCamera` (Reticle: "RECALL").
    - Updated text in `GamePage` (Result screen: "記憶の復元完了", "Clarity", "記憶の同期率", etc.).
- **Localization**: Created `utils/locales.ts` to manage all text resources.
    - Refactored `MaskCamera` and `GamePage` to use this dictionary.
    - Added support for long text messages in result screen via CSS (`white-space: pre-wrap`).

## Verification Results

### Automated Browser Test
A browser subagent verified the updated texts and flow:
1.  **Initial View**: Reticle displays "RECALL".
2.  **Result Screen**:
    - Title is "記憶の復元完了".
    - Scores are labeled "Clarity" and "記憶の同期率".
    - Result messages are long, story-driven texts.
    - Reset button says "もう一度思い出す".
3.  **Flow**: Game calculates score and resets correctly.

### Code Example (Localization)
```ts
// utils/locales.ts
export const TEXT = {
  UI: {
    RETICLE_CAPTURE: "RECALL",
    // ...
  },
  RESULT: {
    TITLE: "記憶の復元完了",
    // ...
  }
};
```
