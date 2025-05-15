import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider } from './context/AppContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { CartProvider } from './context/CartContext.tsx'

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
            <CartProvider>
              <App />
            </CartProvider>
          </ModalProvider>
        </AppProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
