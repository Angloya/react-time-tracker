import React from 'react';

type ClickEvent = (e?: React.MouseEvent<HTMLElement>) => void

interface CloseButtonProps {
    clickEvent: ClickEvent,
    color?: string
}

export default function CloseButton({ clickEvent, color = '#000000' }: CloseButtonProps): JSX.Element {
    return (
        <button onClick={clickEvent} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent p-2 rounded-lg ml-auto inline-flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18">
                </line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    );
}