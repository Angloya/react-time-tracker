import App from './pages/App';
import Auth from './pages/Auth';
import Root from './layout/root';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/SettingsPage';
import AccountPage from './pages/Account';
import {
  createBrowserRouter,
} from 'react-router-dom';

export const getRoute = (isUserLogged: boolean) => {
  const defaultPage = isUserLogged ? <Root /> : <Auth />;

  return createBrowserRouter([
    {
      path: '/',
      element: defaultPage,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <App />,
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
        {
          path: '/account',
          element: <AccountPage />,
        },
        {
          path: '/settings/:id',
          element: <SettingsPage />,
        },
      ]

    },
  ]);
};
