import Modal from '../ui/Modal';
import NewTaskForm from './NewTaskForm';

interface AddTaskPopupProps {
    closeEvent: () => void
    createdEvent: () => void
}

export default function AddTaskPopup({ closeEvent, createdEvent }: AddTaskPopupProps): JSX.Element {
    return (
        <Modal closeEvent={closeEvent}>
            <h3 className="mb-4 text-xl font-medium text-gray-900">Create new task</h3>
            <NewTaskForm createdEvent={createdEvent} />
        </Modal>
    );
}