import firebaseCollections from '../firebase/firebaseCollections';
import {TaskCollection, FormattedPeriod } from '../model/interfaces';

interface FirebaseCollections {
    startWorkDay: (isStarted: boolean, leftTime: number, workTime: number) => Promise<FormattedPeriod | undefined>
    getWorkDayData: () => Promise<FormattedPeriod | undefined>
    getTasksList: () => Promise<TaskCollection | undefined>
}

export default function getFirebaseCollections(): FirebaseCollections {
    const { setWorkTime, getWorkTime, getTasks } = firebaseCollections();

    const startWorkDay: FirebaseCollections['startWorkDay'] = async (isStarted, leftTime, workTime) => {
        await setWorkTime(isStarted, leftTime, workTime);
        return await getWorkDayData();
    };

    const getWorkDayData: FirebaseCollections['getWorkDayData'] = async () => {
        const data: FormattedPeriod | undefined = await getWorkTime();
        return data;
    };

    const getTasksList: FirebaseCollections['getTasksList'] = async () => {
        const data: TaskCollection | undefined = await getTasks();
        return data;
    };

    return {
        startWorkDay,
        getWorkDayData,
        getTasksList
    };
}