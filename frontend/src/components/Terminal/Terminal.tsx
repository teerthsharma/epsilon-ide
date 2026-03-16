import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import './Terminal.css';

interface TerminalProps {
  onToggle: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onToggle }) => {
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const { initTerminal, fit } = useTerminal();

  useEffect(() => {
    if (terminalContainerRef.current) {
      const cleanup = initTerminal(terminalContainerRef.current);
      return cleanup;
    }
  }, [initTerminal]);

  useEffect(() => {
    const handleResize = () => fit();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fit]);

  return (
    <div className="terminal-panel">
      <div className="panel-tabs">
        <button className="panel-tab active">TERMINAL</button>
        <button className="panel-tab">OUTPUT</button>
        <button className="panel-tab">PROBLEMS</button>
        <div className="panel-tab-actions">
          <button className="icon-btn" onClick={onToggle} title="Toggle Panel">
            ▾
          </button>
        </div>
      </div>
      <div className="terminal-content" ref={terminalContainerRef} />
    </div>
  );
};