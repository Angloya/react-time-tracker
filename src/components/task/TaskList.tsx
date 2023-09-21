import { TaskItem, ChangeTask, TaskDraggableItem } from '../../model/interfaces';
import { TaskSortParams, TaskStatus } from '../../model/enums';
import Task from './Task';
import UiInput from '../ui/UiInput';
import { useState } from 'react';
import TaskDndList from './TaskDndList';

interface TaskListProps {
    items?: TaskItem[]
    updateTask: () => void
    changeTaskItems: ChangeTask
    statusList: TaskStatus[]
}

export default function TaskList({ items, updateTask, changeTaskItems, statusList }: TaskListProps): JSX.Element {
    const [inputValue, setInputValue] = useState('');
    const itemsMap = new Map<TaskStatus, TaskItem[]>(statusList.map(status => {
        return [status, []];
    }));

    const changeInput = (e?: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e?.target.value ?? '');
    };

    const filteredItems: TaskItem[] | undefined = inputValue
        ? items?.filter((item: TaskItem) => item.title.includes(inputValue))
        : items;

    const parseItems = (): void => {
        if (filteredItems) {
            for (const item of filteredItems) {
                const groupItems = itemsMap.has(item[TaskSortParams.STATUS]) ? itemsMap.get(item[TaskSortParams.STATUS]) ?? [] : [];
                itemsMap.set(item[TaskSortParams.STATUS], [...groupItems, { ...item }]);
            }
        }
    };

    parseItems();

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='mb-8 w-96'>
                <UiInput placeholder='Enter task name...' changeEvent={changeInput} name='taskSearch' value={inputValue} />
            </div>

            <div className='flex flex-col w-full'>
                <ul className="w-full grid grid-cols-3 gap-y-px gap-x-px border task-table">
                    {[...itemsMap.entries()].map((itemMap) => {
                        const [groupName, groupItems] = itemMap;
                        return (
                            <TaskDndList key={groupName} columnName={groupName}>
                                <>
                                    {groupItems && groupItems.map((item, index) => {
                                        return (
                                            <li key={index + item.id} className="mb-4">
                                                <Task
                                                    item={item}
                                                    index={index}
                                                    currentColumnName={groupName}
                                                    updateTask={updateTask}
                                                    changeTask={(params) => changeTaskItems({ ...params })}
                                                />
                                            </li>
                                        );
                                    })}
                                </>
                            </TaskDndList>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
}
