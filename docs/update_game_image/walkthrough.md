# Game Aspect Ratio & Atmosphere Update

## Changes Created
- **Aspect Ratio**: Updated game dimensions to **960x540 (16:9)** to perfectly separate the aspect ratio of the new background image (`Okutama_Bteam_mock.png`, 1920x1080).
- **Image Resource**: Replaced the main game image with `Okutama_Bteam_mock.png` (moved to `public/images/`).
- **Atmosphere**: Updated `locales.ts` to use poetic, introspective language for the Prologue.
- **UI Cleanup**: Removed numerical score displays from the Result screen.

## Verification Results

### Automated Browser Test
A browser subagent verified the updates:
1.  **Aspect Ratio**: Confirmed the game area and background image are 960x540 (16:9). The image is fully visible without significant cropping.
2.  **Visuals**: Verified the new image and mask interaction.
3.  **Flow**: Confirmed capturing memories and transitioning to result/ending works correctly with the new coordinate system.
4.  **UI**: Verified score numbers are hidden and poetic text is displayed.

### Key Code Changes
```tsx
// app/game/page.tsx
<MaskCamera
    imageSrc="/images/Okutama_Bteam_mock.png"
    width={960}  // 16:9 Aspect Ratio
    height={540} // (960 / 1.777...)
    // ...
/>
```
