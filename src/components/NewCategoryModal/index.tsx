import * as Dialog from '@radix-ui/react-dialog';
import { CancelButton, CategoriesTable, CloseButton, Content, FormRegisterCategory, Overlay, StyledTypeCategory, TabsContent, TabsList, TabsRoot, TabsTrigger, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, MagnifyingGlass, Pencil, Trash, X } from 'phosphor-react';
import { Controller, useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { useContextSelector } from 'use-context-selector';
import { SearchFormContainer } from './SearchFormContainer/styles';
import { useState } from 'react';

const newCategoryFormSchema = z.object({
    description: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newCategoryFormInputs = z.infer<typeof newCategoryFormSchema>

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function NewCategoryModal() {
    const categories = useContextSelector(CategoriesContext, (context) => {
        return context.categories
    })

    const fetchCategories = useContextSelector(CategoriesContext, (context) => {
        return context.fetchCategories
    })

    const createCategory = useContextSelector(CategoriesContext, (context) => {
        return context.createCategory
    })

    const updateCategory = useContextSelector(CategoriesContext, (context) => {
        return context.updateCategory
    })

    const deleteCategory = useContextSelector(CategoriesContext, (context) => {
        return context.deleteCategory
    })

    const [editingCategory, setEditingCategory] = useState<null | { id: number, description: string, entrance: boolean }>(null)
    const [activeTab, setActiveTab] = useState('registerTab')

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset
    } = useForm<newCategoryFormInputs>({
        resolver: zodResolver(newCategoryFormSchema),
        defaultValues: {
            type: 'outcome',
            description: ''
        }
    })

    const { register: searchRegister, handleSubmit: handleSubmitSearch, formState: { isSubmitting: isSubmittingSearch } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleCreateUpdateCategory(data: newCategoryFormInputs) {
        const { description, type } = data

        const entrance = type === 'outcome' ? false : true

        if (editingCategory) {
            await updateCategory(editingCategory.id, {
                description,
                entrance
            })
        } else {
            await createCategory({
                description,
                entrance
            })
        }

        reset({type: 'income', description: ''})
        setEditingCategory(null)
        setActiveTab('searchTab')
    }

    async function handleDeleteCategory(categoryId: number) {
        await deleteCategory(categoryId)
    }

    function handleEditCategory(category: { id: number, description: string, entrance: boolean }) {
        setEditingCategory(category)
        reset({ description: category.description, type: category.entrance ? 'income' : 'outcome' })
        setActiveTab('registerTab')
    }

    function handleCancelEdit() {
        setEditingCategory(null)
        reset({type: 'income', description: ''})
        setActiveTab('searchTab')
    }

    function handleFetchCategories (data: SearchFormInputs) {

        const { query } = data

        fetchCategories(query)
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <TabsRoot defaultValue="registerTab" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="registerTab">
                            Cadastro
                        </TabsTrigger>
                        <TabsTrigger value="searchTab">
                            Consulta
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="registerTab">
                        <Dialog.Title>{editingCategory ? 'Editar categoria' : 'Nova categoria'}</Dialog.Title>

                        <FormRegisterCategory onSubmit={handleSubmit(handleCreateUpdateCategory)}>
                            <input type="text" placeholder='Descrição' required {...register('description')} />

                            <Controller control={control} name='type' render={({ field }) => {
                                return (
                                    <TransactionType onValueChange={field.onChange} value={field.value}>
                                        <TransactionTypeButton variant='income' value='income'>
                                            <ArrowCircleUp size={24} />
                                            Entrada
                                        </TransactionTypeButton>

                                        <TransactionTypeButton variant='outcome' value='outcome'>
                                            <ArrowCircleDown size={24} />
                                            Saída
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }} />

                            <button type='submit' disabled={isSubmitting}>{editingCategory ? 'Salvar alterações' : 'Cadastrar'}</button>

                            {editingCategory && (
                                <CancelButton type='button' onClick={handleCancelEdit} disabled={isSubmitting}>Cancelar</CancelButton>
                            )}
                        </FormRegisterCategory>
                    </TabsContent>

                    <TabsContent className="TabsContent" value="searchTab">
                        <Dialog.Title>Categorias</Dialog.Title>

                        <SearchFormContainer onSubmit={handleSubmitSearch(handleFetchCategories)}>
                            <input type="text" placeholder="Busque por categorias" {...searchRegister('query')} />
                            <button type="submit" disabled={isSubmittingSearch}>
                                <MagnifyingGlass size={20} />
                                Buscar
                            </button>
                        </SearchFormContainer>


                        <CategoriesTable>
                            <tbody>
                                {categories.map(category => {
                                    return (
                                        <tr key={category.id}>
                                            <td width="40%">{category.description}</td>
                                            <td>
                                                {category.entrance == true ? (
                                                    <StyledTypeCategory variant='income'>
                                                        <ArrowCircleUp size={24} />
                                                    </StyledTypeCategory>
                                                ) : (
                                                    <StyledTypeCategory variant='outcome'>
                                                        <ArrowCircleDown size={24} />
                                                    </StyledTypeCategory>
                                                )}
                                            </td>
                                            <td>
                                                <div>
                                                    <button onClick={() => handleEditCategory(category)}>
                                                        <Pencil size={24} />
                                                    </button>

                                                    <button onClick={() => handleDeleteCategory(category.id)}>
                                                        <Trash size={24} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </CategoriesTable>
                    </TabsContent>

                </TabsRoot>
            </Content>
        </Dialog.Portal>
    )
}
