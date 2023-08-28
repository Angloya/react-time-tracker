import { useState, useEffect, ReactElement } from 'react';
import Loading from '../components/ui/Loader';
import WorkTime from '../components/WorkTime';
import getFirebaseCollections from '../utils/getFirebaseCollections';
import { FormattedPeriod } from '../model/interfaces';

export default function Task(): ReactElement {
    const [workTimeData, setWorkTimeData] = useState<FormattedPeriod | undefined>();
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
        <div className="flex justify-center items-start">
            {isLoading
                ? <Loading />
                : <WorkTime workTimeData={workTimeData} />}
        </div>
    );
}
