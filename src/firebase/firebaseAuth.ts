import { auth } from './firebaseConfig';
import { AuthEmailData } from '../model/interfaces';
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    NextOrObserver,
    User,
    signOut,
    updateProfile
} from 'firebase/auth';


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const firebaseAuth = {
    createUserWithEmailAndPassword: ({ email, password }: AuthEmailData) => createUserWithEmailAndPassword(auth, email, password),

    signInWithEmail: ({ email, password }: AuthEmailData) => signInWithEmailAndPassword(auth, email, password),

    signInWithPopup: () => signInWithPopup(auth, provider),

    onAuthStateChanged: (userAction: NextOrObserver<User>) => onAuthStateChanged(auth, userAction),

    currentUser: () => auth.currentUser,

    signOut: () => signOut(auth),
    updateUserProfile: ({ displayName, photoURL }:
        {
            displayName?: string
            photoURL?: string
        }) => auth.currentUser && updateProfile(auth.currentUser, { displayName, photoURL })
};

export default firebaseAuth; 