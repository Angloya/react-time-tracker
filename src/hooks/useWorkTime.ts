import { useState, useEffect, useRef, useCallback } from 'react'
import { formatTime, TimeInMilliseconds } from "../utils/formatTime"
import { WorkTimeDb } from "../model/interfaces";

interface UseWorkTimeParams {
    isStarted: boolean
    userData?: WorkTimeDb
}

enum DEFAULT_TIME {
    LEFT_TIME = 8,
    WORK_TIME = 0
}

const checkDayOfMonth = (key: string) => {
    const re = /^([1-9]|[1-2][\d]|3[0-1])$/;
    return re.test(key)
}

const getRestOfTime = ({ isStarted, userData }: UseWorkTimeParams) => {
    const { getHours } = formatTime();
    const todayDate = new Date().getDate();
    const todayWorkTime = userData && userData[todayDate];
    const periods = todayWorkTime?.periods;
    const dayWorkTime = getHours({ time: DEFAULT_TIME.LEFT_TIME })
    let restOfTime = todayWorkTime?.restOfTime ?? dayWorkTime;
    let restOfTimePeriod = 0;

    if (periods && isStarted) {
        const date = Date.now()
        const lastPeriodIndex = periods.length;
        const startPeriod = periods[lastPeriodIndex - 1].start;
        if (startPeriod) {
            restOfTime = restOfTime - (date - startPeriod);
        }
    }

    if (userData) {
        const dayKeys = Object.keys(userData).filter((key) => checkDayOfMonth(key) && todayDate !== Number(key))
        restOfTimePeriod = dayKeys.reduce(
            (accumulator: number, key: string) => 
                accumulator + userData[key].restOfTime, restOfTimePeriod
            )
    }
    const workTime = dayWorkTime - restOfTime

    return {
        restOfTime,
        workTime,
        restOfTimePeriod
    }
}

function useWorkTime({ isStarted, userData }: UseWorkTimeParams) {
    const timeout = useRef<NodeJS.Timeout>();

    const [leftTime, setLeftTime] = useState(() => getRestOfTime({ isStarted, userData }).restOfTime)
    const [workedTime, setWorkedTime] = useState(() => getRestOfTime({ isStarted, userData }).workTime)

    const restOfTimePeriod = getRestOfTime({ isStarted, userData }).restOfTimePeriod

    const changeTime = useCallback(() => {
        setLeftTime(() => getRestOfTime({ isStarted, userData }).restOfTime)
        setWorkedTime(() => getRestOfTime({ isStarted, userData }).workTime)
    }, [isStarted, userData])

    const startTimer = useCallback(() => {
        if (isStarted) {
            timeout.current = setTimeout(changeTime, TimeInMilliseconds.SECOND)
        }

    }, [changeTime, isStarted])

    useEffect(() => {
        if (isStarted) {
            startTimer()
        }
        return () => {
            clearTimeout(timeout.current)
        }
    }, [isStarted, leftTime, startTimer])

    return {
        leftTime,
        workedTime,
        restOfTimePeriod
    }
}

export default useWorkTime