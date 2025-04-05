import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './context/AppContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AppProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
