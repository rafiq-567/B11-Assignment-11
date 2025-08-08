// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'

// import router from './router/router.jsx'
// import { RouterProvider } from 'react-router'
// import AuthProvider from './context/AuthContext/AuthProvider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import router from './router/router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

// ✅ Import React Query Client setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ✅ Create a new query client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
