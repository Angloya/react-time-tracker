import UiTabLink from './UiTabLink';
import UiNavLink from './UiNavLink';
import { TabItem, UiTabsProps } from '../../model/interfaces';

export default function UiTabs<TItem extends TabItem>({ tabClick, isNav, list, selectedTab }: UiTabsProps<TItem>): JSX.Element {
    const getLinkComponent = (item: TItem): JSX.Element => {
        const name: string = item.name;
        const isActiveTab = selectedTab.id === item.id;
        return isNav 
        ? <UiNavLink isTab={true} url={item.url ?? ''}>{name}</UiNavLink> 
        : <UiTabLink isActive={isActiveTab}>{name}</UiTabLink>;
    };

    const onTabClick = (item: TItem): void => {
        tabClick(item);
    };

    const mappedList = list.map((item: TItem, idx) => {
        return (
            <li key={idx}
                className="mr-2 cursor-pointer"
                onClick={() => onTabClick(item)}>
                {getLinkComponent(item)}
            </li>
        );
    });

    return (
        <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
            <ul className="flex flex-wrap -mb-px">
                {mappedList}
            </ul>
        </div>
    );
}