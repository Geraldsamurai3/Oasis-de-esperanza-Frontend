// src/services/categoryService.js
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

export function getCategoriesRequest() {
  return request("/categories", { method: "GET" })
}

export function createCategoryRequest(data) {
  // data: { name, description }
  return request("/categories", { method: "POST", body: data })
}

export function updateCategoryRequest(id, data) {
  // data: { name?, description?, status? }
  return request(`/categories/${id}`, { method: "PUT", body: data })
}

export function deleteCategoryRequest(id) {
  return request(`/categories/${id}`, { method: "DELETE" })
}
