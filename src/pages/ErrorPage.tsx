import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();
    let errorMessage = ''

    if (isRouteErrorResponse(error)) {
        errorMessage = error.error?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    const redirectToMain = (): void => {
        navigate('/')
    }
    return (
        <>
            <div>
                <h1>Oops</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>{errorMessage}</p>
                <button onClick={redirectToMain}>Main page</button>
            </div>
        </>
    )
}