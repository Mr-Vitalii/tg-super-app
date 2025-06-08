import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

import './styles/_theme.scss'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './context/AppContext.tsx'
import { ModalProvider } from './context/modal/ModalProvider.tsx'
import { CartProvider } from './context/cart/CartProvider.tsx'
import { AuthProvider } from './context/auth/AuthProvider.tsx'
import { ThemeProvider } from './context/theme/ThemeProvider.tsx'

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
        <ThemeProvider>
          <AuthProvider>
            <AppProvider>
              <ModalProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ModalProvider>
            </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
