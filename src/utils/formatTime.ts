export enum Time {
    HOUR = 'HOUR',
    MINUTE = 'MINUTE',
    SECOND = 'SECOND'
}

export const TimeInMilliseconds = {
    [Time.HOUR]: 1000 * 60 * 60,
    [Time.MINUTE]: 1000 * 60,
    [Time.SECOND]: 1000
};

interface FormatTime {
    getHours: ({ time }: {time: number }) => number
    converMillisecondsToTime: (time: number) => string
    getMilliseconds: (time: number, format: Time) => number
    getFormattedDate: (date: Date) => string
    getFormattedTime: (date: Date) => string
    converMillisecondsToHour: (time: number) => number
}

export function formatTime(): FormatTime {
    const getHours = ({ time }: { time: number }): number => time * TimeInMilliseconds.HOUR;

    const getMilliseconds = (time: number, format: Time): number => time * TimeInMilliseconds[format];

    const converMillisecondsToTime = (time: number): string => {
        const seconds = String((Math.round(time / TimeInMilliseconds.SECOND) % 60));
        const minutes = String(Math.floor((time / TimeInMilliseconds.MINUTE) % 60));
        const hours = String(Math.floor((time / TimeInMilliseconds.HOUR) % 24));
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    };

    const converMillisecondsToHour = (time: number): number => {
        return Math.floor((time / TimeInMilliseconds.HOUR) % 24);
    };

    const getFormattedDate = (date: Date): string => date.toLocaleDateString();
    const getFormattedTime = (date: Date): string => date.toLocaleTimeString();

    return {
        getHours,
        converMillisecondsToTime,
        getMilliseconds,
        getFormattedDate,
        getFormattedTime,
        converMillisecondsToHour
    };
}