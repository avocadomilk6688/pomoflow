import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TimerPage } from './pages/TimerPage';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import './App.css'
import { fetchUserSettings } from './utils/firestore';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const [refreshTime, setRefreshTime] = useState(5);
  const [isAutoStart, setIsAutoStart] = useState(true);
  const [isAutoResume, setIsAutoResume] = useState(true);

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

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedSettings = await fetchUserSettings(currentUser.uid);
        if (savedSettings) {
          setRefreshTime(savedSettings.refreshTime ?? 5);
          setIsAutoStart(savedSettings.isAutoStart ?? true);
          setIsAutoResume(savedSettings.isAutoResume ?? true);
        }
      }
    });
  }, []);

  return (
    <Routes>
      <Route 
        index 
        element={
          <HomePage 
            user={user} 
            formData={formData} 
            setFormData={setFormData} 
            refreshTime={refreshTime}
            setRefreshTime={setRefreshTime}
            isAutoStart={isAutoStart}
            setIsAutoStart={setIsAutoStart}
            isAutoResume={isAutoResume}
            setIsAutoResume={setIsAutoResume}
          />
        } 
      />
      <Route 
        path="timer" 
        element={
          <TimerPage 
            user={user} 
            formData={formData} 
            refreshTime={refreshTime}
            isAutoStart={isAutoStart}
            isAutoResume={isAutoResume}
          />
        } 
      />
    </Routes>
  );
}

export default App;