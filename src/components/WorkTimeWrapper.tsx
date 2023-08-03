import { formatTime } from "../utils/formatTime"
import WorkTimeDetails from "./WorkTimeDetails"

interface WorkTimeProps {
    leftTime: number
    userTime: number
    isWorkDayFinished: boolean
    isStarted: boolean,
    restOfTimePeriod: number
}

function WorkTime({ leftTime, userTime, isWorkDayFinished, isStarted, restOfTimePeriod }: WorkTimeProps) {
    const { converMillisecondsToTime } = formatTime();

    const userLeftTime = leftTime > 0 ? leftTime : Math.abs(leftTime);

    const formattedTime = converMillisecondsToTime(userLeftTime);
    const formattedUserTime = converMillisecondsToTime(userTime);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    const date = new Date().toLocaleString('en-GB', options);

    const leftFinishedClassNames = isWorkDayFinished ? 'work-time-finished' : 'work-time-stop';
    const leftText = isWorkDayFinished ? 'Overtime' : 'Left';
    const userRestOfTime = isWorkDayFinished ? restOfTimePeriod + leftTime : restOfTimePeriod;

    const workTimeDetailsProps = {
        userTime,
        isWorkDayFinished: userRestOfTime < 0,
        userLeftTime: userRestOfTime,
        isStarted,
    }
    return (
            <div className={'work-time-wrapper'}>
                <div className={'work-time'}>
                    <p className="work-time-date">Today {date}</p>
                    <div className="work-time-block">
                        <span className="work-time-time">{formattedTime}</span>
                        <span className={`${leftFinishedClassNames} work-time-text`}>{leftText}</span>
                    </div>
                    <div className="work-time-block">
                        <span className="work-time-time">{formattedUserTime}</span>
                        <span className="work-time-text">Total</span>
                    </div>
                </div>

                <WorkTimeDetails {...workTimeDetailsProps} />
            </div>
    )
}

export default WorkTime
