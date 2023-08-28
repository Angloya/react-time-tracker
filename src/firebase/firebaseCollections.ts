import { db, auth } from './firebaseConfig';
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getFormattedPeriod, getFormattedCalendar, getTasksFormatted } from './collectionFormat';
import { FormattedPeriod, FormattedCaledar, TaskItem, TaskCollection } from '../model/interfaces';
import { formatTime, Time } from '../utils/formatTime';

enum Collections {
    TIME = 'timer',
    TIME_CALENDAR = 'calendar',
    TIME_SETTINGS = 'settings',
    TASKS = 'tasks'
}

const DEFAULT_TIMER_RESET_TIME = 12;

export interface FirebaseCollections {
    setWorkTime: (isStarted: boolean, leftTime?: number, workTime?: number) => Promise<void>
    getWorkTime: () => Promise<FormattedPeriod | undefined>
    getCalendar: () => Promise<FormattedCaledar | undefined>
    createTask: (task: TaskItem) => Promise<void>
    getTasks: () => Promise<TaskCollection | undefined>
}


const firebaseCollections = (): FirebaseCollections => {

    const user = auth.currentUser;
    const uid = user?.uid;

    const setCalendar = async (updatedData: FormattedPeriod): Promise<void> => {
        if (uid) {
            const calendarRef = doc(db, uid, Collections.TIME_CALENDAR);
            const calendarSnap = await getDoc(calendarRef);

            if (calendarSnap.exists()) {
                const calendar = calendarSnap.data();
                const data = getFormattedCalendar({ period: updatedData, calendar });

                await updateDoc(calendarRef, data);
            } else {
                const data = getFormattedCalendar({ period: updatedData });
                await setDoc(calendarRef, data);
            }
        }
    };

    const setWorkTime: FirebaseCollections['setWorkTime'] = async (
        isStarted,
        leftTime?,
        workTime?
    ) => {
        if (uid) {
            const userTimeRef = doc(db, uid, Collections.TIME);
            const userTimeSnap = await getDoc(userTimeRef);

            if (userTimeSnap.exists()) {
                const userTime = userTimeSnap.data();
                await updateDoc(userTimeRef, getFormattedPeriod({
                    data: userTime,
                    isStarted,
                    restOfTime: leftTime,
                    workTime
                }));
            } else {
                await setDoc(userTimeRef, getFormattedPeriod({ isStarted }));
            }
        }
    };

    const getWorkTime: FirebaseCollections['getWorkTime'] = async () => {
        if (uid) {
            const userTimeRef = doc(db, uid, Collections.TIME);
            const userTimeSnap = await getDoc(userTimeRef);
            const data = userTimeSnap.data() as FormattedPeriod;
            const resetTime = formatTime().getMilliseconds(DEFAULT_TIMER_RESET_TIME, Time.HOUR);

            if (data && Date.now() > (data.startTime + resetTime)) {
                setCalendar(data);
                await deleteDoc(userTimeRef);
                return {} as FormattedPeriod;
            }
            return userTimeSnap.data() as FormattedPeriod;
        }
    };

    const getCalendar: FirebaseCollections['getCalendar'] = async () => {
        if (uid) {
            const calendarRef = doc(db, uid, Collections.TIME_CALENDAR);
            const calendarSnap = await getDoc(calendarRef);

            return calendarSnap.data() as FormattedCaledar;
        }
    };

    const createTask: FirebaseCollections['createTask'] = async (task: TaskItem) => {
        if (uid) {
            const tasksRef = doc(db, uid, Collections.TASKS);
            const tasksSnap = await getDoc(tasksRef);
            const tasks = tasksSnap.data() as TaskCollection;
            await setDoc(tasksRef, getTasksFormatted(task, tasks));
        }
    };

    const getTasks: FirebaseCollections['getTasks'] = async () => {
        if (uid) {
            const tasksRef = doc(db, uid, Collections.TASKS);
            const tasksSnap = await getDoc(tasksRef);

            return tasksSnap.data() as TaskCollection;
        }
    };

    return {
        setWorkTime,
        getWorkTime,
        getCalendar,
        createTask,
        getTasks
    };
};


export default firebaseCollections;