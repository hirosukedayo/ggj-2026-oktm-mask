"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TEXT_JA, Dictionary } from '@/utils/locales_ja';
import { TEXT_EN } from '@/utils/locales_en';

export type Language = 'ja' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    text: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Default to 'ja' or check browser? For now default JA as requested master.
    // Persistent state can be added here.
    const [language, setLanguageState] = useState<Language>('ja');

    // Optional: Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('app-language') as Language;
        if (saved && (saved === 'ja' || saved === 'en')) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
    };

    const text = language === 'ja' ? TEXT_JA : TEXT_EN;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, text }}>
            {children}
        </LanguageContext.Provider>
    );
};
