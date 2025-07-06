// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Helper genérico para hacer fetch a tu API
 * Inyecta automáticamente el JWT desde localStorage en Authorization
 */
export async function request(path, opts = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
    credentials = 'include', // mantiene cookies httpOnly si las usas
  } = opts

  // 1) Leer el token que guardaste tras el login
  const token = localStorage.getItem('token')
  // 2) Crear la cabecera Authorization solo si hay token
  const authHeader = token
    ? { Authorization: `Bearer ${token}` }
    : {}

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...headers,
    },
    credentials,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    // intenta leer mensaje de error JSON
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }

  return res.json()
}

/** POST /auth/login */
export function loginRequest(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: { email, password },
    credentials: 'include',
  })
}

/** POST /auth/logout */
export function logoutRequest() {
  return request('/auth/logout', {
    method: 'POST',
  })
}

/** GET /auth/profile */
export function profileRequest() {
  return request('/auth/profile', {
    method: 'GET',
  })
}
