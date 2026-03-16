# sealMega IDE - React + Vite Frontend

A modern, VS Code-inspired IDE built with React, TypeScript, and Vite, featuring Monaco Editor, integrated terminal, and AI-powered coding assistance.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on `http://127.0.0.1:8742`

### Installation

```bash
# 1. Create the project
npm create vite@latest sealmega-ide -- --template react-ts
cd sealmega-ide

# 2. Install dependencies
npm install
npm install @monaco-editor/react xterm xterm-addon-fit
npm install -D @types/node

# 3. Copy all source files from this repository
# See file structure below

# 4. Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Complete File Structure

```
sealmega-ide/
├── public/
├── src/
│   ├── components/
│   │   ├── ActivityBar/
│   │   │   ├── ActivityBar.tsx
│   │   │   ├── ActivityBar.css
│   │   │   └── index.ts
│   │   ├── Editor/
│   │   │   ├── EditorArea.tsx
│   │   │   ├── EditorArea.css
│   │   │   ├── EditorTabs.tsx
│   │   │   ├── EditorTabs.css
│   │   │   ├── MonacoEditor.tsx
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── WelcomeScreen.css
│   │   │   └── index.ts
│   │   ├── ResizeHandle/
│   │   │   ├── ResizeHandle.tsx
│   │   │   ├── ResizeHandle.css
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Sidebar.css
│   │   │   ├── ExplorerPanel.tsx
│   │   │   ├── SearchPanel.tsx
│   │   │   ├── GitPanel.tsx
│   │   │   ├── AIPanel.tsx
│   │   │   ├── SettingsPanel.tsx
│   │   │   └── index.ts
│   │   ├── Statusbar/
│   │   │   ├── Statusbar.tsx
│   │   │   ├── Statusbar.css
│   │   │   └── index.ts
│   │   ├── Terminal/
│   │   │   ├── Terminal.tsx
│   │   │   ├── Terminal.css
│   │   │   └── index.ts
│   │   └── Titlebar/
│   │       ├── Titlebar.tsx
│   │       ├── Titlebar.css
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useFileTree.ts
│   │   ├── useResizable.ts
│   │   └── useTerminal.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── websocket.ts
│   ├── styles/
│   │   └── globals.css       # Copy from original CSS file
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8742',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://127.0.0.1:8742',
        ws: true,
      },
    },
  },
})
```

### .env
```env
VITE_API_BASE=http://127.0.0.1:8742
```

### tsconfig.json (update paths)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🎨 Features

- ✅ **Monaco Editor** - Full-featured code editor with syntax highlighting
- ✅ **File Explorer** - Browse and open files from your project
- ✅ **Integrated Terminal** - XTerm.js powered terminal with WebSocket support
- ✅ **Multi-Tab Editing** - Open and switch between multiple files
- ✅ **AI Panel** - Download and manage AI models
- ✅ **Resizable Panels** - Drag to resize sidebar and terminal
- ✅ **Status Bar** - Real-time status indicators
- ✅ **Keyboard Shortcuts** - VS Code-like shortcuts
- ✅ **Dark Theme** - VS Code Dark+ theme replica

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save current file |
| `Ctrl+Shift+E` | Toggle Explorer |
| `Ctrl+Shift+A` | Toggle AI Panel |
| `Ctrl+\`` | Toggle Terminal |

## 🏗️ Architecture

### Component Hierarchy
```
App
├── Titlebar
├── Workbench
│   ├── ActivityBar
│   ├── Sidebar
│   │   ├── ExplorerPanel
│   │   ├── SearchPanel
│   │   ├── GitPanel
│   │   ├── AIPanel
│   │   └── SettingsPanel
│   ├── ResizeHandle (Sidebar)
│   └── MainContent
│       ├── EditorArea
│       │   ├── EditorTabs
│       │   ├── MonacoEditor
│       │   └── WelcomeScreen
│       ├── ResizeHandle (Terminal)
│       └── Terminal
└── Statusbar
```

### State Management
- **Local State**: React hooks for UI state
- **File State**: Map of open files
- **Terminal State**: WebSocket connection management

### Services
- **API Service**: REST API calls to backend
- **WebSocket Service**: Real-time terminal communication

## 📝 Implementation Checklist

### Core Components (✅ Provided)
- [x] TypeScript types
- [x] API service
- [x] WebSocket service
- [x] Custom hooks (useResizable, useFileTree, useTerminal)
- [x] Titlebar component
- [x] ActivityBar component
- [x] ResizeHandle component
- [x] EditorArea with tabs
- [x] Monaco Editor wrapper
- [x] Welcome Screen
- [x] File Explorer
- [x] Terminal component
- [x] Statusbar component

### Additional Components (To Complete)
- [ ] SearchPanel
- [ ] GitPanel
- [ ] AIPanel (model download UI)
- [ ] SettingsPanel
- [ ] OutputPanel
- [ ] ProblemsPanel

### CSS Files (To Copy)
- [ ] Copy `globals.css` from original CSS file
- [ ] Create component-specific CSS for each component
- [ ] Ensure all CSS variables are defined

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Common Issues

### Monaco Editor not loading
- Ensure `@monaco-editor/react` is installed
- Check browser console for CDN errors
- Verify vite.config.ts is properly configured

### Terminal not connecting
- Verify backend server is running
- Check WebSocket URL in services/websocket.ts
- Ensure proxy is configured in vite.config.ts

### Files not loading
- Check API_BASE in services/api.ts
- Verify backend endpoints are accessible
- Check browser network tab for errors

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Output will be in dist/ directory
# Serve with any static file server
npm run preview
```

## 🔗 Integration with Backend

The frontend expects the following backend endpoints:

**File Operations:**
- `GET /api/v1/files/list?path={path}`
- `GET /api/v1/files/read?path={path}`
- `POST /api/v1/files/write`

**Model Operations:**
- `POST /api/v1/models/download`
- `GET /api/v1/models/status/{tier}`

**System:**
- `GET /api/v1/status`
- `WS /ws/terminal`

**Command Execution:**
- `POST /api/v1/claw/execute`

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and component structure.

---

**Note**: All component code is provided in `ALL_COMPONENTS.tsx`. Copy each section to its respective file as indicated in the comments.
