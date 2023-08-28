import { ReactChildren } from '../../model/interfaces';

export default function FormError({ children }: ReactChildren): JSX.Element {
    return <p role="alert" className=" text-red-500 text-sm text-left">{children}</p>;
}