import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
      </Router>
  </StrictMode>,
);
