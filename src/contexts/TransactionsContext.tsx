import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext, useContextSelector } from "use-context-selector";
import { AlertContext } from "./AlertContext";
import { Description } from "@radix-ui/react-dialog";

interface Trasaction {
    id: number
    description: string
    categoryid: number
    category: string
    type: 'income' | 'outcome'
    value: number
    date: string
}

interface CreateTransactionInput {
    description: string
    categoryid: number
    value: number
}

interface TransactionContextType {
    transactions: Trasaction[]
    editingTransaction: null | { id: number } & CreateTransactionInput
    transactionModalOpen: boolean,
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
    updateTransaction: (transactionId: number, data: CreateTransactionInput) => Promise<void>
    deleteTransaction: (transactionId: number) => Promise<void>
    setEditingTransaction: (editingTransaction: null | { id: number } & CreateTransactionInput) => void
    setTransactionModalOpen: (open: boolean) => void
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Trasaction[]>([])
    const [editingTransaction, setEditingTransaction] = useState<null | { id: number } & CreateTransactionInput>(null)
    const [transactionModalOpen, setTransactionModalOpen] = useState<boolean>(false)

    const showAlert = useContextSelector(AlertContext, (context) => {
        return context.showAlert
    })

    const fetchTransactions = useCallback(async (query?: string) => {

        try {
            const response = await api.get('/operations', {
                params: {
                    description: query
                }
            })

            if (response.status === 200) {
                setTransactions(response.data)
            } else {
                showAlert(response.data.message, 'error')
            }

        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }

    }, [])

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { value, categoryid, description } = data

        try {
            const response = await api.post('/operations', {
                description,
                value,
                id_category: categoryid,
            })

            if (response.status === 201) {
                showAlert(response.data.message, 'success')
                fetchTransactions()
                // setTransactions(state => [response.data, ...state])
            } else {
                showAlert(response.data.message, 'error')
            }

        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }
    }, [])

    const updateTransaction = useCallback(async (transactionId: number, data: CreateTransactionInput) => {
        const { value, categoryid, description } = data

        try {
            const response = await api.put(`/operations/${transactionId}`, {
                description,
                value,
                id_category: categoryid,
            })

            if (response.status === 200) {
                showAlert(response.data.message, 'success')
                fetchTransactions()
                // setTransactions(prevTransactions =>
                //     prevTransactions.map(transaction =>
                //         transaction.id === transactionId ? { ...transaction, value, categoryid, description } : transaction
                //     )
                // )
            } else {
                showAlert(response.data.message, 'error')
            }
        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }
    }, [])

    const deleteTransaction = useCallback(async (transactionId: number) => {

        try {
            const response = await api.delete(`/operations/${transactionId}`)

            if (response.status === 200) {
                showAlert(response.data.message, 'success')
                setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== transactionId));
            } else {
                showAlert(response.data.message, 'error')
            }

        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{
            transactions,
            editingTransaction,
            transactionModalOpen,
            fetchTransactions,
            createTransaction,
            updateTransaction,
            deleteTransaction,
            setEditingTransaction,
            setTransactionModalOpen
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

