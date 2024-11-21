import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TableContainer, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/fomatter";
import { useContextSelector } from "use-context-selector";
import { Pencil, Trash } from "phosphor-react";

export function Transactions() {

    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    const deleteTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.deleteTransaction
    })

    const setEditingTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.setEditingTransaction
    })

    async function handleDeleteTransactions(transactionId: number) {
        await deleteTransaction(transactionId)
    }

    function handleEditTransaction(transaction: { id: number, description: string, value: number, categoryid: number }) {
        setEditingTransaction(transaction)
    }

    return (
        <>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TableContainer>
                    <TransactionsTable>
                        <tbody>
                            {transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td width="35%">{transaction.description}</td>
                                        <td>
                                            <PriceHighlight variant={transaction.type}>
                                                {transaction.type === 'outcome' && '- '}
                                                {priceFormatter.format(transaction.value)}
                                            </PriceHighlight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{dateFormatter.format(new Date(transaction.date))}</td>
                                        <td>
                                            <div>
                                                <button onClick={() => handleEditTransaction(transaction)}>
                                                    <Pencil size={24} />
                                                </button>

                                                <button onClick={() => handleDeleteTransactions(transaction.id)}>
                                                    <Trash size={24} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </TransactionsTable >
                </TableContainer>
            </TransactionsContainer>
        </>
    )
}