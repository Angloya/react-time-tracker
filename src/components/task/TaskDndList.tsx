import { ItemTypes } from '../../model/enums';
import { useDrop } from 'react-dnd';

interface TaskDndListProps {
    columnName: string
    children: JSX.Element
}

export default function TaskDndList({ columnName, children }: TaskDndListProps): JSX.Element {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => ({ name: columnName }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    });

    const getBackgroundColor = (): string => {
        if (isOver) {
            if (canDrop) {
                return 'rgb(255,188,188)';
            }
        }
        return '';
    };

    return (
        <li ref={drop} style={{ backgroundColor: getBackgroundColor() }} className="p-4 border min-h-[200px]" >
            <div className='pb-4'>
                <span className='font-semibold uppercase'>{columnName}</span>
            </div>

            <ul className="w-full flex flex-col">
                {children}
            </ul>
        </li>
    );
}