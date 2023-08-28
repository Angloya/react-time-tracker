type ClickEvent = () => void

export default function CloseButton({ clickEvent }: { clickEvent: ClickEvent }): JSX.Element {
    return (
        <button onClick={clickEvent} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent p-2 hover:bg-gray-200 hover:text-gray-900 rounded-lg ml-auto inline-flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18">
                </line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    );
}