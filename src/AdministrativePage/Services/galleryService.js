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

export function getGalleryItemsRequest() {
  return request("/gallery")
}

export function getGalleryItemsByCategoryRequest(catId) {
  return request(`/gallery/category/${catId}`)
}

export function createGalleryItemRequest(formData) {
  // debe ir FormData con campo "media"
  return request("/gallery", {
    method: "POST",
    body: formData,
  })
}

export function deleteGalleryItemRequest(id) {
  return request(`/gallery/${id}`, { method: "DELETE" })
}
