// File system types
export interface FileEntry {
  name: string;
  path: string;
  isDir: boolean;
  children?: FileEntry[];
}

// Editor types
export interface OpenFile {
  path: string;
  content: string;
  modified: boolean;
  language: string;
}

// Model status types
export interface ModelStatus {
  status: 'ready' | 'downloading' | 'error' | 'not-downloaded';
  progress?: number;
  message?: string;
}

export interface SystemStatus {
  connected: boolean;
  foreman?: ModelStatus;
  logicGate?: ModelStatus;
  architect?: ModelStatus;
}

// Panel types
export type PanelType = 'explorer' | 'search' | 'git' | 'ai' | 'settings';
export type BottomPanelType = 'terminal' | 'output' | 'problems';

// Terminal types
export interface TerminalCommand {
  command: string;
  cwd: string;
}

export interface TerminalResponse {
  approved: boolean;
  output?: string;
  exitCode?: number;
  safetyReason?: string;
}
