import React from 'react'

export const InputField = ({ label, name, type = 'text', placeholder, value, onChange, error, disabled = false }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-500'
            : 'border-gray-200 bg-white focus:border-gray-900'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1.5 font-medium">{error}</p>
      )}
    </div>
  )
}
