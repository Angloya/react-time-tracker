import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime, TimeInMilliseconds } from '../utils/formatTime';
import { FormattedPeriod } from '../model/interfaces';

interface UseWorkTimeParams {
    isStarted: boolean
    userData?: FormattedPeriod
}

interface WorkTimePeriodState {
    leftTime: number
    workedTime: number
}

interface GetRestOfTimeState {
    workTime: number
    restOfTime: number
}


enum DEFAULT_TIME {
    LEFT_TIME = 1,
    WORK_TIME = 0
}

const getRestOfTime = ({ isStarted, userData }: UseWorkTimeParams): GetRestOfTimeState => {
    const { getHours } = formatTime();
    const todayWorkTime = userData;
    const periods = todayWorkTime?.periods;
    const dayWorkTime = getHours({ time: DEFAULT_TIME.LEFT_TIME });
    let restOfTime = todayWorkTime?.restOfTime ?? dayWorkTime;
    if (periods && isStarted) {
        const date = Date.now();
        const lastPeriodIndex = periods.length;
        const startPeriod = periods[lastPeriodIndex - 1].start;
        if (startPeriod) {
            restOfTime = restOfTime - (date - startPeriod);
        }
    }
    const workTime = dayWorkTime - restOfTime;

    return {
        restOfTime,
        workTime
    };
};

function useWorkTime({ isStarted, userData }: UseWorkTimeParams): WorkTimePeriodState {
    const timeout = useRef<NodeJS.Timeout>();

    const [leftTime, setLeftTime] = useState(() => getRestOfTime({ isStarted, userData }).restOfTime);
    const [workedTime, setWorkedTime] = useState(() => getRestOfTime({ isStarted, userData }).workTime);

    const changeTime = useCallback(() => {
        setLeftTime(() => getRestOfTime({ isStarted, userData }).restOfTime);
        setWorkedTime(() => getRestOfTime({ isStarted, userData }).workTime);
    }, [isStarted, userData]);

    const startTimer = useCallback(() => {
        if (isStarted) {
            timeout.current = setTimeout(changeTime, TimeInMilliseconds.SECOND);
        }

    }, [changeTime, isStarted]);

    useEffect(() => {
        if (isStarted) {
            startTimer();
        }
        return () => {
            clearTimeout(timeout.current);
        };
    }, [isStarted, leftTime, startTimer]);

    return {
        leftTime,
        workedTime
    };
}

export default useWorkTime;