import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

import './styles/_theme.scss'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store/store'

import { ModalProvider } from './context/modal/ModalProvider.tsx'
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
          <ReduxProvider store={store}>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ReduxProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
