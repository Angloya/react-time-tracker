import { DocumentData } from "firebase/firestore";
import { Period, DayWorkTimeDb } from "../model/interfaces";
import { formatTime } from "../utils/formatTime"

enum DEFAULT_TIME {
    LEFT_TIME = 8,
    WORK_TIME = 0
}

export const getFormattedPeriod = (
    {
        data,
        isStarted,
        restOfTime,
        workTime
    }: {
        data?: DocumentData,
        isStarted?: boolean,
        restOfTime?: number,
        workTime?: number,
    }
) => {
    const { getHours } = formatTime()
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const todayData: DayWorkTimeDb | undefined = data && data[date];
    let newPeriod: Period[] = [];


    const todayLeftTime = todayData ? restOfTime : getHours({ time: DEFAULT_TIME.LEFT_TIME });

    if (todayData?.periods) {
        const periods = todayData.periods
        if (!isStarted) {
            periods[periods.length - 1].finish = Date.now()
        }

        newPeriod = [
            ...periods
        ];
    }

    if (isStarted) {
        newPeriod.push({
            start: Date.now()
        })
    }

    return {
        ...(data ? data : {}),
        month,
        isStarted,
        [date]: {
            periods: newPeriod,
            restOfTime: todayLeftTime,
            workTime: todayData ? workTime : DEFAULT_TIME.WORK_TIME,
        }
    }

}