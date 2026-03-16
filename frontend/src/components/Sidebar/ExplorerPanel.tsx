import React, { useState, useEffect } from 'react';
import { FileEntry } from '../../types';
import { useFileTree } from '../../hooks/useFileTree';
import { api } from '../../services/api';

interface ExplorerPanelProps {
  onOpenFile: (path: string, content: string, language: string) => void;
}

export const ExplorerPanel: React.FC<ExplorerPanelProps> = ({ onOpenFile }) => {
  const { fileTree, loading, error, loadFileTree, loadSubdirectory } = useFileTree();
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    loadFileTree('/');
  }, [loadFileTree]);

  const getLanguageFromPath = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    const map: Record<string, string> = {
      js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
      py: 'python', rs: 'rust', go: 'go', java: 'java', c: 'c', cpp: 'cpp',
      html: 'html', css: 'css', json: 'json', md: 'markdown', sql: 'sql',
    };
    return map[ext] || 'plaintext';
  };

  const handleFileClick = async (file: FileEntry) => {
    if (file.isDir) {
      const isExpanded = expandedDirs.has(file.path);
      const newExpanded = new Set(expandedDirs);
      
      if (isExpanded) {
        newExpanded.delete(file.path);
      } else {
        newExpanded.add(file.path);
        if (!file.children) {
          const children = await loadSubdirectory(file.path);
          file.children = children;
        }
      }
      
      setExpandedDirs(newExpanded);
    } else {
      setSelectedFile(file.path);
      try {
        const data = await api.readFile(file.path);
        const language = getLanguageFromPath(file.path);
        onOpenFile(file.path, data.content, language);
      } catch (err) {
        console.error('Failed to read file:', err);
      }
    }
  };

  const renderFileTree = (entries: FileEntry[], depth: number = 0) => {
    const sorted = [...entries].sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });

    return sorted.map((entry) => {
      const isExpanded = expandedDirs.has(entry.path);
      const isSelected = selectedFile === entry.path;
      const icon = entry.isDir ? (isExpanded ? '📂' : '📁') : getFileIcon(entry.name);

      return (
        <div key={entry.path}>
          <div
            className={`file-item ${entry.isDir ? 'dir' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleFileClick(entry)}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            {entry.isDir && (
              <span className={`arrow ${isExpanded ? 'open' : ''}`}>▶</span>
            )}
            <span className="icon">{icon}</span>
            <span className="name">{entry.name}</span>
          </div>
          {entry.isDir && isExpanded && entry.children && (
            <div>{renderFileTree(entry.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  const getFileIcon = (name: string): string => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const icons: Record<string, string> = {
      py: '🐍', js: '📜', ts: '💠', jsx: '⚛️', tsx: '⚛️',
      html: '🌐', css: '🎨', json: '📋', md: '📝', rs: '🦀',
    };
    return icons[ext] || '📄';
  };

  if (loading) return <div className="panel-placeholder">Loading...</div>;
  if (error) return <div className="panel-placeholder">Error: {error}</div>;

  return (
    <div className="explorer-panel">
      {renderFileTree(fileTree)}
    </div>
  );
};
