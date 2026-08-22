import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRouter from './routes/AppRouter.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#111111',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              fontSize: '13px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            },
            success: {
              iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' },
            },
            duration: 3000,
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
