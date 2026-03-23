import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TimerPage } from './pages/TimerPage';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('pomoflow_settings');
    return saved ? JSON.parse(saved) : {
      preset: 'coding',
      task: '',
      workTime: 25,
      breakTime: 5,
      pomoCount: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('pomoflow_settings', JSON.stringify(formData));
  }, [formData]);

  return (
    <Routes>
      <Route index element={<HomePage formData={formData} setFormData={setFormData} />} />
      <Route path="timer" element={<TimerPage formData={formData} />} />
    </Routes>

  );
}

export default App
