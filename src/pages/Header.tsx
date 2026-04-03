import './Header.css';
import './Menu.css';
import GoogleButtonImport from 'react-google-button';
import { loginWithGoogle, logout } from '../firebase';
import { Menu, UserCircle, X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchPresets, logPresets, deletePreset, updatePreset, updateUserSettings } from '../utils/firestore';
import { PresetItem } from './PresetItem';
import { SettingsTab } from './SettingsTab';
import { useNavigate } from 'react-router';

const GoogleButton = (GoogleButtonImport as any).default || GoogleButtonImport;

export function Header({
    user, bgColor = "#121212", refreshTime, setRefreshTime,
    isAutoStart, setIsAutoStart, isAutoResume, setIsAutoResume
}: any) {
    const [isUserButtonsVisible, setIsLogoutVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isPresetsVisible, setIsPresetsVisible] = useState(true);
    const [isAddPresetPressed, setIsAddPresetPressed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [presets, setPresets] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftPreset, setDraftPreset] = useState({ name: "", workTime: 25, breakTime: 5, pomoCount: 4 });
    const navigate = useNavigate();

    useEffect(() => {
        if (isMenuVisible && isPresetsVisible && user?.uid) {
            const getPresets = async () => {
                setIsLoading(true);
                const data = await fetchPresets(user.uid);
                setPresets(data);
                setIsLoading(false);
            };
            getPresets();
        }
    }, [isMenuVisible, isPresetsVisible, user?.uid]);

    const handleSettingChange = async (field: string, value: any) => {
        if (field === 'refreshTime') setRefreshTime(value);
        if (field === 'isAutoStart') setIsAutoStart(value);
        if (field === 'isAutoResume') setIsAutoResume(value);

        if (user?.uid) {
            try {
                await updateUserSettings(user.uid, { [field]: value });
            } catch (err) {
                console.error("Failed to save setting to cloud:", err);
            }
        }
    };

    const handleSaveNewPreset = async () => {
        if (!user?.uid || !draftPreset.name) return;
        setIsLoading(true);
        await logPresets(user.uid, draftPreset);
        const freshData = await fetchPresets(user.uid);
        setPresets(freshData);
        setIsAddPresetPressed(false);
        setIsLoading(false);
        setDraftPreset({ name: "", workTime: 25, breakTime: 5, pomoCount: 4 });
    };

    const handleDeletePreset = async (presetId: string) => {
        if (!user?.uid || !window.confirm("Are you sure you want to delete this preset?")) return;
        try {
            await deletePreset(user.uid, presetId);
            setPresets((prev) => prev.filter(p => p.id !== presetId));
        } catch (error) { console.error(error); }
    };

    const handleEditInputChange = (id: string, field: string, value: any) => {
        setPresets((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleUpdatePreset = async (preset: any) => {
        if (!user?.uid) return;
        setIsLoading(true);
        try {
            await updatePreset(user.uid, preset.id, {
                name: preset.name, workTime: preset.workTime, breakTime: preset.breakTime, pomoCount: preset.pomoCount
            });
            setEditingId(null);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };

    const handleLogout = async () => {
        await logout();
        setIsLogoutVisible(false);
        setPresets([]);
    };

    return (
        <div className="header" style={{ backgroundColor: bgColor, transition: 'background-color 2.5s ease-in-out' }}>
            <h2>PomoFlow</h2>

            {!user ? (
                <GoogleButton type="light" onClick={loginWithGoogle} />
            ) : (
                <div className="header-buttons">
                    <button className="menu-button" onClick={() => setIsMenuVisible(!isMenuVisible)}><Menu /></button>
                    <div className="user-container">
                        <button className="user-button" onClick={() => setIsLogoutVisible(!isUserButtonsVisible)}><UserCircle /></button>
                        {isUserButtonsVisible && 
                        <div className="user-buttons">
                            <div className="logout-box" onClick={handleLogout}>Log out</div>
                            <div className="analytics-box" onClick={() => navigate('/analytics')}>Analytics</div>
                        </div>}
                    </div>
                </div>
            )}

            {isMenuVisible && (
                <div className="menu">
                    <div className="close-button" onClick={() => setIsMenuVisible(false)}><X /></div>
                    <div className="menu-bar">
                        <ul>
                            <li className={isPresetsVisible ? "active" : ""} onClick={() => setIsPresetsVisible(true)}>Presets</li>
                            <hr />
                            <li className={!isPresetsVisible ? "active" : ""} onClick={() => setIsPresetsVisible(false)}>Settings</li>
                        </ul>
                    </div>

                    {isPresetsVisible ? (
                        <div className="presets-container">
                            <button className="add-button" onClick={() => setIsAddPresetPressed(!isAddPresetPressed)}>
                                {isAddPresetPressed ? "Cancel" : "Add preset"}
                            </button>

                            {isAddPresetPressed && (
                                <div className="preset add-mode">
                                    <input type="text" className="preset-name" placeholder="Preset Name" value={draftPreset.name} onChange={(e) => setDraftPreset({ ...draftPreset, name: e.target.value })} />
                                    <div className="details">
                                        <div className="input-group"><label>Work: </label><input type="number" value={draftPreset.workTime} onChange={(e) => setDraftPreset({ ...draftPreset, workTime: Number(e.target.value) })} /><span>mins</span></div>
                                        <div className="input-group"><label>Break: </label><input type="number" value={draftPreset.breakTime} onChange={(e) => setDraftPreset({ ...draftPreset, breakTime: Number(e.target.value) })} /><span>mins</span></div>
                                        <div className="input-group"><label>Cycles: </label><input type="number" value={draftPreset.pomoCount} onChange={(e) => setDraftPreset({ ...draftPreset, pomoCount: Number(e.target.value) })} /></div>
                                        <button className='save-button' onClick={handleSaveNewPreset}><Save size={18} /></button>
                                    </div>
                                </div>
                            )}

                            {isLoading && presets.length === 0 ? (
                                <p className="loading-text">Loading your flow...</p>
                            ) : presets.length > 0 ? (
                                presets.map((p) => (
                                    <PresetItem
                                        key={p.id} preset={p} isEditing={editingId === p.id}
                                        onEdit={setEditingId} onChange={handleEditInputChange}
                                        onSave={handleUpdatePreset} onDelete={handleDeletePreset}
                                    />
                                ))
                            ) : (
                                <p className="empty-text">No presets found. Create one to get started!</p>
                            )}
                        </div>
                    ) : (
                        <SettingsTab
                            refreshTime={refreshTime} isAutoStart={isAutoStart}
                            isAutoResume={isAutoResume} onSettingChange={handleSettingChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
}