# Implement BGM for Text Scenarios

## Goal Description
Play `scenario_txt_bgm.mp3` on loop during Prologue and Result text scenarios. Provide a volume configuration variable.

## Proposed Changes

### [New Config] `utils/audioConfig.ts`
- Define `public const SCENARIO_BGM_VOLUME = 0.3;` (Default value, adjustable).

### [Modify] `components/ClickToAdvanceText/ClickToAdvanceText.tsx`
- Add `bgmSrc?: string` and `bgmVolume?: number` to props.
- Use `useEffect` to create `new Audio(bgmSrc)` on mount.
- Play with loop.
- Cleanup (pause/reset) on unmount.
- Fade out logic might be nice but simple stop is MVP.

### [Modify] `app/page.tsx` (Prologue)
- Pass `bgmSrc="/sounds/scenario_txt_bgm.mp3"` and volume to `ClickToAdvanceText`.

### [Modify] `app/game/page.tsx` (Result)
- Pass `bgmSrc="/sounds/scenario_txt_bgm.mp3"` and volume to `ClickToAdvanceText`.

## Verification Plan
- Manual testing:
    - Open `/` (Prologue): Hear music.
    - Finish Prologue: Music stops? (When component unmounts or prop changes).
    - Open `/game`, capture 2 photos -> Result screen: Hear music.
    - Finish result text: Music stops?
