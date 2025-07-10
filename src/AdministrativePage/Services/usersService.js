const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("token")
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}
  const isForm = body instanceof FormData

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      ...(!isForm && { "Content-Type": "application/json" }),
      ...authHeader,
      ...headers,
    },
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Error ${res.status}`)
  }
  return res.json()
}

export function getUsersRequest() {
  return request("/users", { method: "GET" })
}

export function createUserRequest(data) {
  return request("/users", { method: "POST", body: data })
}

export function updateUserRequest(id, data) {
  return request(`/users/${id}`, { method: "PUT", body: data })
}

export function deleteUserRequest(id) {
  return request(`/users/${id}`, { method: "DELETE" })
}

// Invoca PUT /users/:id/block que alterna el isBlocked
export function toggleBlockUserRequest(id) {
  return request(`/users/${id}/block`, { method: "PUT" })
}
