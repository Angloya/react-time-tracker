import { useSelector } from 'react-redux'
import { RootState } from "../store"
import { getRoute } from '../router'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import {
    RouterProvider,
} from "react-router-dom";

function RouteWrapper() {
    const { checkUser } = useFirebaseAuth()
    const isLogged = useSelector((state: RootState) => state.user.isLogged)

    checkUser()
    return (
        <RouterProvider router={getRoute(isLogged)} />
    )
}

export default RouteWrapper
