import React, { useState, useCallback } from 'react';
import { EditorTabs } from './EditorTabs';
import { MonacoEditor } from './MonacoEditor';
import { WelcomeScreen } from './WelcomeScreen';
import { OpenFile } from '../../types';
import './EditorArea.css';

interface EditorAreaProps {
  openFiles: Map<string, OpenFile>;
  activeFile: string | null;
  onFileSelect: (path: string) => void;
  onFileClose: (path: string) => void;
  onFileSave: (path: string, content: string) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  openFiles,
  activeFile,
  onFileSelect,
  onFileClose,
  onFileSave,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  const activeFileData = activeFile ? openFiles.get(activeFile) : null;

  const handleContentChange = useCallback((value: string | undefined) => {
    if (!activeFile || !value) return;
    onFileSave(activeFile, value);
  }, [activeFile, onFileSave]);

  const showWelcome = openFiles.size === 0;

  return (
    <div className="editor-area">
      <EditorTabs
        openFiles={openFiles}
        activeFile={activeFile}
        onFileSelect={onFileSelect}
        onFileClose={onFileClose}
      />

      <div className="editor-content-area">
        {showWelcome ? (
          <WelcomeScreen
            onOpenExplorer={() => {/* handled by parent */}}
            onOpenAI={() => {/* handled by parent */}}
          />
        ) : activeFileData ? (
          <MonacoEditor
            value={activeFileData.content}
            language={activeFileData.language}
            onChange={handleContentChange}
            onCursorChange={(line, column) => setCursorPosition({ line, column })}
          />
        ) : null}
      </div>
    </div>
  );
};
