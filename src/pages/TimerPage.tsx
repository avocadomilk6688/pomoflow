import './TimerPage.css';
import { Pause, SkipForward, Square, Music } from 'lucide-react';
import { Header } from "./Header";

export function TimerPage() {
    return (
        <>
            <Header />
            <div className="timer-page">
                <div className="timer-section">
                    <h1>Coding</h1>
                    <div className="timer-container">
                        <div className="minutes-container">
                            <p>25</p>
                        </div>
                        <p>:</p>
                        <div className="seconds-container">
                            <p>00</p>
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