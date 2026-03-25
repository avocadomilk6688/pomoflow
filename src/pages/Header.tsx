
import './Header.css';
import GoogleButtonImport from 'react-google-button';

const GoogleButton = (GoogleButtonImport as any).default || GoogleButtonImport;

export function Header({ bgColor = "#000000" }: { bgColor?: string }) {
    return (
        <div className="header" style={{backgroundColor: bgColor, transition: 'background-color 2.5s ease-in-out'}}>
            <h2>PomoFlow</h2>
            <GoogleButton type="light" onClick={ () => console.log("Clicked") } />
        </div>
    );
}