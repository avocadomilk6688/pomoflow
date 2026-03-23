import './TimerPage.css';
import { Pause, SkipForward, Square, Music } from 'lucide-react';
import { Header } from "./Header";
import { useEffect, useState } from 'react';

export function TimerPage({ formData }: { formData: any }) {
    const [secondsLeft, setSecondsLeft] = useState(Number(formData.workTime * 60));
    const [isActive, setIsActive] = useState(true); // Auto-start
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [currentPomo, setCurrentPomo] = useState(1);

    useEffect(() => {
        let interval: any = null;

        if (isActive) {
            interval = setInterval(() => {
                setSecondsLeft((prevSeconds) => {
                    if (prevSeconds > 1) {
                        return prevSeconds - 1;
                    }

                    setTimeout(() => {
                        if (isWorkMode) {
                            setIsWorkMode(false);
                            setSecondsLeft(Number(formData.breakTime) * 60);
                        } else {
                            if (currentPomo < Number(formData.pomoCount)) {
                                setCurrentPomo((p) => p + 1);
                                setIsWorkMode(true);
                                setSecondsLeft(Number(formData.workTime) * 60);
                            } else {
                                setIsActive(false);
                                alert("All cycles complete!");
                            }
                        }
                    }, 0);

                    return 0; 
                });
            }, 1000);
        }

        return () => clearInterval(interval);

    }, [isActive, isWorkMode, currentPomo, formData.breakTime, formData.workTime, formData.pomoCount]);
    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return {
            m: mins.toString().padStart(2, '0'),
            s: secs.toString().padStart(2, '0')
        };
    };

    const { m, s } = formatTime(secondsLeft);

    return (
        <>
            <Header />
            <div className="timer-page">
                <div className="timer-section">
                    <h1>{formData.task}</h1>
                    <div className="timer-container">
                        <div className="minutes-container">
                            <p>{m}</p>
                        </div>
                        <p>:</p>
                        <div className="seconds-container">
                            <p>{s}</p>
                        </div>
                    </div>
                    <div className="timer-controlers">
                        <button className="pause-button">
                            <Pause></Pause>
                        </button>
                        <button className="skip-button">
                            <SkipForward></SkipForward>
                        </button>
                        <button className="stop-button">
                            <Square></Square>
                        </button>
                    </div>
                    <p className="motivation-quote">The syntax is ready. The logic is sound. Now, architect the solution.</p>
                    <button className="music-icon">
                        <Music></Music>
                    </button>
                </div>
            </div>
        </>
    );
}