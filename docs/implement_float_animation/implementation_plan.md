# Result Photo Floating Animation Plan

## Goal Description
Implement a gentle floating ("wavering") animation for result photos to evoke a sense of memory recall, while maintaining the ~50px vertical stagger between even and odd photos.

## User Review Required
None.

## Proposed Changes

### [app/game/game.module.css](file:///Users/hirosuke/ghq/github.com/hirosukedayo/ggj-2026-oktm-mask/app/game/game.module.css)
- Define `@keyframes floatComplex1` with decoupled X/Y peaks:
    - 0%, 100%: translate(0, 0)
    - 20%: translate(6px, 2px)  (Move Right, slightly down)
    - 45%: translate(2px, -8px) (Move Up, slightly right)
    - 70%: translate(-5px, -3px) (Move Left)
    - 85%: translate(-2px, 5px) (Move Down)
- Define `@keyframes floatComplex2` with different phase:
    - 0%, 100%: translate(0, 0)
    - 25%: translate(-5px, -4px)
    - 50%: translate(4px, 6px)
    - 80%: translate(6px, -2px)
- The goal is to avoid 0% -> 50% being a straight line.
- Apply `floatComplex1` to `.photoCard:nth-child(odd)` with duration ~7s.
- Apply `floatComplex2` to `.photoCard:nth-child(even)` with duration ~8s (and delay).
- Maintain `margin-top: 50px` for even children.

## Verification Plan

### Manual Verification
- Run `npm run dev`.
- Check Result screen.
- Verify photos float gently.
- Verify the ~50px vertical stagger is visible.
