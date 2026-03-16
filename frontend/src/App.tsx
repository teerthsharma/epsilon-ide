import React, { useState, useCallback } from 'react';
import { Titlebar } from './components/Titlebar/Titlebar';
import { ActivityBar } from './components/ActivityBar/ActivityBar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { EditorArea } from './components/Editor/EditorArea';
import { Terminal } from './components/Terminal/Terminal';
import { ResizeHandle } from './components/ResizeHandle/ResizeHandle';
import { PanelType, OpenFile } from './types';
import { Statusbar } from './components/Statusbar/Statusbar';
import './App.css';

function App() {
  const [activePanel, setActivePanel] = useState<PanelType>('explorer');
  const [openFiles, setOpenFiles] = useState<Map<string, OpenFile>>(new Map());
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleOpenFile = useCallback((path: string, content: string, language: string) => {
    setOpenFiles((prev) => {
      const newMap = new Map(prev);
      if (!newMap.has(path)) {
        newMap.set(path, { path, content, modified: false, language });
      }
      return newMap;
    });
    setActiveFile(path);
  }, []);

  const handleCloseFile = useCallback((path: string) => {
    setOpenFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(path);
      return newMap;
    });

    if (activeFile === path) {
      const remaining = Array.from(openFiles.keys()).filter((p) => p !== path);
      setActiveFile(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  }, [activeFile, openFiles]);

  const handleSaveFile = useCallback(async (path: string, content: string) => {
    setOpenFiles((prev) => {
      const newMap = new Map(prev);
      const file = newMap.get(path);
      if (file) {
        newMap.set(path, { ...file, content, modified: false });
      }
      return newMap;
    });
  }, []);

  const currentFile = activeFile || 'Welcome';

  return (
    <div className="app">
      <Titlebar currentFile={currentFile} />
      
      <div className="workbench">
        <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} />
        
        <div style={{ width: sidebarWidth }}>
          <Sidebar
            activePanel={activePanel}
            onOpenFile={handleOpenFile}
          />
        </div>

        <ResizeHandle
          direction="horizontal"
          onResize={setSidebarWidth}
        />

        <div className="main-content">
          <EditorArea
            openFiles={openFiles}
            activeFile={activeFile}
            onFileSelect={setActiveFile}
            onFileClose={handleCloseFile}
            onFileSave={handleSaveFile}
          />

          {showTerminal && (
            <>
              <ResizeHandle
                direction="vertical"
                onResize={setTerminalHeight}
              />
              <div style={{ height: terminalHeight }}>
                <Terminal onToggle={() => setShowTerminal(false)} />
              </div>
            </>
          )}
        </div>
      </div>

      <Statusbar activeFile={activeFile} />
    </div>
  );
}

export default App;