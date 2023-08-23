import UiNavLink from '../components/ui/UiNavLink';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function RootHeader(): JSX.Element {
    const { userLogout } = useFirebaseAuth();
    const isLogged = useSelector((state: RootState) => state.user.isLogged);

    return (
        <>
            <nav className="bg-gray-800 px-10 py-4 flex h-16 items-center justify-between">
                <UiNavLink url='/'> Main</UiNavLink>
                <UiNavLink url='settings/time'> Settings</UiNavLink>
                <UiNavLink url='/account'> Account</UiNavLink>
                {
                    isLogged &&
                    <button className='px-8' onClick={userLogout}> Logout </button>
                }
            </nav>
        </>
    );
}