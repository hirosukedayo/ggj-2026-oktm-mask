"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./MaskCamera.module.css";
import { RECALL_SOUND_VOLUME } from "@/utils/audioConfig";


interface MaskCameraProps {
  imageSrc: string;
  width: number;
  height: number;
  maskRadius?: number; // In this context, it's half-width of the square
  onCapture?: (dataUrl: string, position: { x: number, y: number }) => void;
  disabled?: boolean;
  revealedAreas?: Array<{ x: number; y: number }>;
}

export const MaskCamera: React.FC<MaskCameraProps> = ({
  imageSrc,
  width,
  height,
  maskRadius = 100,
  onCapture,
  disabled = false,
  revealedAreas = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: width / 2, y: height / 2 });
  const [isFlashing, setIsFlashing] = useState(false);

  // Initial load
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;

      // Prepare offscreen canvas for the blurred background
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        offCtx.filter = 'blur(20px) brightness(0.9)';
        offCtx.drawImage(img, 0, 0, width, height);
      }
      offscreenCanvasRef.current = offCanvas;
      setImageLoaded(true);
    };
  }, [imageSrc, width, height]);

  // Draw Loop
  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imgRef.current || !offscreenCanvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // 1. Draw Blurred Background
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offscreenCanvasRef.current!, 0, 0);

      // 2. Create Mask Layer (Accumulate alpha)
      // We can use a temp canvas for the mask alpha map
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext('2d');
      if (!maskCtx) return;

      const drawFeatheredOval = (mx: number, my: number, isSharp: boolean = false) => {
        maskCtx.save();
        maskCtx.translate(mx, my);
        maskCtx.scale(1.5, 1.0); // Oval shape
        const grad = maskCtx.createRadialGradient(0, 0, maskRadius * 0.2, 0, 0, maskRadius);

        if (isSharp) {
          // Sharp mode for revealed areas (Full visibility at center)
          grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
          grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.8)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          // Blurred mode for cursor preview (Partial visibility)
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(0, 0, maskRadius, 0, Math.PI * 2);
        maskCtx.fill();
        maskCtx.restore();
      };

      // Current mouse (Blurred preview)
      if (!disabled) {
        drawFeatheredOval(mousePos.x, mousePos.y, false);
      }
      // Revealed areas (Sharp result)
      revealedAreas.forEach(area => {
        drawFeatheredOval(area.x, area.y, true);
      });

      // 3. Create Masked Sharp Image
      // Draw Sharp Image onto a scratch canvas
      const scratchCanvas = document.createElement('canvas');
      scratchCanvas.width = width;
      scratchCanvas.height = height;
      const scrCtx = scratchCanvas.getContext('2d');
      if (!scrCtx) return;

      scrCtx.drawImage(imgRef.current!, 0, 0, width, height);

      // Apply Mask (Destination-In)
      scrCtx.globalCompositeOperation = 'destination-in';
      scrCtx.drawImage(maskCanvas, 0, 0);

      // 4. Composite onto Main Canvas
      ctx.drawImage(scratchCanvas, 0, 0);
    };

    let animationFrameId: number;
    const render = () => {
      draw();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [imageLoaded, mousePos, width, height, maskRadius, disabled, revealedAreas]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleClick = () => {
    if (disabled || !onCapture) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    console.log("Clicked Position:", mousePos);


    const audio = new Audio("/sounds/recall1.mp3");
    audio.volume = RECALL_SOUND_VOLUME;
    audio.play().catch(e => console.error("Audio play failed", e));

    // For capture, we can just return the current view or cut out the specific oval.
    // For simplicity and matching the verification, we return the sharp image cropped
    // OR we return the 'masked' version?
    // The instructions say "思い出した個所が浮き上がってしまって、少し違和感...境目はブラーがかかって曖昧な感じ"
    // So the capture result should probably LOOK like the preview (feathered).
    // Let's generate a feathered crop.

    // Expand the capture area to feel wider in the result screen
    const captureScale = 1.2; // Widen the FOV by 1.3x as requested

    const cropCanvas = document.createElement('canvas');
    const cropWidth = maskRadius * 3 * captureScale; // Wider because of 1.5 scale + capture expansion
    const cropHeight = maskRadius * 2 * captureScale;
    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;
    const cCtx = cropCanvas.getContext('2d');

    if (cCtx && imgRef.current) {
      // Calculate scaling factors (Natural Size / Display Size)
      const scaleX = imgRef.current.naturalWidth / width;
      const scaleY = imgRef.current.naturalHeight / height;

      // Draw sharp image offset
      // We need to map the Display Coordinates of the crop area to Source Coordinates
      const displayCropX = mousePos.x - cropWidth / 2;
      const displayCropY = mousePos.y - cropHeight / 2;

      const sx = displayCropX * scaleX;
      const sy = displayCropY * scaleY;
      const sWidth = cropWidth * scaleX;
      const sHeight = cropHeight * scaleY;

      // Draw image section
      cCtx.drawImage(imgRef.current, sx, sy, sWidth, sHeight, 0, 0, cropWidth, cropHeight);

      // Apply Feather Mask
      const captureRadius = maskRadius * captureScale;

      cCtx.globalCompositeOperation = 'destination-in';
      cCtx.save();
      cCtx.translate(cropWidth / 2, cropHeight / 2);
      cCtx.scale(1.5, 1.0);
      const grad = cCtx.createRadialGradient(0, 0, captureRadius * 0.2, 0, 0, captureRadius);
      grad.addColorStop(0, 'rgba(0,0,0,1)'); // Fully Clear (Opaque mask keeps pixels)
      grad.addColorStop(0.5, 'rgba(0,0,0,1)'); // Keep center sharp longer
      grad.addColorStop(1, 'rgba(0,0,0,0)'); // Fade out at edges
      cCtx.fillStyle = grad;
      cCtx.beginPath();
      cCtx.arc(0, 0, captureRadius, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.restore();

      onCapture(cropCanvas.toDataURL(), { x: mousePos.x, y: mousePos.y });
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ width, height, cursor: disabled ? 'default' : 'none' }} // Hide cursor, use reticle/mask
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />

      {isFlashing && <div className={styles.flashOverlay} />}
    </div>
  );
};

