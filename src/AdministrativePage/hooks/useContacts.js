// src/hooks/useContacts.js
import { useState, useEffect, useCallback } from 'react'
import {  fetchContacts,
  updateContactStatusRequest,
  assignContactRequest,
 } from '../Services/contactsService'

export function useContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchContacts()
      setContacts(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateStatus = useCallback(async (id, status) => {
    setLoading(true)
    setError(null)
    try {
      await updateContactStatusRequest(id, status)
      await load()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [load])

  const assign = useCallback(async (id, assignedTo) => {
    setLoading(true)
    setError(null)
    try {
      await assignContactRequest(id, assignedTo)
      await load()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    load()
  }, [load])

  return {
    contacts,
    loading,
    error,
    reload: load,
    updateStatus,
    assign,
  }
}
