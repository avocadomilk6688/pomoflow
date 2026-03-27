
import './Header.css';
import './Menu.css';
import GoogleButtonImport from 'react-google-button';
import { loginWithGoogle, logout } from '../firebase';
import { Menu, UserCircle, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const GoogleButton = (GoogleButtonImport as any).default || GoogleButtonImport;

export function Header({ user, bgColor = "#121212" }: { user: any, bgColor?: string }) {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isPresetsVisible, setIsPresetsVisible] = useState(true);
    const [isAutoStart, setIsAutoStart] = useState(true);
    const [isAutoResume, setIsAutoResume] = useState(true);
    const [isAddPresetPressed, setIsAddPresetPressed] = useState(false);

    const handleLogout = async () => {
        await logout();
        setIsLogoutVisible(false);
    }

    return (
        <div className="header" style={{ backgroundColor: bgColor, transition: 'background-color 2.5s ease-in-out' }}>
            <h2>PomoFlow</h2>
            {
                !user ? (
                    <GoogleButton type="light" onClick={loginWithGoogle} />
                ) : (
                    <div className="header-buttons">
                        <button className="menu-button" onClick={() => {
                            setIsMenuVisible(!isMenuVisible);
                        }}>
                            <Menu></Menu>
                        </button>
                        <div className="user-container">
                            <button className="user-button" onClick={() => {
                                setIsLogoutVisible(!isLogoutVisible);
                            }}>
                                <UserCircle></UserCircle>
                            </button>
                            {isLogoutVisible && (
                                <div className="logout-box" onClick={handleLogout}>
                                    Log out
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
            {isMenuVisible && (
                <div className="menu">
                    <div className="close-button">
                        <X></X>
                    </div>
                    <div className="menu-bar">
                        <ul>
                            <li onClick={() => { setIsPresetsVisible(true) }}>Presets</li>
                            <hr></hr>
                            <li onClick={() => { setIsPresetsVisible(false) }}>Settings</li>
                        </ul>
                    </div>
                    {
                        isPresetsVisible ? (
                            <div className="presets-container">
                                <button className="add-button" onClick={() => {
                                    setIsAddPresetPressed(!isAddPresetPressed)
                                }}>Add preset</button>
                                {isAddPresetPressed && (
                                    <div className="preset">
                                        <h2>Coding</h2>
                                        <div className="details">
                                            <div className="input-group">
                                                <label htmlFor="">Work interval: </label>
                                                <input type="number" />
                                                <span>mins</span>
                                            </div>
                                            <div className="input-group">
                                                <label htmlFor="">Break: </label>
                                                <input type="number" />
                                                <span>mins</span>
                                            </div>
                                            <div className="input-group">
                                                <label htmlFor="">Cycles: </label>
                                                <input type="number" />
                                            </div>
                                            <button className='delete-button'>
                                                <Trash2></Trash2>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="preset">
                                    <h2>Coding</h2>
                                    <div className="details">
                                        <div className="input-group">
                                            <label htmlFor="">Work interval: </label>
                                            <input type="number" value="50" />
                                            <span>mins</span>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="">Break: </label>
                                            <input type="number" value="15" />
                                            <span>mins</span>
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="">Cycles: </label>
                                            <input type="number" value="3" />
                                        </div>
                                        <button className='delete-button'>
                                            <Trash2></Trash2>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="settings">
                                <div className="setting">
                                    <label htmlFor="">How often should the motivational quote refresh? </label>
                                    <div className="ans">
                                        <input type="number" value="5" />
                                        <span>mins</span>
                                    </div>
                                </div>
                                <div className="setting">
                                    <label htmlFor="">Auto-start the break when the work timer hits zero? </label>
                                    <div className="options">
                                        <button className={`yes-button ${isAutoStart ? "active-button" : ""}`} onClick={() => {
                                            setIsAutoStart(true);
                                        }}>Yes</button>
                                        <button className={`no-button ${!isAutoStart ? "active-button" : ""}`} onClick={() => {
                                            setIsAutoStart(false);
                                        }}>No</button>
                                    </div>
                                </div>
                                <div className="setting">
                                    <label htmlFor="">Auto-resume the work session when the rest period ends? </label>
                                    <div className="options">
                                        <button className={`yes-button ${isAutoResume ? "active-button" : ""}`} onClick={() => {
                                            setIsAutoResume(true);
                                        }}>Yes</button>
                                        <button className={`no-button ${!isAutoResume ? "active-button" : ""}`} onClick={() => {
                                            setIsAutoResume(false);
                                        }}>No</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}