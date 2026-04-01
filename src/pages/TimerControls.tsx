import { Pause, Play, SkipForward, Square } from 'lucide-react';

interface TimerControlsProps {
    isActive: boolean;
    onToggleActive: () => void;
    onSkip: () => void;
    onStop: () => void;
}

export function TimerControls({ isActive, onToggleActive, onSkip, onStop }: TimerControlsProps) {
    return (
        <div className="timer-controlers">
            <button className="pause-button" onClick={onToggleActive}>
                {isActive ? <Pause /> : <Play fill="currentColor" />}
            </button>
            <button className="skip-button" onClick={onSkip}>
                <SkipForward />
            </button>
            <button className="stop-button" onClick={onStop}>
                <Square fill="currentColor" />
            </button>
        </div>
    );
}