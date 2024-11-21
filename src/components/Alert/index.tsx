import { useContextSelector } from 'use-context-selector';
import { AlertContext } from '../../contexts/AlertContext';
import { AlertContainer } from './styles';

export function Alert() {
    const alert = useContextSelector(AlertContext, (context) => context?.alert);
    const hideAlert = useContextSelector(AlertContext, (context) => context?.hideAlert);

    if (!alert) return null;

    return (
        <AlertContainer type={alert.type}>
            <span>{alert.message}</span>
            <button onClick={hideAlert}>&times;</button>
        </AlertContainer>
    );
};

export default Alert;