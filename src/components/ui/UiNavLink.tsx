import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface UiNavLinkProps  { 
    children: React.ReactNode
    url: string
 }

 interface NavLinkActive {
    isActive: boolean
}

const getClassName = (isActive: boolean): string => {
    return isActive ? 'bg-gray-900 text-white px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium';
};

export default function UiNavLink({children, url}: UiNavLinkProps) {
    return (
        <NavLink className={({ isActive }: NavLinkActive) => getClassName(isActive)} to={url} > {children}</NavLink>
    );
}