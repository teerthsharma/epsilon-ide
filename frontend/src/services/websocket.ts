import { API_BASE } from './api';

export class TerminalWebSocket {
  private ws: WebSocket | null = null;
  private onMessageCallback: ((data: string) => void) | null = null;
  private onCloseCallback: (() => void) | null = null;
  private onErrorCallback: (() => void) | null = null;

  connect() {
    const wsUrl = API_BASE.replace('http', 'ws') + '/ws/terminal';
    
    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Terminal WebSocket connected');
      };

      this.ws.onmessage = (event) => {
        if (this.onMessageCallback) {
          this.onMessageCallback(event.data);
        }
      };

      this.ws.onclose = () => {
        console.log('Terminal WebSocket closed');
        if (this.onCloseCallback) {
          this.onCloseCallback();
        }
      };

      this.ws.onerror = () => {
        console.error('Terminal WebSocket error');
        if (this.onErrorCallback) {
          this.onErrorCallback();
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback();
      }
    }
  }

  send(data: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    }
  }

  onMessage(callback: (data: string) => void) {
    this.onMessageCallback = callback;
  }

  onClose(callback: () => void) {
    this.onCloseCallback = callback;
  }

  onError(callback: () => void) {
    this.onErrorCallback = callback;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}
