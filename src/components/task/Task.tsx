import { TaskItem } from '../../model/interfaces';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../ui/CloseButton';
import firebaseCollections from '../../firebase/firebaseCollections';
import React from 'react';

interface TaskProps {
    item: TaskItem
    updateTask: () => void
}

export default function Task({ item, updateTask }: TaskProps): JSX.Element {
    const navigate = useNavigate();
    const time = `${item.spendTime}/${item.fullTime} time completed`;
    const percent = Math.floor(item.spendTime / (item.fullTime / 12));
    const percentClassName = percent ? `w-${ percent }/12` : 'w-0';
    const {deleteTask} = firebaseCollections();

    const clickEvent = (): void => {
        navigate(`/task/${item.id}`);
    };

    const removeTask = async (e?: React.MouseEvent<HTMLElement>): Promise<void> => {
        e?.stopPropagation();
        await deleteTask(item.id);
        updateTask();
    };

    return (
        <div onClick={clickEvent} className="flex relative flex-col items-start bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white mx-auto my-auto cursor-pointer">
            <div className="mb-1">
                Status: {item.status}
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
            <CloseButton clickEvent={removeTask} color='white'/>
        </div>
    );
}