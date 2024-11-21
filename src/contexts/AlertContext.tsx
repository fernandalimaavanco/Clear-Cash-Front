import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

type AlertType = 'success' | 'error' | 'warning'

interface Alert {
    message: string
    type: AlertType
}

interface AlertContextType {
    showAlert: (message: string, type: AlertType) => void
    alert: Alert | null
    hideAlert: () => void
}

interface AlertProviderProps {
    children: ReactNode
}

export const AlertContext = createContext({} as AlertContextType)

export function AlertProvider({ children }: AlertProviderProps) {
    const [alert, setAlert] = useState<Alert | null>(null)

    function showAlert(message: string, type: AlertType) {
        setAlert({ message, type })
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }

    function hideAlert() {
        setAlert(null)
    }

    return (
        <AlertContext.Provider value={{ showAlert, alert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    )
}
