import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext, useContextSelector } from "use-context-selector";
import { AlertContext } from "./AlertContext";
import { Description } from "@radix-ui/react-dialog";

interface Category {
    id: number
    description: string
    entrance: boolean
}

interface CreateUpdateCategoryInput {
    description: string
    entrance: boolean
}

interface CategoryContextentrance {
    categories: Category[]
    fetchCategories: (query?: string) => Promise<void>
    createCategory: (data: CreateUpdateCategoryInput) => Promise<void>
    updateCategory: (categoryId: number, data: CreateUpdateCategoryInput) => Promise<void>
    deleteCategory: (categoryId: number) => Promise<void>
}

interface CategoriesProviderProps {
    children: ReactNode
}

export const CategoriesContext = createContext({} as CategoryContextentrance)

export function CategoriesProvider({ children }: CategoriesProviderProps) {

    const [categories, setCategories] = useState<Category[]>([])

    const showAlert = useContextSelector(AlertContext, (context) => {
        return context.showAlert
    })

    const fetchCategories = useCallback(async (query?: string) => {

        try {
            const response = await api.get('/categories', {
                params: {
                    description: query
                }
            })

            if (response.status === 200) {
                setCategories(response.data)
            } else {
                showAlert(response?.data?.message || 'Erro ao buscar categoria!', 'error')
            }

        } catch (error: any) {
            showAlert(error.response?.data?.message, 'error')
        }
    }, [])

    const createCategory = useCallback(async (data: CreateUpdateCategoryInput) => {
        const { description, entrance } = data

        try {
            const response = await api.post('/categories', {
                description,
                entrance: entrance ? 'true' : 'false',
            })

            if (response.status === 201) {
                showAlert(response?.data?.message, 'success')
                fetchCategories()
                // setCategories(state => [response.data, ...state])
            } else {
                showAlert(response?.data?.message || 'Erro ao cadastrar a categoria.', 'error')
            }

        } catch (error: any) {
            showAlert(error.response?.data?.message, 'error')
        }
    }, [])

    const updateCategory = useCallback(async (categoryId: number, data: CreateUpdateCategoryInput) => {
        const { description, entrance } = data;

        try {

            const response = await api.put(`/categories/${categoryId}`, {
                description,
                entrance: entrance ? 'true' : 'false',
            })

            if (response.status === 200) {

                showAlert(response?.data?.message, 'success')

                setCategories(prevCategories =>
                    prevCategories.map(category =>
                        category.id === categoryId ? { ...category, description, entrance } : category
                    )
                )
            } else {
                showAlert(response?.data?.message || 'Erro ao atualizar a categoria.', 'error')
            }

        } catch (error: any) {
            showAlert(error.response?.data?.message, 'error')
        }

    }, [])

    const deleteCategory = useCallback(async (categoryId: number) => {

        try {
            const response = await api.delete(`/categories/${categoryId}`)

            if (response.status === 200) {
                showAlert(response.data.message, 'success')
                setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId))
            } else {
                showAlert(response.data.message || 'Erro ao deletar a categoria.', 'error')
            }

        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    return (
        <CategoriesContext.Provider value={{
            categories,
            fetchCategories,
            createCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </CategoriesContext.Provider>
    )
}

