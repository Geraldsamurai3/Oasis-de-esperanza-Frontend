// src/services/eventsService.js
const BASE_URL = import.meta.env.VITE_API_URL

async function eventsRequest(path, opts = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
  } = opts

  // 1) Leer el token
  const token = localStorage.getItem('token')
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

  // 2) Detectar si es FormData (subida de imagen)
  const isFormData = body instanceof FormData

  // 3) Construir las cabeceras, sólo Content-Type JSON si no es FormData
  const finalHeaders = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...authHeader,
    ...headers,
  }

  // 4) Ejecutar fetch
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    credentials: 'include',
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }
  return res.json()
}

export function getEventsRequest() {
  return eventsRequest('/events', { method: 'GET' })
}

// Ahora create/update pueden recibir FormData o JSON
export function createEventRequest(data) {
  return eventsRequest('/events', { method: 'POST', body: data })
}

export function updateEventRequest(id, data) {
  return eventsRequest(`/events/${id}`, { method: 'PUT', body: data })
}

export function deleteEventRequest(id) {
  return eventsRequest(`/events/${id}`, { method: 'DELETE' })
}
