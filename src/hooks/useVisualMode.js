import { useState } from 'react';

export default function useVisualMode(initial) {
  // Initial mode
  const [mode, setMode] = useState(initial);

  // Transition
    function transition(mode) {
      setMode(mode);
    }

  return { mode, transition};
}