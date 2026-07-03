import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/estedad/arabic-300.css'
import '@fontsource/estedad/arabic-400.css'
import '@fontsource/estedad/arabic-500.css'
import '@fontsource/estedad/arabic-600.css'
import '@fontsource/estedad/arabic-700.css'
import '@fontsource/estedad/arabic-800.css'
import '@fontsource/estedad/arabic-900.css'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
