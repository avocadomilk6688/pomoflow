import { Save, Pen, Trash2 } from 'lucide-react';

interface PresetItemProps {
    preset: any;
    isEditing: boolean;
    onEdit: (id: string) => void;
    onChange: (id: string, field: string, value: any) => void;
    onSave: (preset: any) => void;
    onDelete: (id: string) => void;
}

export function PresetItem({ preset, isEditing, onEdit, onChange, onSave, onDelete }: PresetItemProps) {
    const handleNumberChange = (id: string, field: string, value: string) => {
        const numericValue = value === "" ? 0 : Number(value);
        onChange(id, field, numericValue);
    };

    return (
        <div className="preset">
            <input
                type="text"
                className="preset-name"
                value={preset.name}
                readOnly={!isEditing}
                onChange={(e) => onChange(preset.id, "name", e.target.value)}
            />
            <div className="details">
                <div className="input-group">
                    <label>Work: </label>
                    <input
                        type="number"
                        value={preset.workTime === 0 ? "" : preset.workTime}
                        readOnly={!isEditing}
                        placeholder="0"
                        onChange={(e) => handleNumberChange(preset.id, "workTime", e.target.value)}
                    />
                    <span>mins</span>
                </div>
                <div className="input-group">
                    <label>Break: </label>
                    <input
                        type="number"
                        value={preset.breakTime === 0 ? "" : preset.breakTime}
                        readOnly={!isEditing}
                        placeholder="0"
                        onChange={(e) => handleNumberChange(preset.id, "breakTime", e.target.value)}
                    />
                    <span>mins</span>
                </div>
                <div className="input-group">
                    <label>Cycles: </label>
                    <input
                        type="number"
                        value={preset.pomoCount === 0 ? "" : preset.pomoCount}
                        readOnly={!isEditing}
                        placeholder="0"
                        onChange={(e) => handleNumberChange(preset.id, "pomoCount", e.target.value)}
                    />
                </div>
                <div className="preset-buttons">
                    {isEditing ? (
                        <button className="save-button" onClick={() => onSave(preset)}>
                            <Save size={18} />
                        </button>
                    ) : (
                        <button className="edit-button" onClick={() => onEdit(preset.id)}>
                            <Pen size={18} />
                        </button>
                    )}
                    <button className='delete-button' onClick={() => onDelete(preset.id)}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}