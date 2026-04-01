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
                        value={preset.workTime}
                        readOnly={!isEditing}
                        onChange={(e) => onChange(preset.id, "workTime", Number(e.target.value))}
                    />
                    <span>mins</span>
                </div>
                <div className="input-group">
                    <label>Break: </label>
                    <input
                        type="number"
                        value={preset.breakTime}
                        readOnly={!isEditing}
                        onChange={(e) => onChange(preset.id, "breakTime", Number(e.target.value))}
                    />
                    <span>mins</span>
                </div>
                <div className="input-group">
                    <label>Cycles: </label>
                    <input
                        type="number"
                        value={preset.pomoCount}
                        readOnly={!isEditing}
                        onChange={(e) => onChange(preset.id, "pomoCount", Number(e.target.value))}
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