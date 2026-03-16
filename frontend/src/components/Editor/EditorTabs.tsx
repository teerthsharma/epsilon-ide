import React from 'react';
import { OpenFile } from '../../types';
import './EditorTabs.css';

interface EditorTabsProps {
  openFiles: Map<string, OpenFile>;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
  onFileClose: (path: string) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFile,
  onFileSelect,
  onFileClose,
}) => {
  const getFileIcon = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const icons: Record<string, string> = {
      py: '🐍', js: '📜', ts: '💠', jsx: '⚛️', tsx: '⚛️',
      html: '🌐', css: '🎨', json: '📋', md: '📝', rs: '🦀',
      go: '🐹', java: '☕', rb: '💎', php: '🐘', sql: '🗃️',
      sh: '🐚', yml: '⚙️', yaml: '⚙️', txt: '📄',
    };
    return icons[ext] || '📄';
  };

  const handleTabClick = (e: React.MouseEvent, path: string) => {
    if ((e.target as HTMLElement).classList.contains('tab-close')) {
      return;
    }
    onFileSelect(path);
  };

  const handleCloseClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    onFileClose(path);
  };

  return (
    <div className="editor-tabs">
      {Array.from(openFiles.entries()).map(([path, file]) => {
        const fileName = path.split(/[/\\]/).pop() || path;
        const isActive = path === activeFile;

        return (
          <div
            key={path}
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, path)}
          >
            <span className="tab-icon">{getFileIcon(fileName)}</span>
            <span className="tab-name">
              {file.modified ? '● ' : ''}
              {fileName}
            </span>
            <button
              className="tab-close"
              onClick={(e) => handleCloseClick(e, path)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};