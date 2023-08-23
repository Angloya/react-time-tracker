import { ReactChildren } from '../../model/interfaces';
import { NavLink } from 'react-router-dom';
import { TabsClasses } from '../../model/classes';
import classNames from 'classnames';

interface UiNavLinkProps extends ReactChildren  { 
    url: string
    isTab?: boolean
 }

 interface NavLinkActive {
    isActive: boolean
}

export default function UiNavLink({ children, url, isTab }: UiNavLinkProps): JSX.Element {
    const getClassName = (isActive: boolean): string => classNames({
        'bg-gray-900 text-white px-3 py-2 text-sm font-medium': isActive && !isTab,
        'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium': !isActive && !isTab,
        [TabsClasses.standart]: !isActive && isTab,
        [TabsClasses.active]: isActive && isTab,
    });
    
    return (
        <NavLink className={({ isActive }: NavLinkActive) => getClassName(isActive)} to={url}>
             {children}
        </NavLink>
    );
}