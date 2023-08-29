import { TaskItem } from '../../model/interfaces';
import Task from './Task';

interface TaskListProps {
    items?: TaskItem[]
    updateTask: () => void
}

export default function TaskList({ items, updateTask }: TaskListProps): JSX.Element {
    return (
        <ul className="w-full flex flex-col">
            {items && items.map(item => {
                return (
                    <li key={item.id} className="mb-4">
                        <Task item={item} updateTask={updateTask}/>
                    </li>
                );
            })}
        </ul>
    );
}