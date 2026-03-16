const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8742';

export const api = {
  // File operations
  async listFiles(path: string) {
    const res = await fetch(`${API_BASE}/api/v1/files/list?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error('Failed to list files');
    return res.json();
  },

  async readFile(path: string) {
    const res = await fetch(`${API_BASE}/api/v1/files/read?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error('Failed to read file');
    return res.json();
  },

  async writeFile(path: string, content: string) {
    const res = await fetch(`${API_BASE}/api/v1/files/write`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, content }),
    });
    if (!res.ok) throw new Error('Failed to write file');
    return res.json();
  },

  // Model operations
  async downloadModel(tier: string, repoId: string) {
    const res = await fetch(`${API_BASE}/api/v1/models/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier, repo_id: repoId }),
    });
    if (!res.ok) throw new Error('Download request failed');
    return res.json();
  },

  async getModelStatus(tier: string) {
    const res = await fetch(`${API_BASE}/api/v1/models/status/${tier}`);
    if (!res.ok) throw new Error('Failed to get model status');
    return res.json();
  },

  // System status
  async getStatus() {
    const res = await fetch(`${API_BASE}/api/v1/status`);
    if (!res.ok) throw new Error('Failed to get status');
    return res.json();
  },

  // Clara indexing
  async indexClara() {
    const res = await fetch(`${API_BASE}/api/v1/clara/index`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to index Clara');
    return res.json();
  },

  // Command execution
  async executeCommand(command: string, cwd: string) {
    const res = await fetch(`${API_BASE}/api/v1/claw/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, cwd }),
    });
    if (!res.ok) throw new Error('Failed to execute command');
    return res.json();
  },
};

export { API_BASE };
