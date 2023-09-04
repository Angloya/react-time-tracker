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
    const [taskSortParam, setTaskSortParam] = useState<TaskSortParams>(TaskSortParams.GROUP);
    const itemsMap = new Map<string, TaskItem[]>();

    const changeInput = (e?: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e?.target.value ?? '');
    };

    const filteredItems: TaskItem[] | undefined = inputValue
        ? items?.filter((item: TaskItem) => item.title.includes(inputValue))
        : items;

    const parseItems = (): void => {
        if (filteredItems) {
            for (const item of filteredItems) {
                const groupItems = itemsMap.has(item[taskSortParam]) ? itemsMap.get(item[taskSortParam]) ?? [] : [];
                itemsMap.set(item[taskSortParam], [...groupItems, item]);
            }
        }
    };
    const changeSort = (e?: React.ChangeEvent<HTMLSelectElement>): void => {
        setTaskSortParam(e?.target.value as TaskSortParams);
    };

    parseItems();

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='mb-8 w-96'>
                <UiInput placeholder='Enter task name...' changeEvent={changeInput} name='taskSearch' value={inputValue} />
            </div>

            <div className='flex flex-col w-full'>
                <div className='mb-8 w-48 text-left'>
                    <label htmlFor="sortParams" className='text-xs'>Sort by:</label>
                    <select value={taskSortParam} onChange={changeSort} id="sortParams" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {Object.values(TaskSortParams).map((param, idx) => {
                            return <option key={idx + param} value={param}>{param}</option>;
                        })}
                    </select>
                </div>

                <ul className="w-full grid grid-cols-3 gap-y-px gap-x-px border task-table">
                    {[...itemsMap.entries()].map((itemMap, id) => {
                        const [groupName, groupItems] = itemMap;
                        return (
                            <li key={id} className="p-4 border">
                                <div className='pb-4'>
                                    <span className='font-semibold uppercase'>{groupName}</span>
                                </div>

                                <ul className="w-full flex flex-col">
                                    {groupItems && groupItems.map(item => {
                                        return (
                                            <li key={item.id} className="mb-4">
                                                <Task item={item} updateTask={updateTask} />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
}
