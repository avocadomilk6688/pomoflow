
import './Header.css';
import GoogleButtonImport from 'react-google-button';

const GoogleButton = (GoogleButtonImport as any).default || GoogleButtonImport;

export function Header() {
    return (
        <div className="header">
            <h2>PomoFlow</h2>
            <GoogleButton type="light" onClick={ () => console.log("Clicked") } />
        </div>
    );
}