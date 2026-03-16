import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './Statusbar.css';

interface StatusbarProps {
  activeFile: string | null;
}

export const Statusbar: React.FC<StatusbarProps> = ({ activeFile }) => {
  const [systemStatus, setSystemStatus] = useState<string>('Offline');
  const [statusClass, setStatusClass] = useState<string>('offline');

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const data = await api.getStatus();
        const tiers: string[] = [];
        
        if (data.foreman?.status === 'ready') tiers.push('F');
        if (data.logicGate?.status === 'ready') tiers.push('LG');
        if (data.architect?.status === 'ready') tiers.push('A');

        if (tiers.length > 0) {
          setSystemStatus(`sealMega [${tiers.join('+')}]`);
          setStatusClass('online');
        } else {
          setSystemStatus('sealMega: No Models');
          setStatusClass('loading');
        }
      } catch {
        setSystemStatus('sealMega: Offline');
        setStatusClass('offline');
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <span className="status-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M12 9V15C12 16.66 13.34 18 15 18" />
          </svg>
          main
        </span>
        <span className="status-item">0 errors</span>
        <span className="status-item">0 warnings</span>
      </div>
      <div className="statusbar-right">
        <span className="status-item">
          <span className={`status-dot ${statusClass}`} />
          {systemStatus}
        </span>
        <span className="status-item">Ln 1, Col 1</span>
        <span className="status-item">UTF-8</span>
        <span className="status-item">Plain Text</span>
      </div>
    </div>
  );
};