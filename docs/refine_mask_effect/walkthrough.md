# Refined Mask Effect

## Changes Created
- **Canvas-based Masking**: Replaced DOM-based clipping with HTML5 Canvas `globalCompositeOperation` and `RadialGradient`.
- **Oval Shape**: The mask is now drawn as an oval (1.5x width scaling) to look more organic.
- **Feathered Edge**: The mask uses a radial gradient from opaque to transparent at the edges, creating a soft "fading in" memory effect instead of a hard cutout.
- **Reticle**: Updated the CSS reticle to match the oval shape (300px x 200px) and use a dashed border for a subtle viewfinder look.

## Verification Results

### Automated Browser Test
A browser subagent verified:
1.  **Rendering**: The game renders using the Canvas element.
2.  **Interaction**: Moving the mouse correctly updates the mask position.
3.  **Visuals**: The mask appears as a soft-edged oval, revealing the sharp image underneath the blurred background.
4.  **Capture**: Clicking captures a "memory", and the captured area remains visible as a feathered oval on the canvas.

### Key Code Logic
```typescript
// Drawing the feathered oval
ctx.save();
ctx.translate(x, y);
ctx.scale(1.5, 1.0); // Oval
const grad = ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, r);
grad.addColorStop(0, 'rgba(255,255,255,1)');
grad.addColorStop(1, 'rgba(255,255,255,0)'); // Feather
ctx.fillStyle = grad;
// ...
```
