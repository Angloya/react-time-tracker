import { useState, useEffect,  } from 'react'
import WorkTime from '../components/WorkTime'
import getFirebaseCollections from "../utils/getFirebaseCollections"
import { WorkTimeDb } from "../model/interfaces";


function App() {
  const [workTimeData, setWorkTimeData] = useState<WorkTimeDb | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    const dataFetch = async () => {
      const { getWorkDayData } = getFirebaseCollections();
      const result = await getWorkDayData()
      setWorkTimeData(result);
      setIsLoading(false)
    }

    dataFetch();
  }, [])

  return (
    <>
      <div className='app-page'>
        {isLoading
          ? 'load'
          : <WorkTime workTimeData={workTimeData} />}
      </div>
    </>
  )
}

export default App
