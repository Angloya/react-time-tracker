import { Outlet } from 'react-router-dom';
import RootHeader from '../components/RootHeader';
import { ReactElement } from 'react';

export default function Root(): ReactElement {
    return (
        <div className="flex flex-col h-[100vh] w-full">
            <RootHeader />
            <div className="p-10">
                <Outlet />
            </div>
        </div>
    );
}