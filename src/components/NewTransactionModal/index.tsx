import * as Dialog from '@radix-ui/react-dialog';
import { CancelButton, CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useEffect } from 'react';

const newTransactionFormSchema = z.object({
    description: z
        .string()
        .min(3, { message: "Descrição deve ter pelo menos 3 caracteres" })
        .max(255, { message: "Descrição deve ter no máximo 255 caracteres" }),
    value: z
        .number()
        .nullable()
        .refine(val => val !== null && val > 0, { message: "Preço deve ser maior que zero" }),
    categoryid: z
        .number()
        .nullable()
        .refine(val => val != null && val > 0, { message: "Categoria inválida" }),
});

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    const categories = useContextSelector(CategoriesContext, (context) => {
        return context.categories
    })

    const editingTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.editingTransaction
    })

    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction
    })

    const updateTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.updateTransaction
    })

    const setEditingTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.setEditingTransaction
    })

    const setTransactionModalOpen = useContextSelector(TransactionsContext, (context) => {
        return context.setTransactionModalOpen
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset
    } = useForm<newTransactionFormInputs>({
        resolver:
            zodResolver(newTransactionFormSchema),
        defaultValues: {
            categoryid: undefined,
            description: '',
            value: undefined
        }
    })

    useEffect(() => {

        if (editingTransaction != null) {
            reset({ description: editingTransaction.description, value: editingTransaction.value, categoryid: editingTransaction.categoryid })
            setTransactionModalOpen(true)

            return
        }

        reset({ description: '', value: null, categoryid: 0 })

    }, [editingTransaction])

    async function handleCreateUpdateTransactions(data: newTransactionFormInputs) {

        const { description, value, categoryid } = data

        if (value && categoryid) {
            if (editingTransaction) {
                await updateTransaction(editingTransaction.id, {
                    description,
                    value,
                    categoryid
                })
            } else {
                await createTransaction({
                    description,
                    value,
                    categoryid,
                })
            }
        }

        reset({
            description: '',
            value: null,
            categoryid: 0,
        })

        setEditingTransaction(null)
    }

    function handleCancelEdit() {
        setEditingTransaction(null)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateUpdateTransactions)}>
                    <div>
                        <input type="text" placeholder='Descrição' required {...register('description')} />
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>

                    <div>
                        <input type="number" placeholder='Preço' required {...register('value', { valueAsNumber: true })} />
                        {errors.value && <p>{errors.value.message}</p>}
                    </div>

                    <div>
                        <select {...register('categoryid', { valueAsNumber: true })} required>
                            <option value={0}>Selecione uma categoria</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.description}
                                </option>
                            ))}
                        </select>
                        {errors.categoryid && <p>{errors.categoryid.message}</p>}
                    </div>

                    <button type='submit' disabled={isSubmitting}>Salvar</button>

                    {editingTransaction && (
                        <CancelButton type='button' onClick={handleCancelEdit} disabled={isSubmitting}>Cancelar</CancelButton>
                    )}
                </form>
            </Content>
        </Dialog.Portal>
    )
}