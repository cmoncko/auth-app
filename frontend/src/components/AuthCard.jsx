import React from 'react'

export const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {title && (
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-500 text-sm">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
