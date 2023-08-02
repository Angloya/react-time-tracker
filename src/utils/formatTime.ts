export enum Time {
    HOUR = 'HOUR',
    MINUTE = 'MINUTE',
    SECOND = 'SECOND'
}

export const TimeInMilliseconds = {
    [Time.HOUR]: 1000 * 60 * 60,
    [Time.MINUTE]: 1000 * 60,
    [Time.SECOND]: 1000
}

export function formatTime() {
    const getHours = ({ time }: { time: number }): number => time * TimeInMilliseconds.HOUR

    const getMilliseconds = (time: number, format: Time): number => time / TimeInMilliseconds[format]

    const converMillisecondsToTime = (time: number): string => {
        const seconds = String((Math.round(time / TimeInMilliseconds.SECOND) % 60));
        const minutes = String(Math.floor((time / TimeInMilliseconds.MINUTE) % 60));
        const hours = String(Math.floor((time / TimeInMilliseconds.HOUR) % 24));
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    }

    const getFormattedDate = (date: Date) => date.toLocaleDateString();
    const getFormattedTime = (date: Date) => date.toLocaleTimeString();

    return {
        getHours,
        converMillisecondsToTime,
        getMilliseconds,
        getFormattedDate,
        getFormattedTime
    }
}