import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getRoute } from '../router';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import {
    RouterProvider,
} from 'react-router-dom';

export default function RouteWrapper(): JSX.Element {
    const { checkUser } = useFirebaseAuth();
    const isLogged = useSelector((state: RootState) => state.user.isLogged);

    checkUser();
    return (
        <RouterProvider router={getRoute(isLogged)} />
    );
}
