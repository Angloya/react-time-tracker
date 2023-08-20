import { ReactChildren } from '../../model/interfaces';

type DetailsTextProps = ReactChildren

export default function DetailsText({children}: DetailsTextProps) {
    return (
        <p className="flex justify-between font-medium mb-2">
            {children}
        </p>
    );
}