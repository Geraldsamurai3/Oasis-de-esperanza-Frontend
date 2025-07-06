// src/AdministrativePage/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import { loginRequest } from '@/services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  // Al montar, hidrata desde el token
  useEffect(() => {
    const raw = localStorage.getItem('token')
    if (raw) {
      const payload = decodeToken(raw)
      if (payload) {
        setUser(payload)  // tendrá name, email y role
      } else {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  // Login: solo loginRequest + decodeToken
  const login = async (email, password) => {
    setLoading(true)
    try {
      const { accessToken } = await loginRequest(email, password)
      if (!accessToken) {
        throw new Error('No se recibió accessToken')
      }
      localStorage.setItem('token', accessToken)
      const payload = decodeToken(accessToken)
      setUser(payload)
      return payload
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
