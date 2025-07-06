"use client"

import { useState } from "react"

const transformations = {
  hero: "w_1200,h_600,c_fill,q_auto,f_auto",
  card: "w_400,h_300,c_fill,q_auto,f_auto",
  pastor: "w_500,h_600,c_fill,q_auto,f_auto",
}

export default function CloudinaryImage({ publicId, alt, transformation = "card", className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const transformString = transformations[transformation] || transformations.card

  const imageUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`
    : "/placeholder.svg?height=400&width=400"

  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm">Imagen no disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-sapphire-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        {...props}
      />
    </div>
  )
}
