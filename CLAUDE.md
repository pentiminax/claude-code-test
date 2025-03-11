# Claude Code Memory File

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build project (TypeScript + Vite)
- `npm run lint` - Run ESLint on codebase
- `npm run preview` - Preview production build

## Code Style Guidelines
- **TypeScript**: Use strict mode, explicit return types for functions
- **Components**: Functional components with hooks, PascalCase naming
- **Imports**: React first, then local modules, CSS last
- **Formatting**: 2-space indentation, single quotes for strings
- **Variables**: camelCase for variables, PascalCase for components/types
- **Types**: Prefer interfaces for object types, explicit typing over inference when not obvious
- **Error Handling**: Use try/catch for async operations, graceful error state rendering
- **JSX**: Use fragments (<>) instead of div wrappers when possible
- **File Naming**: Component files named identical to component (App.tsx for App component)
- **State Management**: Use hooks (useState, useReducer) for component state

This project uses Vite + React 19 + TypeScript with modern ESLint flat config.