import { useState, useEffect, Suspense, lazy, ReactElement } from 'react';
import Loading from '../components/ui/Loader';
import WorkTime from '../components/WorkTime';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import { WorkTimeDb } from '../model/interfaces';

const HolydayWidget = lazy(() => import('../components/holydaysWidget'));

function App(): ReactElement {
  const [workTimeData, setWorkTimeData] = useState<WorkTimeDb | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const dataFetch = async (): Promise<void> => {
      const { getWorkDayData } = getFirebaseCollections();
      const result = await getWorkDayData();
      setWorkTimeData(result);
      setIsLoading(false);
    };

    dataFetch();
  }, []);

  return (
    <div className="flex justify-start items-start">
      <div className="mr-20">
        <Suspense fallback={<Loading />}>
          <HolydayWidget />
        </Suspense>
      </div>

      {isLoading
        ? <Loading />
        : <WorkTime workTimeData={workTimeData} />}
    </div>
  );
}

export default App;
