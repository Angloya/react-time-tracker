import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { ReactElement } from 'react';

export default function Account (): ReactElement {
    const { getUserData } = useFirebaseAuth();
    const user = getUserData();

    return (
            <div className='app-page'>
                <p>{user?.displayName}</p>
                <p>{user?.email}</p>
                <p>{user?.phoneNumber}</p>
                {user?.photoURL && <img alt="userPhoto" src={user?.photoURL}/>}
            </div>
    );
}