"use client";

import React, { useState } from "react";
import { MaskCamera } from "@/components/MaskCamera/MaskCamera";
import styles from "./game.module.css";

interface Photo {
    id: number;
    url: string;
}

export default function GamePage() {
    const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);

    const handleCapture = (dataUrl: string) => {
        // Add new photo to the beginning of the list with a unique ID
        const newPhoto: Photo = {
            id: Date.now(),
            url: dataUrl
        };
        setCapturedPhotos(prev => [newPhoto, ...prev]);
    };

    return (
        <div className={styles.container}>
            {/* Sidebar for Captured Photos */}
            <aside className={styles.sidebar}>
                <h2 className={styles.heading}>Evidence</h2>
                <div className={styles.photoList}>
                    {capturedPhotos.length === 0 && (
                        <p style={{ color: "#666", fontStyle: "italic", fontSize: "0.9rem" }}>
                            No evidence collected yet.
                        </p>
                    )}
                    {capturedPhotos.map((photo) => (
                        <div key={photo.id} className={styles.photoItem}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo.url} alt={`Evidence ${photo.id}`} />
                            <div className={styles.newBadge}>NEW</div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Game Area */}
            <main className={styles.mainArea}>
                <div style={{ marginBottom: 20 }}>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Incident #002: Busy Street</h1>
                    <p style={{ margin: 0, color: "#888", fontSize: '0.9rem' }}>
                        Find the connection between the robbery and the waiting car.
                    </p>
                </div>

                <MaskCamera
                    imageSrc="/images/incident_02.png"
                    width={800}
                    height={600} // Slightly smaller to fit layout
                    maskRadius={100}
                    onCapture={handleCapture}
                />
            </main>
        </div>
    );
}
