import { formatTime } from "../utils/formatTime"

interface WorkTimeDetailsProps {
    isWorkDayFinished: boolean
    userLeftTime: number
    isStarted: boolean,
}

function WorkTimeDetails({ isWorkDayFinished, userLeftTime, isStarted }: WorkTimeDetailsProps) {
    const {
        converMillisecondsToTime,
        getFormattedDate,
        getFormattedTime
    } = formatTime();

    const formattedTime = converMillisecondsToTime(userLeftTime);
    const text = isWorkDayFinished ? 'Overtime for period' : 'Remaining for period';
    const dateNow = new Date(Date.now() + userLeftTime);
    const date = getFormattedDate(dateNow);
    const time = isWorkDayFinished ? getFormattedTime(new Date()) : getFormattedTime(dateNow);

    return (
        <>
            <div className={'work-time-details'}>
                {isStarted &&
                    <>
                        <p className={'work-time-details-text'}>
                            <span>Expected end date of work day</span>
                            <span>{date}</span>
                        </p>
                        <p className={'work-time-details-text'}>
                            <span>Expected end time of work day</span>
                            <span>{time}</span>
                        </p>
                    </>
                }

                <p className={'work-time-details-text'}>
                    <span>{text}</span>
                    <span>{formattedTime}</span>
                </p>
            </div>
        </>
    )
}

export default WorkTimeDetails