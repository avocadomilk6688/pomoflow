import './TimerPage.css';
import { Pause, Play, SkipForward, Square, Music } from 'lucide-react';
import { Header } from "./Header";
import { useEffect, useState } from 'react';
import { getAiAdvice } from '../utils/geminiApi';
import { useNavigate } from 'react-router';

export function TimerPage({ formData }: { formData: any }) {
    const navigate = useNavigate();

    const [secondsLeft, setSecondsLeft] = useState(Number(formData.workTime * 60));
    const [isActive, setIsActive] = useState(true);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [currentPomo, setCurrentPomo] = useState(1);
    const [aiData, setAiData] = useState({ quote: "Architecting focus...", color: "#1e1e2e" });

    useEffect(() => {
        const fetchAi = async () => {
            try {
                const data = await getAiAdvice(formData.task, isWorkMode);
                setAiData(data);
            } catch (e) { console.error(e); }
        };
        fetchAi();
        const aiInterval = setInterval(fetchAi, 300000); // 5-minute refresh
        return () => clearInterval(aiInterval);
    }, [isWorkMode, formData.task, formData.preset]);

    useEffect(() => {
        let interval: any = null;

        if (isActive) {
            interval = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev > 1) return prev - 1;

                    setTimeout(() => {
                        handleSessionSwitch();
                    }, 10);

                    return 0;
                });
            }, 1000);
        }

        const handleSessionSwitch = () => {
            if (isWorkMode) {
                alert("Focus session over! Time for a break.");
                setIsWorkMode(false);
                setSecondsLeft(Number(formData.breakTime) * 60);
            } else if (currentPomo < Number(formData.pomoCount)) {
                alert("Break over! Back to work.");
                setCurrentPomo(p => p + 1);
                setIsWorkMode(true);
                setSecondsLeft(Number(formData.workTime) * 60);
            } else {
                setIsActive(false);
                alert("All cycles complete! You're a legend.");
                navigate('/');
            }
        };

        return () => clearInterval(interval);
    }, [isActive, isWorkMode, currentPomo, formData, navigate]);

    const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const secs = (secondsLeft % 60).toString().padStart(2, '0');

    return (
        <div className="timer-page" style={{
            backgroundColor: aiData.color,
            transition: 'background-color 2s ease-in-out',
            minHeight: '100vh'
        }}>
            <Header bgColor={aiData.color}/>
            <div className="timer-section">
                <h1>{formData.task || "PomoFlow Session"}</h1>

                <div className="timer-container">
                    <div className="time-box"><p>{mins}</p></div>
                    <p className="sep">:</p>
                    <div className="time-box"><p>{secs}</p></div>
                </div>

                <div className="timer-controlers">
                    <button className="pause-button" onClick={() => setIsActive(!isActive)}>
                        {isActive ? <Pause /> : <Play fill="currentColor" />}
                    </button>
                    <button className="skip-button" onClick={() => window.confirm("Skip session?") && setSecondsLeft(0)}>
                        <SkipForward />
                    </button>
                    <button className="stop-button" onClick={() => window.confirm("Stop and go home?") && navigate('/')}>
                        <Square fill="currentColor" />
                    </button>
                </div>

                <div className="ai-insight-box">
                    <p className="motivation-quote">"{aiData.quote}"</p>
                </div>

                <button className="music-icon"><Music /></button>
            </div>
        </div>
    );
}