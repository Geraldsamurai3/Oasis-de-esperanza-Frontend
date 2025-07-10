// src/hooks/useCategories.js
import { useState, useEffect, useCallback } from "react"
import {
  getCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../Services/categoryService"

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCategoriesRequest()
      setCategories(data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = useCallback(
    async payload => {
      await createCategoryRequest(payload)
      await fetchCategories()
    },
    [fetchCategories]
  )

  const updateCategory = useCallback(
    async (id, payload) => {
      await updateCategoryRequest(id, payload)
      await fetchCategories()
    },
    [fetchCategories]
  )

  const removeCategory = useCallback(
    async id => {
      await deleteCategoryRequest(id)
      await fetchCategories()
    },
    [fetchCategories]
  )

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,               // ahora disponible para renombrar
    deleteCategory: removeCategory,
    // si lo usabas para alternar estado, podrías definirlo así (opcional):
  }
}
