import React from "react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Carregando...</p>
      </div>
    </div>
  )
}
