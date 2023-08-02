import firebaseCollections from "../firebase/firebaseCollections";
import { WorkTimeDb } from "../model/interfaces";

function getFirebaseCollections() {
    const { setWorkTime, getWorkTime } = firebaseCollections()
    const startWorkDay = async (isStarted: boolean, leftTime: number, workTime: number): Promise<WorkTimeDb | undefined> => {
        await setWorkTime(isStarted, leftTime, workTime);
        return await getWorkDayData();
    }

    const getWorkDayData = async (): Promise<WorkTimeDb | undefined> => {
        const data: WorkTimeDb | undefined = await getWorkTime();
        return data
    }

    return {
        startWorkDay,
        getWorkDayData
    }
}

export default getFirebaseCollections