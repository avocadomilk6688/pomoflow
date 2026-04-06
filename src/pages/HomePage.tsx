import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './HomePage.css';
import { Header } from "./Header";
import type { User } from 'firebase/auth';
import { fetchPresets } from '../utils/firestore';

// --- Components ---

function TimerInput({ label, name, value, onChange, unit, className }: {
    label: string,
    name: string,
    value: number | string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    unit?: string,
    className: string
}) {
    return (
        <div className={className}>
            <p>{label}:</p>
            <div className="ans">
                <input type="number" name={name} value={value} onChange={onChange} />
                {unit && <p>{unit}</p>}
            </div>
        </div>
    );
}

function PresetSelector({ user, presets, value, onChange, isLoading }: {
    user: User | null,
    presets: any[],
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    isLoading: boolean
}) {
    if (!user) {
        return <h3>Sign in to create and manage your own custom session presets.</h3>;
    }

    return (
        <select 
            className="presets" 
            name="preset" 
            id="presets" 
            value={value} 
            onChange={onChange}
            disabled={isLoading}
        >
            {isLoading ? (
                <option>Loading your presets...</option>
            ) : (
                <>
                    <option value="">Select a preset (Optional)</option>
                    {presets.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </>
            )}
        </select>
    );
}

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
                try {
                    const data = await fetchPresets(user.uid);
                    setPresets(data);
                } catch (error) {
                    console.error("Error loading presets:", error);
                } finally {
                    setIsLoading(false);
                }
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
                    <PresetSelector 
                        user={user} 
                        presets={presets} 
                        value={formData.preset} 
                        onChange={handleChange} 
                        isLoading={isLoading}
                    />

                    <div className="working-on">
                        <p>What are you working on?</p>
                        <input 
                            type="text" 
                            name="task" 
                            placeholder="e.g. Studying Machine Learning" 
                            value={formData.task} 
                            onChange={handleChange} 
                        />
                    </div>

                    <TimerInput 
                        label="Minutes per focus session"
                        name="workTime"
                        value={formData.workTime}
                        onChange={handleChange}
                        unit="mins"
                        className="minutes-per-focus-session"
                    />

                    <TimerInput 
                        label="Minutes per break"
                        name="breakTime"
                        value={formData.breakTime}
                        onChange={handleChange}
                        unit="mins"
                        className="minutes-per-break"
                    />

                    <div className="no-of-pomodoros">
                        <p>Number of pomodoros to complete</p>
                        <input type="number" name="pomoCount" value={formData.pomoCount} onChange={handleChange} />
                    </div>

                    <button 
                        className="start-button" 
                        onClick={() => navigate('/timer')}
                        disabled={isLoading}
                    >
                        {isLoading ? "Syncing..." : "Start"}
                    </button>
                </div>
            </div>
        </>
    );
}