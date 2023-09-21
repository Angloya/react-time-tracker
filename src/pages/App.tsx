import { useState, useEffect, ReactElement, useCallback } from 'react';
import Loading from '../components/ui/Loader';
import TaskList from '../components/task/TaskList';
import AddTaskPopup from '../components/task/AddTaskPopup';
import { TaskItem, ChangeTask, FirebaseStatusDoc } from '../model/interfaces';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import Plus from '../components/ui/icons/Plus';
import firebaseCollections from '../firebase/firebaseCollections';
import SystemCollections from '../firebase/firebaseSystemCollections';
import { useDispatch } from 'react-redux';
import { setGroups } from '../store/task';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TaskSortParams, FirebaseDoc, TaskStatus } from '../model/enums';

function App(): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState<TaskItem[]>();
    const [statusList, setStatusList] = useState<TaskStatus[]>([]);
    const dispatch = useDispatch();

    const toggleModal = (): void => {
        setShowModal((value) => !value);
    };

    const dataFetch = useCallback(async () => {
        const { getTasksList } = getFirebaseCollections();
        const { getGroups } = firebaseCollections();
        const [result, groupsData] = await Promise.all([getTasksList(), getGroups()]);

        dispatch(setGroups(groupsData?.groups ?? []));

        setItems(result?.items);
        setIsLoading(false);
    }, [dispatch]);

    const updateList = (): void => {
        toggleModal();
        dataFetch();
    };

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const system = new SystemCollections();
            const statuses = await system.getData<FirebaseStatusDoc>(FirebaseDoc.STATUS);
            setStatusList(statuses?.names ?? []);
        };

        fetch();
    }, []);

    const changeTaskItems = useCallback<ChangeTask>(({ dragItem, result }) => {
        const { name } = result;
        const draggableItem = items && items[result.dragIndex];
        const { changeTasks } = firebaseCollections();

        let newList: TaskItem[] = [];
        setItems((prevList: TaskItem[] = []) => {
            newList = [...prevList];
            const index = newList?.findIndex(item => dragItem.item.id === item.id) ?? -1;
            newList[index] = { ...newList[index], [TaskSortParams.STATUS]: name };
            if (draggableItem) {
                const colItems = prevList?.filter((item) => item.status === name) ?? [];
                const prev = colItems.find((_item, id) => result.hoverIndex === id);
                const hoverIndex = prevList?.findIndex(item => prev?.id === item.id) ?? -1;
                if (hoverIndex > -1) {
                    const prevItem = newList.splice(hoverIndex, 1, draggableItem);
                    newList.splice(result.dragIndex, 1, prevItem[0]);
                }
            }
            return newList;
        });
        if (result.dropEffect) {
            changeTasks(newList);
        }


    }, [items]);

    useEffect(() => {
        setIsLoading(true);
        dataFetch();
    }, [dataFetch]);

    return (
        <div className="flex justify-center items-start">
            <div className='w-[800px]'>
                <DndProvider backend={HTML5Backend}>
                    {isLoading
                        ? <Loading />
                        : <TaskList statusList={statusList} changeTaskItems={changeTaskItems} items={items} updateTask={dataFetch} />}
                </DndProvider>
            </div>

            <button onClick={toggleModal} className="w-[200px] flex items-center justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center" type="button">
                <span className='pr-2'>Create Task </span>
                <Plus />
            </button>

            {showModal && <AddTaskPopup closeEvent={toggleModal} createdEvent={updateList} />}
        </div>
    );
}

export default App;
