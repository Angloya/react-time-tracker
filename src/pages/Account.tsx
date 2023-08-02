import useFirebaseAuth from '../hooks/useFirebaseAuth'


function Account() {
    const { getUserData } = useFirebaseAuth();
    const user = getUserData();

    return (
        <>
            <div className='app-page'>
                <p>{user?.displayName}</p>
                <p>{user?.email}</p>
                <p>{user?.phoneNumber}</p>
                {user?.photoURL && <img alt="userPhoto" src={user?.photoURL}/>}
            </div>
        </>
    )
}

export default Account