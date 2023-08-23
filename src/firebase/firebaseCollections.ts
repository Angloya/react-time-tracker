import { db, auth } from './firebaseConfig';
import { doc, getDoc, updateDoc, setDoc, DocumentData } from 'firebase/firestore';
import { getFormattedPeriod } from './collectionFormat';
import { WorkTimeDb } from '../model/interfaces';

enum Collections {
    WORK_TIME_YEAR = 'workTimeYear',
    WORK_TIME_MONTH = 'workTimeMonth',
}

interface FirebaseCollections {
    setWorkTime: (isStarted: boolean, leftTime?: number, workTime?: number) => Promise<void>
    getWorkTime: () => Promise<WorkTimeDb | undefined>
}


const firebaseCollections = (): FirebaseCollections => {

    const user = auth.currentUser;
    const uid = user?.uid;

    const saveWorkTime = async (updatedData: DocumentData): Promise<void> => {
        if (uid) {
            const userTimeRef = doc(db, uid, Collections.WORK_TIME_YEAR);
            const userTimeSnap = await getDoc(userTimeRef);

            if (userTimeSnap.exists()) {
                const userTime = userTimeSnap.data();

                await updateDoc(userTimeRef, { updatedData, ...userTime });
            } else {
                await setDoc(userTimeRef, updatedData);
            }
        }
    };

    const setWorkTime: FirebaseCollections['setWorkTime'] = async (
        isStarted,
        leftTime?,
        workTime?
        ) => {
        if (uid) {
            const userTimeRef = doc(db, uid, Collections.WORK_TIME_MONTH);
            const userTimeSnap = await getDoc(userTimeRef);
            const currentMonth = new Date().getMonth();

            if (userTimeSnap.exists()) {
                const userTime = userTimeSnap.data();
                if (userTime.month !== currentMonth) {
                    await saveWorkTime(userTime);
                    await updateDoc(userTimeRef, getFormattedPeriod({
                         isStarted,
                         restOfTime: leftTime,
                         workTime 
                        }));
                } else {
                    await updateDoc(userTimeRef, getFormattedPeriod({ 
                        data: userTime,
                        isStarted,
                        restOfTime: leftTime,
                        workTime }));
                }
            } else {
                await setDoc(userTimeRef, getFormattedPeriod({ isStarted }));
            }
        }
    };

    const getWorkTime: FirebaseCollections['getWorkTime'] = async () => {
        if (uid) {
            const userTimeRef = doc(db, uid, Collections.WORK_TIME_MONTH);
            const userTimeSnap = await getDoc(userTimeRef);
            return userTimeSnap.data() as WorkTimeDb;
        }
    };

    return {
        setWorkTime,
        getWorkTime
    };
};


export default firebaseCollections;