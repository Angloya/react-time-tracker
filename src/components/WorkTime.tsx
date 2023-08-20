import { useState } from 'react';
import WorkTimeWrapper from './WorkTimeWrapper';
import useWorkTime from '../hooks/useWorkTime';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import { WorkTimeDb } from '../model/interfaces';

interface WorkTimeProps {
  workTimeData?: WorkTimeDb
}

function WorkTime({ workTimeData }: WorkTimeProps) {
  const [isStarted, setIsStarted] = useState(workTimeData?.isStarted ?? false);
  let userData = workTimeData;

  const { startWorkDay } = getFirebaseCollections();

  const {
    workedTime: userTime,
    leftTime,
    restOfTimePeriod
  } = useWorkTime({ isStarted, userData });
  const getButtonText = () => isStarted ? 'Stop work day' : 'Start work day';

  const changeStartStatus = async (): Promise<void> => {
    const data = await startWorkDay(!isStarted, leftTime, userTime);
    userData = data;
    setIsStarted(!isStarted);
  };

  const workTimeProps = {
    userTime,
    leftTime,
    isWorkDayFinished: leftTime < 0,
    isStarted,
    restOfTimePeriod
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <button className='mb-7 bg-gray-700 text-slate-50' onClick={changeStartStatus}>{getButtonText()}</button>
      <WorkTimeWrapper {...workTimeProps} />
    </div>
  );
}

export default WorkTime;
