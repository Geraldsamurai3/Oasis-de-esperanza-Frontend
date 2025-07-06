// src/hooks/usePublicEventDetail.js
import { useState, useEffect, useCallback } from 'react'
import { fetchPublicEventById } from '../../services/publicEventsService'

/**
 * Hook para cargar datos de un solo evento en la página informativa
 */
export function usePublicEventDetail(id) {
  const [event, setEvent]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const loadEvent = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPublicEventById(id)
      setEvent(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadEvent()
  }, [loadEvent])

  return {
    event,
    loading,
    error,
    refetch: loadEvent,
  }
}
