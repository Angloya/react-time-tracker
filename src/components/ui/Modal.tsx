import CloseButton from './CloseButton';
import { ReactChildren } from '../../model/interfaces';

interface ModalProps extends ReactChildren {
    closeEvent: () => void
}

export default function Modal({ children, closeEvent }: ModalProps): JSX.Element {
    return (
        <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 flex justify-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-400 bg-opacity-70">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <CloseButton clickEvent={closeEvent} />

                    <div className="px-6 py-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}