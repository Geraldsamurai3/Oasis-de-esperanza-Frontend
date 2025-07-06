// src/services/authService.js
const API = import.meta.env.VITE_API_URL

export async function loginRequest(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    credentials: 'include',            // si tu backend responde con cookie httpOnly
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }

  return res.json() // asume { user: {...}, token: '...' }
}

export function logoutRequest() {
  // Si usas cookie httpOnly podrías llamar a un /auth/logout
  return fetch(`${API}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}
