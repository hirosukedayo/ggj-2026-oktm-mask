"use client";

import React, { useState } from "react";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";

interface Photo {
    id: number;
    url: string;
    x: number;
    y: number;
}

export default function GamePage() {
    const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);

    const handleCapture = (dataUrl: string, position: { x: number, y: number }) => {
        if (capturedPhotos.length >= 2) return;

        // Add new photo to the beginning of the list with a unique ID
        const newPhoto: Photo = {
            id: Date.now(),
            url: dataUrl,
            x: position.x,
            y: position.y
        };
        setCapturedPhotos(prev => [newPhoto, ...prev]);
    };

    const isLimitReached = capturedPhotos.length >= 2;
    const revealedAreas = capturedPhotos.map(p => ({ x: p.x, y: p.y }));

    return (
        <div className={styles.container}>
            {/* Main Game Area */}
            <main className={styles.mainArea}>
                <MaskCamera
                    imageSrc="/images/incident_02.png"
                    width={800}
                    height={600} // Slightly smaller to fit layout
                    maskRadius={100}
                    onCapture={handleCapture}
                    disabled={isLimitReached}
                    revealedAreas={revealedAreas}
                />
            </main>
        </div>
    );
}
