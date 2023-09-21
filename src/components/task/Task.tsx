import { TaskItem, TaskDraggableItem, ChangeTaskParams, TaskItemDropResult } from '../../model/interfaces';
import { ItemTypes, TaskStatus } from '../../model/enums';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../ui/CloseButton';
import firebaseCollections from '../../firebase/firebaseCollections';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TaskProps {
    item: TaskItem
    updateTask: () => void
    index: number
    currentColumnName: TaskStatus
    changeTask: (params: ChangeTaskParams) => void
}

export default function Task({ item, updateTask, index, currentColumnName, changeTask }: TaskProps): JSX.Element {
    const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: ItemTypes.TASK,
            item: { index, item, type: ItemTypes.TASK, currentColumnName },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const dropResult: TaskItemDropResult | null = monitor.getDropResult();
                if (dropResult) {
                    changeTask({ dragItem: item, result: { dragIndex: -1, hoverIndex: -1, name: dropResult.name, dropEffect: 'drag' } });
                }
            }
        }));

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        hover(item: TaskDraggableItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
            changeTask({ dragItem: item, result: { dragIndex, hoverIndex, name: currentColumnName } });
            item.index = hoverIndex;
        }
    });

    drag(drop(ref));

    const time = `${item.spendTime}/${item.fullTime} time completed`;
    const percent = Math.floor(item.spendTime / (item.fullTime / 12));
    const percentClassName = percent ? `w-${percent}/12` : 'w-0';
    const { deleteTask } = firebaseCollections();

    const clickEvent = (): void => {
        navigate(`/task/${item.id}`);
    };

    const removeTask = async (e?: React.MouseEvent<HTMLElement>): Promise<void> => {
        e?.stopPropagation();
        await deleteTask(item.id);
        updateTask();
    };

    return (
        <div ref={ref} style={{ opacity }} onClick={clickEvent} className="flex relative flex-col items-start bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white mx-auto my-auto cursor-pointer">
            <div className="mb-1">
                Status: {item.status}
                {index}
            </div>
            <div className="text-xs">
                <span>Group: </span>
                <span className="uppercase">{item.group}</span>
            </div>
            <div>
                <p className="text-xl font-bold my-3 uppercase">{item.title}</p>
            </div>
            <div className="text-xs mb-2">
                {time}
            </div>
            <div className="w-full bg-gray-400 p-0">
                <div className={`${percentClassName} bg-white h-1`}>
                </div>
            </div>
            <CloseButton clickEvent={removeTask} color='white' />
        </div>
    );
}