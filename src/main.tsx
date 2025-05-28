import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './context/AppContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { CartProvider } from './context/cart/CartProvider.tsx'
import { AuthProvider } from './context/auth/AuthProvider.tsx'

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
        <AuthProvider>
          <AppProvider>
            <ModalProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </ModalProvider>
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
