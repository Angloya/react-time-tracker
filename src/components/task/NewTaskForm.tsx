import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormError from '../ui/FormError';
import Loader from '../ui/Loader';
import firebaseCollections from '../../firebase/firebaseCollections';
import { TaskItem } from '../../model/interfaces';
import { TaskStatus } from '../../model/enums';

type FormData = Exclude<TaskItem, 'id'>

interface NewTaskFormProps {
    createdEvent: () => void
}

export default function NewTaskForm({ createdEvent }: NewTaskFormProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        defaultValues: { fullTime: 1, group: 'common', spendTime: 0, status: TaskStatus.OPENED }
    });

    const fullTimeData = watch('fullTime');

    const { createTask } = firebaseCollections();
    const onSubmit = async (data: FormData): Promise<void> => {
        setIsLoading(true);
        try {
            await createTask(data);
            createdEvent();
        } catch (error) {
            console.error('Create task error');
        }
        setIsLoading(false);
    };

    return (
        <>
            {
                isLoading
                    ? <Loader />
                    : <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input {...register('title', { required: true })} type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Task title" />
                            {errors.title?.type === 'required' && <FormError>Title name is required</FormError>}
                        </div>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <input {...register('text')} type="text" name="text" placeholder="Add some description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="groups" className="block mb-2 text-sm font-medium text-gray-900">Select your Group</label>
                            <select {...register('group', { required: true })} id="groups" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="common">Common</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="small-range" className="block mb-2 text-sm font-medium text-gray-900">How many hours would you like to spend on this task?</label>
                            <span className="mb-2 text-lg font-semibold text-blue-700 ">{fullTimeData}</span>
                            <input {...register('fullTime', { required: true })} type="range" min="1" max="100" step="1" className="w-full h-1 mb-6 range cursor-pointer bg-gray-200" />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create new task</button>
                    </form>
            }
        </>

    );
}