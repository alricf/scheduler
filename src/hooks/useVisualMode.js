import { useState } from 'react';

export default function useVisualMode(initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);

  // History state
  const [history, setHistory] = useState([initial]);

  // Transition mode
  function transition(newMode) {
    setMode(newMode);
    setHistory([...history, newMode]);
  }

  // Back mode

  function back() {
    if (history.length > 1) {
      let oldHistory = [...history];
      console.log(oldHistory, "old");
      oldHistory.pop();
      console.log(oldHistory, "new");
      setMode(oldHistory[oldHistory.length - 1]);
      setHistory(oldHistory);
    }
  }

  return { mode, transition, back };
}