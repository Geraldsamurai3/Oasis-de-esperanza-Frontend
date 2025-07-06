// src/services/publicEventsService.js
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Helper genérico público (sin Authorization)
 */
async function publicRequest(path, opts = {}) {
  const { method = 'GET', body = null, headers = {} } = opts

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body instanceof FormData
      ? body
      : body
      ? JSON.stringify(body)
      : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }
  return res.json()
}

/** Obtiene lista pública de eventos */
export function fetchPublicEvents() {
  return publicRequest('/events', { method: 'GET' })
}

/** Obtiene detalles de un evento público por ID */
export function fetchPublicEventById(id) {
  return publicRequest(`/events/${id}`, { method: 'GET' })
}
