# Refined Blur Levels

## Changes Created
- **3-Layer Composition**: Implemented a multi-stage rendering pipeline in `MaskCamera.tsx`:
    1.  **Background**: Heavy Blur (20px).
    2.  **Preview (Hover)**: Mild Blur (5px). This appears under the mouse cursor before clicking.
    3.  **Revealed (Captured)**: Sharp Image (0px). This appears only after clicking to "recall" the memory.
- **Visual Feedback**: This creates a mechanism where the player "searches" through a foggy memory (mild blur) and "clarifies" it by focusing (clicking) to make it sharp.

## Verification Results

### Automated Browser Test
A browser subagent verified:
1.  **Preview Blur**: The mask under the mouse cursor shows a slightly blurred image, distinct from the heavily blurred background.
2.  **Sharp Reveal**: Clicking a spot converts that area to a fully sharp image.
3.  **Contrast**: Confirmed the visual difference between the "searching" state (mild blur) and the "recalled" state (sharp).

### Key Code Logic
```typescript
// Preview Layer (Mild Blur)
if (!disabled) {
    scratchCtx.drawImage(mildBlurCanvasRef.current!, 0, 0);
    // ... mask with feathered oval ...
}

// Revealed Layer (Sharp)
if (revealedAreas.length > 0) {
    scratchCtx.drawImage(imgRef.current!, 0, 0); // Sharp Image
    // ... mask with feathered oval ...
}
```
