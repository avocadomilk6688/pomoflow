import { useNavigate } from 'react-router';
import './HomePage.css';
import { Header } from "./Header"

export function HomePage() {
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <div className="home-page">
                <h1>PomoFlow — An AI-powered Pomodoro timer designed to curate your atmosphere, generate motivation, and analyze your flow.</h1>
                <div className="pomodoro-options">
                    <select className="presets" name="presets" id="presets">
                        <option value="coding">Coding</option>
                        <option value="do-math">Do maths</option>
                        <option value="knitting">Knitting</option>
                    </select>
                    <div className="working-on">
                        <p>What are you working on?</p>
                        <input type="text" />
                    </div>
                    <div className="minutes-per-focus-session">
                        <p>Minutes per focus session:</p>
                        <div className="ans">
                            <input type="number" />
                            <p>mins</p>
                        </div>
                    </div>
                    <div className="minutes-per-break">
                        <p>Minutes per break:</p>
                        <div className="ans">
                            <input type="number" />
                            <p>mins</p>
                        </div>
                    </div>
                    <div className="no-of-pomodoros">
                        <p>Number of pomodoros to complete</p>
                        <input type="number" />
                    </div>
                    <button className="start-button" onClick={() => {
                        navigate('/timer');
                    }}>Start</button>
                </div>
            </div>
        </>
    );
}