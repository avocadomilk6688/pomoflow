declare module 'react-google-button' {
  import { ReactNode, ComponentType } from 'react';

  interface GoogleButtonProps {
    label?: string;
    type?: 'light' | 'dark';
    disabled?: boolean;
    tabIndex?: number;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    children?: ReactNode;
  }

  const GoogleButton: ComponentType<GoogleButtonProps>;
  export default GoogleButton;
}