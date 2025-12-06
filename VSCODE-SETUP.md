# VS Code Setup for AutoApply Agent

## Quick Setup (5 Minutes)

### 1. Open Project in VS Code
```powershell
cd c:\Users\weave\Downloads\apify\hackathon
code .
```

### 2. Install Recommended Extensions

VS Code will prompt you to install recommended extensions. Click **Install All**.

Or install manually:
- **Apify** (`apify.apify`) - Actor development tools
- **ESLint** (`dbaeumer.vscode-eslint`) - Code quality
- **Prettier** (`esbenp.prettier-vscode`) - Code formatting
- **Docker** (`ms-azuretools.vscode-docker`) - Dockerfile support

### 3. Configure VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "files.exclude": {
    "**/node_modules": true,
    "**/storage": true
  }
}
```

### 4. Add Debug Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run Actor Locally",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/apify/src/cli.js",
      "args": ["run", "--input-file=test-input-minimal.json"],
      "console": "integratedTerminal",
      "env": {
        "APIFY_LOCAL_STORAGE_DIR": "./storage"
      }
    }
  ]
}
```

### 5. Add Task Runner

Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Actor Locally",
      "type": "shell",
      "command": "npx apify run --input-file=test-input-minimal.json",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": []
    },
    {
      "label": "Validate Test Input",
      "type": "shell",
      "command": "node test-input-validator.js test-input-minimal.json",
      "problemMatcher": []
    },
    {
      "label": "Deploy to Apify",
      "type": "shell",
      "command": "apify push",
      "problemMatcher": []
    },
    {
      "label": "Install Dependencies",
      "type": "shell",
      "command": "npm install",
      "problemMatcher": []
    }
  ]
}
```

### 6. Add Extensions Recommendations

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "apify.apify",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker",
    "github.copilot"
  ]
}
```

## Using VS Code Features

### Run Tasks
Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac) to run the default task (Run Actor Locally).

Or open Command Palette (`Ctrl+Shift+P`) → "Tasks: Run Task" → Select task:
- **Run Actor Locally** - Test your Actor
- **Validate Test Input** - Check test-input-minimal.json
- **Deploy to Apify** - Push to cloud
- **Install Dependencies** - npm install

### Debug Actor
1. Set breakpoints in `src/index.js` or other files (click left margin)
2. Press `F5` or click "Run and Debug" in sidebar
3. Select "Run Actor Locally"
4. Code will pause at breakpoints

### Terminal
- Open integrated terminal: `` Ctrl+` ``
- Run commands directly:
  ```powershell
  npm install
  npx apify run --input-file=test-input-minimal.json
  node test-input-validator.js
  ```

### File Explorer
- `Ctrl+Shift+E` - Toggle file explorer
- Right-click files for options
- `storage/` folder contains local run data

### Search Across Files
- `Ctrl+Shift+F` - Search in all files
- Useful for finding where functions are used

### Git Integration
- `Ctrl+Shift+G` - Open source control
- Stage changes, commit, push to GitHub
- View diffs inline

## Keyboard Shortcuts Cheat Sheet

| Action | Shortcut |
|--------|----------|
| Run default task (build) | `Ctrl+Shift+B` |
| Run any task | `Ctrl+Shift+P` → Tasks: Run Task |
| Start debugging | `F5` |
| Open terminal | `` Ctrl+` `` |
| Command palette | `Ctrl+Shift+P` |
| Quick file open | `Ctrl+P` |
| Find in files | `Ctrl+Shift+F` |
| Toggle sidebar | `Ctrl+B` |
| Format document | `Shift+Alt+F` |
| Save all | `Ctrl+K S` |

## Apify Extension Features

If you install the Apify extension:

1. **Actor Panel** - View/manage Actors in sidebar
2. **Run Actor** - Right-click Actor folder → Run Actor
3. **View Results** - Open datasets in VS Code
4. **Push/Pull** - Sync with Apify cloud

## Workflow Example

### Typical Development Loop in VS Code:

1. **Edit code** in `src/formFiller.js`
2. Press `Ctrl+Shift+B` to run locally
3. Check terminal output for errors
4. View results in `storage/datasets/default/`
5. Fix bugs, repeat
6. When ready: `Ctrl+Shift+P` → "Tasks: Run Task" → "Deploy to Apify"

### Quick Test Cycle:

```powershell
# In VS Code terminal (Ctrl+`)
node test-input-validator.js
npx apify run --input-file=test-input-minimal.json
```

## Troubleshooting

### "Cannot find module 'apify'"
```powershell
npm install
```

### "apify: command not found"
```powershell
npm install -g apify-cli
```

### Debugging not working
- Ensure `.vscode/launch.json` exists
- Check that `node_modules/` is installed
- Try restarting VS Code

### Tasks not showing
- Check `.vscode/tasks.json` exists
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

## Saturday Morning Setup Checklist

Before hackathon:
- [ ] Open project: `code c:\Users\weave\Downloads\apify\hackathon`
- [ ] Install extensions (click "Install All" when prompted)
- [ ] Run "Install Dependencies" task
- [ ] Test "Run Actor Locally" task works
- [ ] Familiarize with terminal (`` Ctrl+` ``)
- [ ] Know how to run tasks (`Ctrl+Shift+B`)

## Pro Tips

1. **Split editor**: `Ctrl+\` to view multiple files side-by-side
2. **Breadcrumbs**: Click file path at top to navigate quickly
3. **Minimap**: Right side shows file overview, click to jump
4. **IntelliSense**: `Ctrl+Space` for autocomplete suggestions
5. **Peek Definition**: `Alt+F12` on a function to see its code inline
6. **Multi-cursor**: `Alt+Click` to add cursors, edit multiple lines at once

You're ready to code! 🚀
