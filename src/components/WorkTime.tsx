import { useState } from 'react';
import WorkTimeWrapper from './WorkTimeWrapper';
import useWorkTime from '../hooks/useWorkTime';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import { FormattedPeriod } from '../model/interfaces';

interface WorkTimeProps {
    workTimeData?: FormattedPeriod
}

function WorkTime({ workTimeData }: WorkTimeProps): JSX.Element {
    const [isStarted, setIsStarted] = useState(workTimeData?.isStarted ?? false);
    let userData = workTimeData;

    const { startWorkDay } = getFirebaseCollections();

    const {
        workedTime: userTime,
        leftTime
    } = useWorkTime({ isStarted, userData });
    const getButtonText = (): string => isStarted ? 'Stop work day' : 'Start work day';

    const changeStartStatus = async (): Promise<void> => {
        const data = await startWorkDay(!isStarted, leftTime, userTime);
        userData = data;
        setIsStarted(!isStarted);
    };

    const workTimeProps = {
        userTime,
        leftTime,
        isWorkDayFinished: leftTime < 0,
        isStarted
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <button className='mb-7 bg-gray-700 text-slate-50' onClick={changeStartStatus}>{getButtonText()}</button>
            <WorkTimeWrapper {...workTimeProps} />
        </div>
    );
}

export default WorkTime;
