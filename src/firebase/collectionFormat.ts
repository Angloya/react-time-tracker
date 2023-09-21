import { DocumentData } from 'firebase/firestore';
import { Period, FormattedPeriod, FormattedCaledar, TaskItem, TaskCollection } from '../model/interfaces';
import { TaskStatus } from '../model/enums';
import { formatTime } from '../utils/formatTime';

enum DEFAULT_TIME {
    LEFT_TIME = 1,
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
): FormattedPeriod => {
    const { getHours } = formatTime();
    const date = new Date().getDate();
    const todayData = data as FormattedPeriod;
    let newPeriod: Period[] = [];


    const todayLeftTime = todayData ? restOfTime : getHours({ time: DEFAULT_TIME.LEFT_TIME });

    if (todayData?.periods) {
        const periods = todayData.periods;
        if (!isStarted) {
            periods[periods.length - 1].finish = Date.now();
        }

        newPeriod = [
            ...periods
        ];
    }

    if (isStarted) {
        newPeriod.push({
            start: Date.now()
        });
    }

    return {
        ...(data ? data : {}),
        day: date,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        startTime: Date.now(),
        isStarted,
        periods: newPeriod,
        restOfTime: todayLeftTime,
        workTime: todayData ? workTime : DEFAULT_TIME.WORK_TIME,
    };

};

export const getFormattedCalendar = ({ period, calendar }: {
    period: FormattedPeriod,
    calendar?: FormattedCaledar
}): FormattedCaledar => {
    let newCalendar: FormattedCaledar = { ...(calendar ? calendar : {}) };
    const { converMillisecondsToHour } = formatTime();
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;

    const year = new Date().getFullYear();
    const todayData = newCalendar[year] && newCalendar[year][month] && newCalendar[year][month][date];
    if (todayData) {
        newCalendar[year][month][date] = {
            ...todayData,
            fullHour: 0,
            periods: { ...period.periods, ...todayData.periods }
        };
    } else {
        const fullHour = converMillisecondsToHour(period.periods.reduce((acc, curr) => {
            if (curr.finish && curr.start) {
                return acc + (curr.start - curr.finish);
            } else {
                return acc;
            }
        }, 0));
        newCalendar = {
            [year]: {
                [month]: {
                    [date]: {
                        date: period.year,
                        fullHour,
                        periods: period.periods
                    }
                }
            }
        };
    }

    return newCalendar;
};

export const getTasksFormatted = ({ task, taskCollection, items }: { task?: Exclude<TaskItem, 'id'>, taskCollection?: TaskCollection, items?: TaskItem[] }): TaskCollection => {
    const formattedTasks: TaskItem[] = [...taskCollection?.items ?? []];
    if (task) {
        const newTaskItem = { ...task };
        newTaskItem.id = Date.now();
        formattedTasks.push(newTaskItem);
    }

    return {
        items: items ? items : formattedTasks,
        count: formattedTasks.length
    };
};