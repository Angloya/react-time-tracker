import { TaskItem } from '../../model/interfaces';
import { useNavigate } from 'react-router-dom';


interface TaskProps {
    item: TaskItem
}

export default function Task({ item }: TaskProps): JSX.Element {
    const navigate = useNavigate();
    const time = `${item.spendTime}/${item.fullTime} time completed`;
    const percent = Math.floor(item.spendTime / (item.fullTime / 12));
    const percentClassName = percent ? `w-${ percent }/12` : 'w-0';
    const clickEvent = (): void => {
        navigate(`/task/${item.id}`);
    };

    return (
        <div onClick={clickEvent} className="flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 p-4 rounded-xl text-white w-8/12 mx-auto my-auto cursor-pointer">
            <div className="mb-4 relative">
                <div className="rounded border-2 float-left absolute p-1">
                    {item.status}
                </div>
            </div>
            <div>
                <span className="text-xs uppercase">{item.group}</span>
            </div>
            <div>
                <p className="text-xl font-bold mt-3 mb-5 uppercase">{item.title}</p>
            </div>
            <div className="text-xs mb-2">
                {time}
            </div>
            <div className="w-full bg-gray-400 p-0">
                <div className={`${percentClassName} bg-white h-1`}>
                </div>
            </div>
            <div>
                <p className='pt-2'>{item?.text}</p>
            </div>
        </div>
    );
}