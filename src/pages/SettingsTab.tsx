interface SettingsTabProps {
    refreshTime: number;
    isAutoStart: boolean;
    isAutoResume: boolean;
    onSettingChange: (field: string, value: any) => void;
}

export function SettingsTab({ refreshTime, isAutoStart, isAutoResume, onSettingChange }: SettingsTabProps) {
    return (
        <div className="settings">
            <div className="setting">
                <label>How often should the motivational quote refresh? </label>
                <div className="ans">
                    <input 
                        type="number" 
                        value={refreshTime} 
                        onChange={(e) => onSettingChange('refreshTime', Number(e.target.value))} 
                    />
                    <span>mins</span>
                </div>
            </div>
            <div className="setting">
                <label>Auto-start the break when the work timer hits zero? </label>
                <div className="options">
                    <button 
                        className={`yes-button ${isAutoStart ? "active-button" : ""}`} 
                        onClick={() => onSettingChange('isAutoStart', true)}>Yes</button>
                    <button 
                        className={`no-button ${!isAutoStart ? "active-button" : ""}`} 
                        onClick={() => onSettingChange('isAutoStart', false)}>No</button>
                </div>
            </div>
            <div className="setting">
                <label>Auto-resume the work session when the rest period ends? </label>
                <div className="options">
                    <button 
                        className={`yes-button ${isAutoResume ? "active-button" : ""}`} 
                        onClick={() => onSettingChange('isAutoResume', true)}>Yes</button>
                    <button 
                        className={`no-button ${!isAutoResume ? "active-button" : ""}`} 
                        onClick={() => onSettingChange('isAutoResume', false)}>No</button>
                </div>
            </div>
        </div>
    );
}