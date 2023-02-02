import { useState } from 'react';

export default function useVisualMode(initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);

  // History state
  const [history, setHistory] = useState([initial]);

  // Transition mode
  function transition(mode) {
    setMode(mode);
  }

  // Back mode
  function Back(){

  }

  return { mode, transition, back };
}