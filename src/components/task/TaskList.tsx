import { TaskItem } from '../../model/interfaces';
import { TaskSortParams } from '../../model/enums';
import Task from './Task';
import UiInput from '../ui/UiInput';
import { useState } from 'react';

interface TaskListProps {
    items?: TaskItem[]
    updateTask: () => void
}

export default function TaskList({ items, updateTask }: TaskListProps): JSX.Element {
    const [inputValue, setInputValue] = useState('');
    const [taskSortParam, setTaskSortParam] = useState<TaskSortParams>(TaskSortParams.STATUS);
    const itemsMap = new Map();

    const changeInput = (e?: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e?.target.value ?? '');
    };

    const filteredItems: TaskItem[] | undefined = inputValue 
        ? items?.filter((item: TaskItem) => item.title.includes(inputValue))
        : items;
    
    const parseItems = (): void => {
        if (items) {
            for (const item of items) {
                const groupItems = itemsMap.has(item[taskSortParam]) ? itemsMap.get(item[taskSortParam]) : [];
                itemsMap.set(item[taskSortParam], [...groupItems, item]);
            }
        }
    };

    parseItems();

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='mb-8 w-96'>
                <UiInput placeholder='Enter task name...' changeEvent={changeInput} name='taskSearch' value={inputValue} />
            </div>
            
            <ul className="w-full flex flex-col">
                {filteredItems && filteredItems.map(item => {
                    return (
                        <li key={item.id} className="mb-4">
                            <Task item={item} updateTask={updateTask} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}