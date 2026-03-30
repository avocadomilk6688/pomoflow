import { useEffect, useRef } from 'react';
import { AUDIO_MAP } from '../constrants/audio';

export function useAudio() {
    const audioRef = useRef(new Audio());

    const playSound = (soundName : string) => {
        const filePath = AUDIO_MAP[soundName];
        if (filePath) {
            const audio = audioRef.current;
            if (audio.src.includes(filePath) && !audio.paused) {
                return; 
            }
            audio.src = filePath;
            audio.loop = true;
            audio.play().catch(err => console.error("Audio Play Error:", err));
        }
    };

    const stopSound = () => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
    };

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            audio.pause();
        }
    }, [])

    return { playSound, stopSound };
}