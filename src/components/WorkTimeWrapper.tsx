import { formatTime } from '../utils/formatTime';
import WorkTimeDetails from './WorkTimeDetails';

interface WorkTimeProps {
    leftTime: number
    userTime: number
    isWorkDayFinished: boolean
    isStarted: boolean,
    restOfTimePeriod: number
}

function WorkTimeWrapper({ leftTime, userTime, isWorkDayFinished, isStarted, restOfTimePeriod }: WorkTimeProps): JSX.Element {
    const { converMillisecondsToTime } = formatTime();

    const userLeftTime = leftTime > 0 ? leftTime : Math.abs(leftTime);

    const formattedTime = converMillisecondsToTime(userLeftTime);
    const formattedUserTime = converMillisecondsToTime(userTime);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const date = new Date().toLocaleString('en-GB', options);

    const leftFinishedClassNames = isWorkDayFinished ? 'text-green-700 font-medium' : 'text-red-500 font-medium';
    const leftText = isWorkDayFinished ? 'Overtime' : 'Left';
    const userRestOfTime = isWorkDayFinished ? restOfTimePeriod + leftTime : restOfTimePeriod;

    const workTimeDetailsProps = {
        userTime,
        isWorkDayFinished: userRestOfTime < 0,
        userLeftTime: userRestOfTime,
        isStarted,
    };
    return (
        <div className="flex flex-col border bg-gray-50 items-center mt-4 w-96 h-[400px]">
            <div className="relative flex justify-between bg-slate-200 rounded w-72 p-8 m-4">
                <p className="absolute rounded -top-4 left-12 text-sm bg-slate-50 p-1">Today {date}</p>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-2xl font-medium">{formattedTime}</span>
                    <span className={leftFinishedClassNames}>{leftText}</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-2xl font-medium">{formattedUserTime}</span>
                    <span className="font-medium">Total</span>
                </div>
            </div>

            <WorkTimeDetails {...workTimeDetailsProps} />
        </div>
    );
}

export default WorkTimeWrapper;
