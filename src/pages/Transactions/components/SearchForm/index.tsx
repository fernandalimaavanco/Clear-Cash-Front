import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { SearchFormContainer } from "./styles";

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    function handleFetchTransactions (data: SearchFormInputs) {

        const {query} = data
        fetchTransactions(query)

    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleFetchTransactions)}>
            <input type="text" placeholder="Busque por transações" {...register('query')} />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}