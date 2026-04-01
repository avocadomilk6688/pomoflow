interface TimerInputProps {
    label: string;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    unit?: string;
}

export function TimerInput({ label, name, value, onChange, unit }: TimerInputProps) {
    return (
        <div className={name.replace(/([A-Z])/g, "-$1").toLowerCase()}>
            <p>{label}:</p>
            <div className="ans">
                <input type="number" name={name} value={value} onChange={onChange} />
                {unit && <p>{unit}</p>}
            </div>
        </div>
    );
}