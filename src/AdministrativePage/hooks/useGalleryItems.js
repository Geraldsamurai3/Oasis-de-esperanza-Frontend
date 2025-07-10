import { useState, useCallback, useEffect } from "react"
import {
  getGalleryItemsByCategoryRequest,
  getGalleryItemsRequest,
  createGalleryItemRequest,
  deleteGalleryItemRequest,
} from "../Services/galleryService"

export function useGalleryItems() {
  const [items, setItems]       = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getGalleryItemsRequest()
      setItems(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchByCategory = useCallback(async (catId) => {
    setLoading(true); setError(null)
    try {
      const data = await getGalleryItemsByCategoryRequest(catId)
      setItems(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createItem = useCallback(async (formData) => {
    setError(null)
    await createGalleryItemRequest(formData)
    await fetchAll()
  }, [fetchAll])

  const removeItem = useCallback(async (id) => {
    setError(null)
    await deleteGalleryItemRequest(id)
    await fetchAll()
  }, [fetchAll])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return {
    items,
    loading,
    error,
    fetchAll,
    fetchItemsByCategory: fetchByCategory,
    uploadItem: createItem,
    deleteItem: removeItem,
  }
}
