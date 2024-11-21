import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    const summary = useMemo(() => {
        return transactions.reduce((accumulator, transaction) => {

            if (transaction.type === 'income') {
                accumulator.income += transaction.value
                accumulator.total += transaction.value
            } else {
                accumulator.outcome += transaction.value
                accumulator.total -= transaction.value
            }

            return accumulator
        }, { income: 0, outcome: 0, total: 0 })
    }, [transactions])

    return summary
}