import React from 'react';
import { ExplorerPanel } from './ExplorerPanel';
import { PanelType } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  activePanel: PanelType;
  onOpenFile: (path: string, content: string, language: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePanel, onOpenFile }) => {
  return (
    <div className="sidebar">
      {activePanel === 'explorer' && (
        <div className="sidebar-panel active">
          <div className="sidebar-header">
            <span>EXPLORER</span>
            <div className="sidebar-actions">
              <button className="icon-btn" title="New File">+</button>
              <button className="icon-btn" title="Refresh">↻</button>
            </div>
          </div>
          <div className="sidebar-content">
            <ExplorerPanel onOpenFile={onOpenFile} />
          </div>
        </div>
      )}
      {/* Add other panels here */}
    </div>
  );
};