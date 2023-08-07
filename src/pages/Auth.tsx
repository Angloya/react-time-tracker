import useFirebaseAuth from '../hooks/useFirebaseAuth'
import { useState } from 'react'

enum AuthText {
    LOGIN = 'You already have account? Click here to login',
    SIGNIN = 'You still don\'t have an account? Click here to singin'
}

enum AuthButtonText {
    LOGIN = 'Login',
    SIGNIN = 'Create account',
    GOOGLE = 'SignIn with google'
}

function Auth() {
    const { authWithPopup, authWithEmail, loginWithEmail } = useFirebaseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoginButton, setIsLoginButton] = useState(false);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePassword = (password: string) => {
        return password && password.length > 5;
    }

    const changeAuthButton = () => {
        setIsLoginButton(!isLoginButton);
    }

    const authButtonText = isLoginButton ? AuthButtonText.LOGIN : AuthButtonText.SIGNIN;

    const linkText = isLoginButton ? AuthText.SIGNIN : AuthText.LOGIN

    const createUserWithEmail = async () => {
        if (!validateEmail(email)) {
            return setError('It is not a valid email')
        } else if (!validatePassword(password)) {
            return setError('Password must contain at least 6 characters')
        }
        let result = null
        if (isLoginButton) {
            result = await loginWithEmail({ email, password })
        } else {
            result = await authWithEmail({ email, password })
        }
        if (result && result.errorMessage) {
            setError(result.errorMessage)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col w-96'>
                    <label className="mb-2" id="email">Email</label>
                    <input
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                        type="email"
                        className="border p-2 rounded mb-6"
                        required
                        placeholder='email' />
                    <label className="mb-2" id="password">Password</label>
                    <input
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                        type="password"
                        required
                        className="border p-2 rounded mb-6"
                        placeholder='password' />
                </div>

                {error && <p>{error}</p>}

                <button onClick={createUserWithEmail} className='w-48 m-2 bg-slate-100'>{authButtonText}</button>

                <span className='cursor-pointer text-teal-700' onClick={changeAuthButton}>{linkText}</span>

                <button onClick={authWithPopup} className='w-48 m-2 bg-slate-100'>{AuthButtonText.GOOGLE}</button>
            </div>
        </>
    )
}

export default Auth