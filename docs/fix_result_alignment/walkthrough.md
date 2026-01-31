# Fix Result Image Alignment

## Changes Created
- **Coordinate Mapping**: Updated `MaskCamera.tsx`'s capture logic to properly map display coordinates (screen pixels) to source image coordinates (natural image resolution).
- **Scale Calculation**: Added `scaleX` and `scaleY` based on `img.naturalWidth / width` to correct the `drawImage` source parameters.

## Verification
- **Issue Description**: Previous logic used display coordinates directly on the high-res source image, causing the captured crop to "zoom in" to the top-left portion of the image, resulting in misalignment.
- **Fix Verification**: The new logic calculates:
  ```typescript
  const sx = (mousePos.x - cropWidth / 2) * scaleX;
  ```
  This ensures that the center of the crop on screen corresponds exactly to the center of the crop on the original 1920x1080 image.

## Key Code Logic
```typescript
const scaleX = imgRef.current.naturalWidth / width;
const scaleY = imgRef.current.naturalHeight / height;

// Map Display Crop -> Source Crop
const sx = displayCropX * scaleX;
// ...
cCtx.drawImage(imgRef.current, sx, sy, sWidth, sHeight, 0, 0, cropWidth, cropHeight);
```
