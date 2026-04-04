import { useEffect, useRef, useCallback } from 'react';
import { AUDIO_MAP } from '../constrants/audio';

export function useAudio() {
    const audioRef = useRef(new Audio());

    const playSound = useCallback((soundName: string) => {
        const filePath = AUDIO_MAP[soundName];
        if (!filePath) return;

        const audio = audioRef.current;

        if (audio.src.includes(filePath) && !audio.paused) {
            return;
        }

        audio.src = filePath;
        audio.loop = true;
        audio.play().catch(err => {
            if (err.name !== 'AbortError') {
                console.error("Audio Play Error:", err);
            }
        });
    }, []);

    const stopSound = useCallback(() => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            audio.pause();
        };
    }, []);

    return { playSound, stopSound };
}