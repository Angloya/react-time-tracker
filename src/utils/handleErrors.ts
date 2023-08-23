import { AuthError } from 'firebase/auth';

const firebaseErrors = {
    'auth/email-already-in-use': 'You already have an account. Please singin'
};

export interface FirebaseAuthError {
    errorCode: string;
    errorMessage: string;
    email: string | undefined;
}


export const handleAuthError = (error: AuthError): FirebaseAuthError => {
    const errorCode = error.code;
    console.log(error.code);
    const errorMessage = firebaseErrors[error.code as keyof typeof firebaseErrors] || error.message;
    const email = error.customData.email;

    return {
        errorCode,
        errorMessage,
        email,
    };
};