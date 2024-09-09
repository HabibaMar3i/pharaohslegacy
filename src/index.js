import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Create the root for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Measure performance in the app
reportWebVitals();
