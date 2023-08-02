import useFirebaseAuth from '../hooks/useFirebaseAuth'
import { useState } from 'react'

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

    const authButtonText = isLoginButton ? 'Login' : 'Create account';

    const linkText = isLoginButton ? 'You still don\'t have an account? Click to singin' : 'You already have account? Click to login'

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
            <div className='auth-page'>
                <div className='auth-inputs'>
                    <label id="email">Email</label>
                    <input
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                        type="email"
                        className='auth-input'
                        required
                        placeholder='email' />
                    <label id="password">Password</label>
                    <input
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                        type="password"
                        required
                        className='auth-input'
                        placeholder='password' />
                </div>

                {error && <p>{error}</p>}

                <button onClick={createUserWithEmail} className='auth-button'>{authButtonText}</button>

                <span onClick={changeAuthButton}>{linkText}</span>

                <button onClick={authWithPopup} className='auth-button'>SignIn with google</button>
            </div>
        </>
    )
}

export default Auth