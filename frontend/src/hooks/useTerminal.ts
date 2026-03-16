import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalWebSocket } from '../services/websocket';
import { api } from '../services/api';

export const useTerminal = () => {
  const terminalRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const wsRef = useRef<TerminalWebSocket | null>(null);
  const [isLocalMode, setIsLocalMode] = useState(false);

  const initTerminal = (container: HTMLDivElement) => {
    if (terminalRef.current) return;

    const terminal = new XTerm({
      fontSize: 13,
      fontFamily: "'Cascadia Code', 'Fira Code', Consolas, monospace",
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#aeafad',
        selectionBackground: '#264f78',
        black: '#1e1e1e',
        red: '#f44747',
        green: '#6a9955',
        yellow: '#dcdcaa',
        blue: '#569cd6',
        magenta: '#c586c0',
        cyan: '#4ec9b0',
        white: '#d4d4d4',
      },
      cursorBlink: true,
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;

    terminal.writeln('\x1b[1;36m  sealMega IDE Terminal\x1b[0m');
    terminal.writeln('\x1b[90m  Type commands below. Connected to backend shell.\x1b[0m');
    terminal.writeln('');

    // Try WebSocket connection
    const ws = new TerminalWebSocket();
    wsRef.current = ws;

    ws.onMessage((data) => {
      terminal.write(data);
    });

    ws.onClose(() => {
      terminal.writeln('\r\n\x1b[31m  Shell disconnected.\x1b[0m');
    });

    ws.onError(() => {
      terminal.writeln('\x1b[33m  Shell not available. Using local echo.\x1b[0m\r\n');
      setIsLocalMode(true);
      setupLocalEcho(terminal);
    });

    ws.connect();

    terminal.onData((data) => {
      if (ws.isConnected()) {
        ws.send(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ws.disconnect();
      terminal.dispose();
    };
  };

  const setupLocalEcho = (terminal: XTerm) => {
    let currentLine = '';
    const prompt = '\x1b[36msealMega\x1b[0m \x1b[33m>\x1b[0m ';
    terminal.write(prompt);

    terminal.onData((data) => {
      if (data === '\r') {
        terminal.writeln('');
        if (currentLine.trim()) {
          executeLocalCommand(terminal, currentLine.trim());
        }
        currentLine = '';
        terminal.write(prompt);
      } else if (data === '\x7f') {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (data >= ' ') {
        currentLine += data;
        terminal.write(data);
      }
    });
  };

  const executeLocalCommand = async (terminal: XTerm, cmd: string) => {
    try {
      const data = await api.executeCommand(cmd, '.');
      if (!data.approved) {
        terminal.writeln(`\x1b[31mBlocked: ${data.safetyReason}\x1b[0m`);
      } else {
        if (data.output) {
          terminal.write(data.output.replace(/\n/g, '\r\n'));
        }
        if (data.exitCode !== 0) {
          terminal.writeln(`\x1b[31m[exit ${data.exitCode}]\x1b[0m`);
        }
      }
    } catch {
      terminal.writeln(`\x1b[31mBackend not reachable.\x1b[0m`);
    }
  };

  const fit = () => {
    fitAddonRef.current?.fit();
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
      if (terminalRef.current) {
        terminalRef.current.dispose();
      }
    };
  }, []);

  return {
    initTerminal,
    fit,
    isLocalMode,
  };
};
