import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Make sure your CSS is imported if you have it
import {BrowserRouter} from "react-router-dom";

// 1. Import React Query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// 2. Create a Client instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 3. Wrap everything with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
