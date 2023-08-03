import { useState } from 'react'
import WorkTimeWrapper from './WorkTimeWrapper'
import useWorkTime from "../hooks/useWorkTime"
import getFirebaseCollections from "../utils/getFirebaseCollections"
import { WorkTimeDb } from "../model/interfaces";


function WorkTime({ workTimeData }: { workTimeData: WorkTimeDb | undefined }) {
  const [isStarted, setIsStarted] = useState(workTimeData?.isStarted ?? false);
  const [userData, setUserData] = useState(workTimeData);

  const { startWorkDay } = getFirebaseCollections();

  const { 
    workedTime: userTime,
    leftTime,
    restOfTimePeriod 
  } = useWorkTime({ isStarted, userData });
  const getButtonText = () => isStarted ? 'Stop work day' : 'Start work day';

  const changeStartStatus = async (): Promise<void> => {
    const data = await startWorkDay(!isStarted, leftTime, userTime);
    setUserData(data)
    setIsStarted(!isStarted);
  }

  const workTimeProps = {
    userTime,
    leftTime,
    isWorkDayFinished: leftTime < 0,
    isStarted,
    restOfTimePeriod
  }

  return (
      <div className='work-time-block'>
        <button className='start-day-button' onClick={changeStartStatus}>{getButtonText()}</button>
        <WorkTimeWrapper {...workTimeProps} />
      </div>
  )
}

export default WorkTime
