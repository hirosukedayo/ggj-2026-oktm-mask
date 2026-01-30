"use client";

import React, { useState, useRef } from "react";
import styles from "./MaskCamera.module.css";

interface MaskCameraProps {
  imageSrc: string;
  width: number;
  height: number;
  maskRadius?: number; // In this context, it's half-width of the square
  onCapture?: (dataUrl: string) => void;
}

export const MaskCamera: React.FC<MaskCameraProps> = ({
  imageSrc,
  width,
  height,
  maskRadius = 100, // This is half-size of the aperture
  onCapture,
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

    // The "View" size on screen is props.width x props.height.
    // The "Aperture" size on screen is maskRadius*2.
    // The "Crop" top-left on screen is (position.x - maskRadius, position.y - maskRadius).

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

      // The result in canvas is CLEAN (no blur), because we draw directly from source image.
      onCapture(cropCanvas.toDataURL());
    };
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ width, height }}
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

      {/* The Mask/Lens - view finder */}
      <div
        className={styles.lens}
        style={{
          width: maskRadius * 2,
          height: maskRadius * 2,
          left: position.x - maskRadius,
          top: position.y - maskRadius,
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
            <img src={imageSrc} alt="Target" width={width} height={height} draggable={false} />
          </div>

          {/* Reticle inside the lens */}
          <div className={styles.reticle}>
            <div className={styles.reticleLabel}>CAPTURE</div>
          </div>
        </div>
      </div>
    </div>
  );
};
