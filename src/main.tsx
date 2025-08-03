import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { DronesProvider } from './contexts/DronesContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <AuthProvider >
        <DronesProvider>
          <App />
        </DronesProvider>
      </AuthProvider>
    </StrictMode>
  </QueryClientProvider>,
)
