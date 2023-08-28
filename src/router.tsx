import App from './pages/App';
import Auth from './pages/Auth';
import Root from './layout/root';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/SettingsPage';
import AccountPage from './pages/Account';
import SettingsAccount from './pages/Settings/Account';
import SettingsTime from './pages/Settings/Time';
import Task from './pages/Task';
import {
    createBrowserRouter
} from 'react-router-dom';

export const getRoute = (isUserLogged: boolean): ReturnType<typeof createBrowserRouter> => {
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
                    children: [
                        {
                            path: '/settings/account',
                            element: <SettingsAccount />,
                        },
                        {
                            path: '/settings/time',
                            element: <SettingsTime />,
                        },
                    ]
                },
                {
                    path: '/account',
                    element: <AccountPage />,
                },
                {
                    path: '/task/:id',
                    element: <Task />,
                },
                {
                    path: '/settings/:id',
                    element: <SettingsPage />,
                },
            ]

        },
    ]);
};
