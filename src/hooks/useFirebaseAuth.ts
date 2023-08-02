import firebaseAuth from "../firebase/firebaseAuth"
import { User, UserCredential } from "firebase/auth";
import { handleAuthError, FirebaseAuthError } from "../utils/handleErrors"
import { login, logout } from '../store/user'
import { useDispatch } from 'react-redux'
import { AuthEmailData } from "../model/interfaces"


function useFirebaseAuth() {
    const dispatch = useDispatch()

    const addUser = (user: User) => {
        dispatch(login({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
        }))
    }

    const userLogout = (): Promise<void | FirebaseAuthError> => {
        const result = firebaseAuth.signOut().then(() => {
            dispatch(logout())
        }).catch(handleAuthError);
        return result;
    }

    const authWithPopup = (): Promise<void | FirebaseAuthError> => {
        const result = firebaseAuth.signInWithPopup().then(({ user }: UserCredential) => {
            addUser(user)
        }).catch(handleAuthError);
        return result;
    }

    const authWithEmail = ({ email, password }: AuthEmailData): Promise<void | FirebaseAuthError> => {
        const result = firebaseAuth.createUserWithEmailAndPassword({ email, password }).then(({ user }: UserCredential) => {
            addUser(user)
        }).catch(handleAuthError);
        return result;
    }

    const loginWithEmail = ({ email, password }: AuthEmailData): Promise<void | FirebaseAuthError> => {
        const result = firebaseAuth.signInWithEmail({ email, password }).then(({ user }: UserCredential) => {
            addUser(user)
        }).catch(handleAuthError);
        return result;
    }

    const checkUser = async () => {
        await firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                addUser(user)
            }
        });
    }

    return {
        authWithPopup,
        authWithEmail,
        userLogout,
        loginWithEmail,
        checkUser,
        getUserData: firebaseAuth.currentUser
    }

}

export default useFirebaseAuth