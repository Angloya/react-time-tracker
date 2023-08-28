import { TaskItem } from '../../model/interfaces';
import Task from './Task';

interface TaskListProps {
    items?: TaskItem[]
}

export default function TaskList({ items }: TaskListProps): JSX.Element {
    return (
        <ul className="w-full flex flex-col">
            {items && items.map(item => {
                return (
                    <li key={item.id} className="mb-4">
                        <Task item={item} />
                    </li>
                );
            })}
        </ul>
    );
}