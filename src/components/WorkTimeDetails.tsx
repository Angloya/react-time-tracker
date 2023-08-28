import { formatTime } from '../utils/formatTime';
import DetailsText from '../components/ui/DetailsText';

interface WorkTimeDetailsProps {
    isStarted: boolean,
}

export default function WorkTimeDetails({ isStarted }: WorkTimeDetailsProps): JSX.Element {

    return (
        <div className="w-full flex flex-col p-4">
            {isStarted &&
                <>
                    <DetailsText>
                        <span>Expected end date of work day</span>
                        <span></span>
                    </DetailsText>
                    <DetailsText>
                        <span>Expected end time of work day</span>
                        <span></span>
                    </DetailsText>
                </>
            }
        </div>
    );
}
