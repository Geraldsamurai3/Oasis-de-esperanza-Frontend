import { useState, useEffect, useCallback } from "react"
import { getUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  toggleBlockUserRequest, } from "../Services/usersService"

export function useUsers() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsersRequest()
      setUsers(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createUser = useCallback(async (userData) => {
    setError(null)
    await createUserRequest(userData)
    await fetchUsers()
  }, [fetchUsers])

  const updateUser = useCallback(async (id, userData) => {
    setError(null)
    await updateUserRequest(id, userData)
    await fetchUsers()
  }, [fetchUsers])

  const deleteUser = useCallback(async (id) => {
    setError(null)
    await deleteUserRequest(id)
    await fetchUsers()
  }, [fetchUsers])

  const toggleBlockUser = useCallback(async (id) => {
    setError(null)
    await toggleBlockUserRequest(id)
    await fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleBlockUser,
  }
}
