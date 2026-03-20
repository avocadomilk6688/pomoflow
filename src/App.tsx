import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TimerPage } from './pages/TimerPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="timer" element={<TimerPage />} />
    </Routes>

  );
}

export default App
