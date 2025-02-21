import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useSearchHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(`weatherHistory_${user?.email}`);
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem(`weatherHistory_${user.email}`, JSON.stringify(history));
    }
  }, [history, user]);
  const addToHistory = (item) => {
    setHistory(prev => {
      const isDuplicate = prev.some(
        (historyItem) => 
          historyItem.city.toLowerCase() === item.city.toLowerCase() &&
          new Date(historyItem.date).getTime() > new Date().getTime() - 60000
      );
      if (isDuplicate) return prev;
      return [item, ...prev];
    });
  };
  const removeFromHistory = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };
  const clearHistory = () => {
    setHistory([]);
  };
  return { history, addToHistory, removeFromHistory, clearHistory };
};