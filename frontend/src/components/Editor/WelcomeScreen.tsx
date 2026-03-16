import React from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onOpenExplorer: () => void;
  onOpenAI: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onOpenExplorer,
  onOpenAI,
}) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-logo">⚡</div>
        <h1 className="welcome-title">sealMega IDE</h1>
        <p className="welcome-subtitle">Multi-Tier AI Coding Engine</p>
        
        <div className="welcome-tiers">
          <div className="welcome-tier">
            <div className="tier-icon">🫀</div>
            <div className="tier-name">The Pulse</div>
            <div className="tier-model">TinyLlama 1.1B</div>
            <div className="tier-role">CPU • Always On</div>
          </div>
          <div className="welcome-tier">
            <div className="tier-icon">🧠</div>
            <div className="tier-name">Logic-Gate</div>
            <div className="tier-model">Qwen2.5 7B</div>
            <div className="tier-role">GPU • Ghost Text</div>
          </div>
          <div className="welcome-tier">
            <div className="tier-icon">🏗️</div>
            <div className="tier-name">The Architect</div>
            <div className="tier-model">DeepSeek 70B</div>
            <div className="tier-role">Sharded • Deep Refactor</div>
          </div>
        </div>

        <div className="welcome-actions">
          <button className="welcome-btn primary" onClick={onOpenExplorer}>
            Open Explorer
          </button>
          <button className="welcome-btn" onClick={onOpenAI}>
            AI Engine Panel
          </button>
        </div>

        <div className="welcome-shortcuts">
          <div><kbd>Ctrl+Shift+E</kbd> Explorer</div>
          <div><kbd>Ctrl+Shift+A</kbd> AI Panel</div>
          <div><kbd>Ctrl+`</kbd> Terminal</div>
          <div><kbd>Ctrl+S</kbd> Save File</div>
        </div>
      </div>
    </div>
  );
};