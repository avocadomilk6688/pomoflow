
import './Header.css';
import GoogleButtonImport from 'react-google-button';
import { loginWithGoogle, logout } from '../firebase';
import { Menu, UserCircle } from 'lucide-react';
import { useState } from 'react';

const GoogleButton = (GoogleButtonImport as any).default || GoogleButtonImport;

export function Header({ user, bgColor = "#121212" }: { user: any, bgColor?: string }) {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);

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
                        <button className="menu-button">
                            <Menu></Menu>
                        </button>
                        <div className="user-container">
                            <button className="user-button" onClick={() => {
                                setIsLogoutVisible(!isLogoutVisible)
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
        </div>
    );
}