import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { FileEntry } from 'c:/Users/ZBook/Downloads/sealmega-ide-react-setup/sealmega-ide/src/types';

export const useFileTree = () => {
  const [fileTree, setFileTree] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFileTree = useCallback(async (path: string = '/') => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.listFiles(path);
      setFileTree(data.entries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file tree');
      setFileTree([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSubdirectory = useCallback(async (path: string): Promise<FileEntry[]> => {
    try {
      const data = await api.listFiles(path);
      return data.entries || [];
    } catch (err) {
      console.error('Failed to load subdirectory:', err);
      return [];
    }
  }, []);

  return {
    fileTree,
    loading,
    error,
    loadFileTree,
    loadSubdirectory,
  };
};
