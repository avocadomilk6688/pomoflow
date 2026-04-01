import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './HomePage.css';
import { Header } from "./Header"
import type { User } from 'firebase/auth';
import { fetchPresets } from '../utils/firestore';

export function HomePage({ 
    user, 
    formData, 
    setFormData,
    refreshTime,
    setRefreshTime,
    isAutoStart,
    setIsAutoStart,
    isAutoResume,
    setIsAutoResume 
}: { 
    user: User | null, 
    formData: any, 
    setFormData: any,
    refreshTime: number,
    setRefreshTime: any,
    isAutoStart: boolean,
    setIsAutoStart: any,
    isAutoResume: boolean,
    setIsAutoResume: any
}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [presets, setPresets] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "preset") {
            const selectedPreset = presets.find(p => p.id === value);

            if (selectedPreset) {
                setFormData((prev: any) => ({
                    ...prev,
                    preset: value,
                    task: selectedPreset.name,
                    workTime: selectedPreset.workTime,
                    breakTime: selectedPreset.breakTime,
                    pomoCount: selectedPreset.pomoCount,
                }));
                return;
            }
        }
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        if (user?.uid) {
            const getPresets = async () => {
                setIsLoading(true);
                const data = await fetchPresets(user.uid);
                setPresets(data);
                setIsLoading(false);
            };
            getPresets();
        }
    }, [user?.uid]);

    return (
        <>
            <Header 
                bgColor="#121212" 
                user={user} 
                refreshTime={refreshTime}
                setRefreshTime={setRefreshTime}
                isAutoStart={isAutoStart}
                setIsAutoStart={setIsAutoStart}
                isAutoResume={isAutoResume}
                setIsAutoResume={setIsAutoResume}
            />
            <div className="home-page">
                <h1>PomoFlow — An AI-powered Pomodoro timer designed to curate your atmosphere, generate motivation, and analyze your flow.</h1>
                <div className="pomodoro-options">
                    {user ? (
                        <select className="presets" name="preset" id="presets" value={formData.preset} onChange={handleChange}>
                            {presets.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    ) : (
                        <h3>Sign in to create and manage your own custom session presets.</h3>
                    )}
                    <div className="working-on">
                        <p>What are you working on?</p>
                        <input type="text" name="task" value={formData.task} onChange={handleChange} />
                    </div>
                    <div className="minutes-per-focus-session">
                        <p>Minutes per focus session:</p>
                        <div className="ans">
                            <input type="number" name="workTime" value={formData.workTime} onChange={handleChange} />
                            <p>mins</p>
                        </div>
                    </div>
                    <div className="minutes-per-break">
                        <p>Minutes per break:</p>
                        <div className="ans">
                            <input type="number" name="breakTime" value={formData.breakTime} onChange={handleChange} />
                            <p>mins</p>
                        </div>
                    </div>
                    <div className="no-of-pomodoros">
                        <p>Number of pomodoros to complete</p>
                        <input type="number" name="pomoCount" value={formData.pomoCount} onChange={handleChange} />
                    </div>
                    <button className="start-button" onClick={() => {
                        navigate('/timer');
                    }}>Start</button>
                </div>
            </div>
        </>
    );
}