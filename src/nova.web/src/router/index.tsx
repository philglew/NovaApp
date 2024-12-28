import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import MainLayout from '../components/layout/MainLayout';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Employees = React.lazy(() => import('../pages/Employees'));
const Departments = React.lazy(() => import('../pages/Departments'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Login = React.lazy(() => import('../pages/Login'));
const Appraisals = React.lazy(() => import('../pages/Appraisals'));
const Performance = React.lazy(() => import('../pages/Performance'));
const Absence = React.lazy(() => import('../pages/Absence'));

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Temporarily bypass authentication check
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </React.Suspense>
        ),
      },
      {
        path: 'employees',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Employees />
          </React.Suspense>
        ),
      },
      {
        path: 'departments',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Departments />
          </React.Suspense>
        ),
      },
      {
        path: 'appraisals',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Appraisals />
          </React.Suspense>
        ),
      },
      {
        path: 'performance',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Performance />
          </React.Suspense>
        ),
      },
      {
        path: 'absence',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Absence />
          </React.Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Login />
      </React.Suspense>
    ),
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};