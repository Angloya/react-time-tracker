import { useParams } from 'react-router-dom';

function SettingsPage() {
    const { id } = useParams();
    return (
        <>
            <div>Страница настроек</div>
            {id}
        </>
    );
}

export default SettingsPage;