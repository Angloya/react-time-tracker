import { PublicHoliday } from '../../model/interfaces';
import Loader from '../ui/Loader';

interface HolydaysListProps {
    holydays?: PublicHoliday[]
}

export default function HolydaysList({ holydays }: HolydaysListProps) {

    return (
        <div className="rounded-2xl bg-gray-50 px-10 py-5 text-center ring-1 ring-inset ring-gray-900/5">
            <h2 className="font-medium mb-4">Public holidays</h2>
            <div>{
                holydays
                    ? holydays.map((day: PublicHoliday, idx) =>
                        <li key={day.date + idx} className="list-none flex justify-between my-2 py-2 border-indigo-300 border-b-2">
                            <span className="mr-10 max-w-xs text-left">
                                {day.name}
                            </span>
                            <span>
                                {day.date}
                            </span>

                        </li>)
                    : <Loader />
            }</div>
        </div>
    );
}