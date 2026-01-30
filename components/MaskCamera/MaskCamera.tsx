"use client";

import React, { useState, useRef } from "react";
import styles from "./MaskCamera.module.css";

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
  maskRadius = 100, // This is half-size of the aperture
  onCapture,
  disabled = false,
  revealedAreas = [],
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFlashing, setIsFlashing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Focus the mask on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  // Touch support for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setPosition({ x, y });
  };

  const handleClick = () => {
    if (disabled) return;

    // Trigger Flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    // Play Sound
    const audio = new Audio("/sounds/cam1.mp3");
    audio.play().catch(e => console.error("Audio play failed", e));

    if (!onCapture) return;

    // Capture logic
    // We need to map the current view coordinates (in 'width' x 'height' space)
    // to the original image coordinates (naturalWidth x naturalHeight).

    const displaySizeX = width;
    const displaySizeY = height;

    const apertureSize = maskRadius * 2;
    const displayCropX = position.x - maskRadius;
    const displayCropY = position.y - maskRadius;

    // Create temp canvas for the final output
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = apertureSize;
    cropCanvas.height = apertureSize;
    const cropCtx = cropCanvas.getContext('2d');

    if (!cropCtx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      // Calculate scaling factors
      const scaleX = img.naturalWidth / displaySizeX;
      const scaleY = img.naturalHeight / displaySizeY;

      // Map display crop coordinates to source image coordinates
      const sourceX = displayCropX * scaleX;
      const sourceY = displayCropY * scaleY;
      const sourceW = apertureSize * scaleX;
      const sourceH = apertureSize * scaleY;

      cropCtx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        0,
        0,
        apertureSize,
        apertureSize
      );

      // The result in canvas is CLEAN (no blur)
      onCapture(cropCanvas.toDataURL(), { x: position.x, y: position.y });
    };
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ width, height, cursor: disabled ? 'not-allowed' : 'crosshair' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
    >
      {isFlashing && <div className={styles.flashOverlay} />}

      {/* Background: Strong Blur */}
      <div className={styles.obscuredLayer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Blurred Background"
          className={styles.blurredImage}
          draggable={false}
        />
      </div>

      {/* Revealed Areas (Clear) */}
      {revealedAreas.map((area, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: area.x - maskRadius,
            top: area.y - maskRadius,
            width: maskRadius * 2,
            height: maskRadius * 2,
            borderRadius: 12, // Match lens shape
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 5, // Above blur, below lens
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: width,
              height: height,
              transform: `translate(${- (area.x - maskRadius)}px, ${- (area.y - maskRadius)}px)`,
            }}
          >
            {/* Use the clear image here */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              style={{ width: width, height: height, objectFit: 'cover' }}
              draggable={false}
            />
          </div>
        </div>
      ))}

      {/* The Mask/Lens - view finder */}
      <div
        className={styles.lens}
        style={{
          width: maskRadius * 2,
          height: maskRadius * 2,
          left: position.x - maskRadius,
          top: position.y - maskRadius,
          opacity: disabled ? 0.5 : 1,
          borderColor: disabled ? '#555' : 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <div
          className={styles.lensContainer}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <div
            className={styles.lensInner}
            style={{
              width: width,
              height: height,
              transform: `translate(${- (position.x - maskRadius)}px, ${- (position.y - maskRadius)}px)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Target"
              style={{ width: width, height: height, objectFit: 'cover' }}
              draggable={false}
            />
          </div>

          {/* Reticle inside the lens */}
          <div className={styles.reticle}>
            <div className={styles.reticleLabel}>{disabled ? 'FULL' : 'CAPTURE'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
