import firebaseCollections from '../firebase/firebaseCollections';
import { WorkTimeDb } from '../model/interfaces';

interface FirebaseCollections {
    startWorkDay: (isStarted: boolean, leftTime: number, workTime: number) => Promise<WorkTimeDb | undefined>
    getWorkDayData: () => Promise<WorkTimeDb | undefined>
}

export default function getFirebaseCollections(): FirebaseCollections {
    const { setWorkTime, getWorkTime } = firebaseCollections();
    const startWorkDay = async (isStarted: boolean, leftTime: number, workTime: number): Promise<WorkTimeDb | undefined> => {
        await setWorkTime(isStarted, leftTime, workTime);
        return await getWorkDayData();
    };

    const getWorkDayData = async (): Promise<WorkTimeDb | undefined> => {
        const data: WorkTimeDb | undefined = await getWorkTime();
        return data;
    };

    return {
        startWorkDay,
        getWorkDayData
    };
}