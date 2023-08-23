import { ReactElement, useState } from 'react';
import UiTabs from '../components/ui/UiTabs';
import {
    Outlet
} from 'react-router-dom';

interface SettingLink {
    url: string
    name: string
    id: string
}

const links: SettingLink[] = [
    {
        url: '/settings/time',
        name: 'Time',
        id: 'time'
    },
    {
        url: '/settings/account',
        name: 'Account',
        id: 'account'
    }
];

export default function SettingsPage(): ReactElement {
    const [selectedTab, setSelectedTab] = useState(links[0]);

    const onTabClick = (item: SettingLink): void => {
        setSelectedTab(item);
    };
    return (
        <div>
            <h2 className="h-1 font-medium text-2xl mb-6">Страница настроек</h2>
            <UiTabs<SettingLink> isNav selectedTab={selectedTab} list={links} tabClick={onTabClick} />
            <div>
                <Outlet />
            </div>

        </div >
    );
}