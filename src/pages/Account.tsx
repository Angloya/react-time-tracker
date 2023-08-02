import useFirebaseAuth from '../hooks/useFirebaseAuth'


function Account() {
    const { getUserData } = useFirebaseAuth();
    const user = getUserData();

    return (
        <>
            <div className='app-page'>
                {user?.displayName}
                {user?.email}
                {user?.phoneNumber}
                {user?.photoURL}
            </div>
        </>
    )
}

export default Account