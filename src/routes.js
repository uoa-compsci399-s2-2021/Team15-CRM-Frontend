import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import FormLayout from './layouts/FormLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import EmployerForm from './pages/EmployerForm';
import User from './pages/User';
import Response from './pages/Response';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/app/home" replace /> },
        { path: 'home', element: <DashboardApp /> },
        { path: 'job-list', element: <User /> },
        { path: 'response', element: <Response /> },
        { path: 'company', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'form', element: <EmployerForm /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/form',
      element: <FormLayout />,
      children: [
        { path: '/:token', element: <EmployerForm /> },
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
