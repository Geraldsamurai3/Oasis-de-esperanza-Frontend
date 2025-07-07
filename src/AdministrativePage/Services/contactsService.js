// src/services/contactsService.js
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Helper genérico para hacer fetch a tu API (sin auth)
 */
async function request(path, opts = {}) {
  const { method = 'GET', body = null, headers = {} } = opts

  // detecta FormData vs JSON
  const isForm = body instanceof FormData
  const finalHeaders = {
    ...(!isForm && { 'Content-Type': 'application/json' }),
    ...headers,
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }
  return res.json()
}

/** GET /contacts */
export function fetchContacts() {
  return request('/contacts')
}

/** PUT /contacts/:id/status */
export function updateContactStatusRequest(id, status) {
  return request(`/contacts/${id}/status`, {
    method: 'PATCH',
    body: { status },
  })
}

/** PUT /contacts/:id/assign */
export function assignContactRequest(id, assignedTo) {
  return request(`/contacts/${id}/assign`, {
    method: 'PATCH',
    body: { assignedTo },
  })
}
