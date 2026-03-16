import React from 'react';
import { PanelType } from '../../types';
import './ActivityBar.css';

interface ActivityBarProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activePanel, onPanelChange }) => {
  const panels: { id: PanelType; icon: string; title: string }[] = [
    { id: 'explorer', icon: 'M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V9C21 7.9 20.1 7 19 7H13L11 5H5C3.9 5 3 5.9 3 7Z', title: 'Explorer (Ctrl+Shift+E)' },
    { id: 'search', icon: 'M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0M16 16L21 21', title: 'Search (Ctrl+Shift+F)' },
    { id: 'git', icon: 'M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M6 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 9V12L6 15M12 12L18 15', title: 'Source Control (Ctrl+Shift+G)' },
    { id: 'ai', icon: 'M12 2L21 7V17L12 22L3 17V7L12 2ZM12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 13V18M8 8L5 6M16 8L19 6', title: 'sealMega AI (Ctrl+Shift+A)' },
  ];

  return (
    <div className="activitybar">
      {panels.map((panel) => (
        <button
          key={panel.id}
          className={`activity-btn ${activePanel === panel.id ? 'active' : ''}`}
          onClick={() => onPanelChange(panel.id)}
          title={panel.title}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={panel.icon} />
          </svg>
        </button>
      ))}
      
      <div className="activity-spacer" />
      
      <button
        className={`activity-btn ${activePanel === 'settings' ? 'active' : ''}`}
        onClick={() => onPanelChange('settings')}
        title="Settings"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>
  );
};
