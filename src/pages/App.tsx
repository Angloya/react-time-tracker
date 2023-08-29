import { useState, useEffect, ReactElement } from 'react';
import Loading from '../components/ui/Loader';
import TaskList from '../components/task/TaskList';
import AddTaskPopup from '../components/task/AddTaskPopup';
import { TaskCollection } from '../model/interfaces';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import Plus from '../components/ui/icons/Plus';

function App(): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskCol, setTaskCol] = useState<TaskCollection>();

    const toggleModal = (): void => {
        setShowModal((value) => !value);
    };

    const dataFetch = async (): Promise<void> => {
        const { getTasksList } = getFirebaseCollections();
        const result = await getTasksList();
        setTaskCol(result);
        setIsLoading(false);
        console.log('update');
    };

    const updateList = (): void => {
        toggleModal();
        dataFetch();
    };

    useEffect(() => {
        setIsLoading(true);
        dataFetch();
    }, []);

    return (
        <div className="flex justify-center items-start">
            <button onClick={toggleModal} className="absolute flex items-center justify-between right-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <span className='pr-2'>Create Task </span>
                <Plus/>
            </button>
            {isLoading
                ? <Loading />
                : <TaskList items={taskCol?.items} updateTask={dataFetch}/>}

            {showModal && <AddTaskPopup closeEvent={toggleModal} createdEvent={updateList} />}
        </div>
    );
}

export default App;
