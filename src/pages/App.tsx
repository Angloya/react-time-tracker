import { useState, useEffect, ReactElement, useCallback } from 'react';
import Loading from '../components/ui/Loader';
import TaskList from '../components/task/TaskList';
import AddTaskPopup from '../components/task/AddTaskPopup';
import { TaskCollection } from '../model/interfaces';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import Plus from '../components/ui/icons/Plus';
import firebaseCollections from '../firebase/firebaseCollections';
import { useDispatch } from 'react-redux';
import { setGroups } from '../store/task';

function App(): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskCol, setTaskCol] = useState<TaskCollection>();
    const dispatch = useDispatch();

    const toggleModal = (): void => {
        setShowModal((value) => !value);
    };

    const dataFetch = useCallback(async () => {
        const { getTasksList } = getFirebaseCollections();
        const { getGroups } = firebaseCollections();
        const result = await getTasksList();
        const groupsData = await getGroups();
        dispatch(setGroups(groupsData?.groups ?? []));
        
        setTaskCol(result);
        setIsLoading(false);
    }, [dispatch]);

    const updateList = (): void => {
        toggleModal();
        dataFetch();
    };

    useEffect(() => {
        setIsLoading(true);
        dataFetch();
    }, [dataFetch]);

    return (
        <div className="flex justify-center items-start">
            <div className='w-[800px]'>
                {isLoading
                    ? <Loading />
                    : <TaskList items={taskCol?.items} updateTask={dataFetch} />}
            </div>

            <button onClick={toggleModal} className="w-[200px] flex items-center justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center" type="button">
                <span className='pr-2'>Create Task </span>
                <Plus/>
            </button>

            {showModal && <AddTaskPopup closeEvent={toggleModal} createdEvent={updateList} />}
        </div>
    );
}

export default App;
