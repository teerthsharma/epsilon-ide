import React from 'react';
import './Titlebar.css';

interface TitlebarProps {
  currentFile: string;
}

export const Titlebar: React.FC<TitlebarProps> = ({ currentFile }) => {
  return (
    <div className="titlebar">
      <div className="titlebar-left">
        <span className="titlebar-logo">⚡</span>
        <span className="titlebar-name">sealMega IDE</span>
      </div>
      <div className="titlebar-center">{currentFile || 'Welcome'}</div>
      <div className="titlebar-right">
        <button className="titlebar-btn">─</button>
        <button className="titlebar-btn">□</button>
        <button className="titlebar-btn titlebar-close">✕</button>
      </div>
    </div>
  );
};
