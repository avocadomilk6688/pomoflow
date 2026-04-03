import './TimerPage.css';
import { Music } from 'lucide-react';
import { Header } from "./Header";
import { useEffect, useState, useCallback } from 'react';
import { getAiAdvice } from '../utils/geminiApi';
import { useNavigate } from 'react-router';
import type { User } from 'firebase/auth';
import { useAudio } from '../hooks/useAudio';

import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { AiInsight } from './AiInsight';
import { logSession } from '../utils/firestore';

export function TimerPage({
    user,
    formData,
    refreshTime,
    isAutoStart,
    isAutoResume
}: {
    user: User | null,
    formData: any,
    refreshTime: number,
    isAutoStart: boolean,
    isAutoResume: boolean
}) {
    const navigate = useNavigate();
    const { playSound, stopSound } = useAudio();

    const [secondsLeft, setSecondsLeft] = useState(Number(formData.workTime * 60));
    const [isActive, setIsActive] = useState(true);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [currentPomo, setCurrentPomo] = useState(1);
    const [aiData, setAiData] = useState({ quote: "Architecting focus...", color: "#1e1e2e", sound: 'Rain' });

    useEffect(() => {
        const fetchAi = async () => {
            try {
                const data = await getAiAdvice(formData.task, isWorkMode);
                if (data) setAiData(data);
            } catch (e) { console.error(e); }
        };
        fetchAi();
        const aiInterval = setInterval(fetchAi, refreshTime * 60 * 1000);
        return () => clearInterval(aiInterval);
    }, [isWorkMode, formData.task, refreshTime]);

    useEffect(() => {
        if (isActive && aiData.sound) {
            playSound(aiData.sound);
        } else {
            stopSound();
        }
        return () => stopSound();
    }, [isActive, aiData.sound, playSound, stopSound]);

    const handleSessionSwitch = useCallback(async () => {
        stopSound();
        if (isWorkMode) {
            setIsWorkMode(false);
            setSecondsLeft(Number(formData.breakTime) * 60);
            if (!isAutoStart) setIsActive(false);
            setTimeout(() => alert("Focus session over! Time for a break."), 100);
        } else if (currentPomo < Number(formData.pomoCount)) {
            setCurrentPomo(p => p + 1);
            setIsWorkMode(true);
            setSecondsLeft(Number(formData.workTime) * 60);
            if (!isAutoResume) setIsActive(false);
            setTimeout(() => alert("Break over! Back to work."), 100);
        } else {
            setIsActive(false);
            
            if (user?.uid) {
                const sessionData = {
                    task: formData.task || "Unnamed Session",
                    workTime: Number(formData.breakTime),
                    breakTime: Number(formData.breakTime),
                    pomoCount: Number(formData.pomoCount),
                    totalFocusTime: Number(formData.workTime) * Number(formData.pomoCount),
                    date: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
                    timestamp: new Date()
                };

                try {
                    await logSession(user.uid, sessionData);
                    console.log("Flow session saved successfully!");
                } catch (err) {
                    console.error("Failed to save session:", err);
                }
            }
            alert("All cycles complete! You're a legend.");
        }
    }, [isWorkMode, currentPomo, formData, isAutoStart, isAutoResume, stopSound, user]);

    useEffect(() => {
        let interval: any = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
        } else if (secondsLeft === 0 && isActive) {
            const timeout = setTimeout(() => handleSessionSwitch(), 0);
            return () => clearTimeout(timeout);
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft, handleSessionSwitch]);

    const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const secs = (secondsLeft % 60).toString().padStart(2, '0');

    return (
        <div className="timer-page" style={{
            backgroundColor: aiData.color,
            transition: 'background-color 2s ease-in-out',
            minHeight: '100vh'
        }}>
            <Header
                bgColor={aiData.color}
                user={user}
                refreshTime={refreshTime}
                isAutoStart={isAutoStart}
                isAutoResume={isAutoResume}
                setRefreshTime={() => { }}
                setIsAutoStart={() => { }}
                setIsAutoResume={() => { }}
            />
            
            <div className="timer-section">
                <h1>{formData.task || "PomoFlow Session"}</h1>

                <TimerDisplay mins={mins} secs={secs} />

                <TimerControls 
                    isActive={isActive}
                    onToggleActive={() => setIsActive(!isActive)}
                    onSkip={() => window.confirm("Skip session?") && setSecondsLeft(0)}
                    onStop={() => window.confirm("Stop and go home?") && navigate('/')}
                />

                <AiInsight quote={aiData.quote} />

                <button 
                    className="music-icon" 
                    onClick={() => isActive ? stopSound() : playSound(aiData.sound)}
                >
                    <Music />
                </button>
            </div>
        </div>
    );
}