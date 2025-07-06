// src/hooks/useEvents.js
import { useState, useEffect, useCallback } from 'react'
import { createEventRequest,  
  getEventsRequest,
  updateEventRequest,
  deleteEventRequest } from '../Services/eventsService'

export function useEvents() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [saving, setSaving]   = useState(false)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getEventsRequest()
      setEvents(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addEvent = useCallback(async (eventData) => {
    setSaving(true)
    setError(null)
    try {
      await createEventRequest(eventData)
      await fetchEvents()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setSaving(false)
    }
  }, [fetchEvents])

  const updateEvent = useCallback(async (id, eventData) => {
    setSaving(true)
    setError(null)
    try {
      await updateEventRequest(id, eventData)
      await fetchEvents()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setSaving(false)
    }
  }, [fetchEvents])

  const removeEvent = useCallback(async (id) => {
    setSaving(true)
    setError(null)
    try {
      await deleteEventRequest(id)
      await fetchEvents()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setSaving(false)
    }
  }, [fetchEvents])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return {
    events,
    loading,
    error,
    saving,
    fetchEvents,        // <— ahora lo expones directamente
    addEvent,
    updateEvent,
    removeEvent,
    refetch: fetchEvents // opcional alias si quieres
  }
}
