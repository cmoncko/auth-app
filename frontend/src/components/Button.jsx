import React from 'react'

export const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none'
  const widthClass = fullWidth ? 'w-full' : ''
  
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  )
}
