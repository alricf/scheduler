import { useState } from 'react';

export default function useVisualMode(initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);

  // History state
  const [history, setHistory] = useState([initial]);

  // Transition mode
  function transition(mode, replace = false) {
    if(replace){
      let currentHistory = [...history];
      currentHistory.pop();
      currentHistory.push(mode);
      setMode(currentHistory[currentHistory.length-1]);
      setHistory(currentHistory);
    }
    if(!replace){
    setMode(mode);
    setHistory([...history, mode]);
    }
  }

  // Back mode
  function back() {
    // Back limit condition
    if (history.length > 1) {
      let oldHistory = [...history];
      oldHistory.pop();
      setMode(oldHistory[oldHistory.length - 1]);
      setHistory(oldHistory);
    }
  }

  return { mode, transition, back };
}