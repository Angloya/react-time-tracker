import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { dropdownClasses } from '../../model/classes';
import { DropdownItem } from '../../model/interfaces';

interface DropdownProps<TItem> {
    text: string;
    items?: TItem[];
    onClickEvent: (item: TItem) => void;
}

export default function Dropdown<TItem extends DropdownItem>({ text, items, onClickEvent }: DropdownProps<TItem>): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [filtredList, setFiltredList] = useState<TItem[] | undefined>(items);
    const inputRef = useRef<HTMLInputElement>(null);

    const showDropdown = async (): Promise<void> => {
        setFiltredList(items);
        setInputText('');
        setIsOpen((prev) => !prev);
    };
    
    const onItemClick = ((item: TItem): void => {
        showDropdown();
        onClickEvent(item);
    });

    const list = filtredList?.map((item: TItem, idx) => {
        const name: string = item.name;
        return (
            <li key={idx}
                className={dropdownClasses.dropdownList}
                onClick={():void => onItemClick(item)}>
                {name}
            </li>
        );
    });

    const filterList = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const filtrefItems = items?.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setInputText(value);
        setFiltredList(filtrefItems);
    };

    useEffect(() => {
        if (isOpen) {
            inputRef?.current?.focus();
        }
    }, [isOpen]);

    return (
        <div className="relative" data-te-dropdown-ref>
            <button
                onClick={showDropdown}
                className="flex items-center justify-between whitespace-nowrap rounded bg-stone-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out w-full">
                {text}
                <span className="ml-2 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </button>

            <div className={`${isOpen ? '' : 'hidden'} absolute z-[1000] list-none overflow-hidden rounded-lg border-none bg-white shadow-lg w-full cursor-pointer`}>
                <ul className='divide-y divide-slate-200 rounded'>
                    <div className='border-2 border-neutral-200 rounded'>
                        <input ref={inputRef} value={inputText} onInput={filterList} className='w-full p-2 rounded' placeholder='Search' />
                    </div>
                    {
                        list?.length 
                            ? list 
                            : <li className='p-2'>Not Found</li>
                    }
                </ul>
            </div >
        </div>
    );
}