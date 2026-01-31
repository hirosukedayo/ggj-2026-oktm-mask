# Implement Eye-Opening Transition

## Goal Description
Implement a transition effect that simulates an eye opening (or eyelids parting) when the game starts or resets (transitioning to the `capturing` phase). The effect should be a black overlay that opens vertically from the center with a curved shape.

## User Review Required
- Confirm the animation curve/speed feels natural.

## Proposed Changes

### [New Component] `components/EyeOpenTransition/EyeOpenTransition.tsx`
- Create a full-screen overlays component.
- Use CSS animations (likely `mask-image` or `clip-path` or `radial-gradient`) to transition from full black to transparent.
- My approach: Use a `div` with a massive `box-shadow` or `radial-gradient` mask that expands.
    - `radial-gradient` is easiest for an elliptical opening.
    - Animation: Expand the transparent radius of `radial-gradient(ellipse at center, transparent X%, black X%)`.

### [app/game/page.tsx](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/page.tsx)
- Add `EyeOpenTransition` component conditionally.
- Trigger it when:
    1. The component mounts (initial load).
    2. `phase` resets to `'capturing'`.
- Manage state to remove the component after animation matches.

## Verification Plan
- Manual verification:
    - Reload `/game`.
    - Click "Reset" button on result screen.
    - Verify the eye-opening animation plays.
