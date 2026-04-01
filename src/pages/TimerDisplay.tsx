export function TimerDisplay({ mins, secs }: { mins: string; secs: string }) {
    return (
        <div className="timer-container">
            <div className="time-box"><p>{mins}</p></div>
            <p className="sep">:</p>
            <div className="time-box"><p>{secs}</p></div>
        </div>
    );
}