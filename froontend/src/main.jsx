import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import NoteProvider  from './context/NoteContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NoteProvider>
        
          <App />
        
      </NoteProvider>
    </BrowserRouter>
  </StrictMode>
);
