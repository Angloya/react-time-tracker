import { Link } from "react-router-dom";
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import { useSelector } from 'react-redux'
import { RootState } from "../store"

export default function RootHeader() {
    const { userLogout } = useFirebaseAuth()
    const isLogged = useSelector((state: RootState) => state.user.isLogged)
    return (
        <>
            <div className="header-root">
                <Link to={'/'} > Main</Link>
                <Link to={'settings'} > Settings</Link>
                <Link to={'/account'} > Account</Link>
                {
                    isLogged &&
                    <button onClick={userLogout}> Logout </button>
                }
            </div>
        </>
    )
}