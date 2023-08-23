import { TabsClasses } from '../../model/classes';
import { ReactChildren } from '../../model/interfaces';

interface UiTabLinkProps extends ReactChildren {
    isActive: boolean
}

export default function UiTabLink({ children, isActive }: UiTabLinkProps): JSX.Element {
    const linkClassName = isActive ? TabsClasses.active : TabsClasses.standart;

    return (
        <span className={linkClassName}> {children}</span>
    );
}