import { NavLink } from "react-router-dom";
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import { useSelector } from 'react-redux'
import { RootState } from "../store"

export default function RootHeader() {
    const { userLogout } = useFirebaseAuth()
    const isLogged = useSelector((state: RootState) => state.user.isLogged)

    const getClassName = (isActive: boolean): string => {
        return isActive ? "bg-gray-900 text-white px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
    }
    return (
        <>
            <nav className="bg-gray-800 px-10 flex h-16 items-center justify-between">
                <NavLink className={({ isActive }: { isActive: boolean }) => getClassName(isActive)} to={'/'} > Main</NavLink>
                <NavLink className={({ isActive }: { isActive: boolean }) => getClassName(isActive)} to={'settings'} > Settings</NavLink>
                <NavLink className={({ isActive }: { isActive: boolean }) => getClassName(isActive)} to={'/account'} > Account</NavLink>
                {
                    isLogged &&
                    <button onClick={userLogout}> Logout </button>
                }
            </nav>
        </>
    )
}