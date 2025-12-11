export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  const hasMinLength = password.length > 6

  return hasNumber && hasSpecialChar && hasMinLength
}

export const getPasswordError = (password) => {
  if (!password) return 'Password is required'
  if (password.length <= 6) return 'Password must be more than 6 characters'
  if (!/\d/.test(password)) return 'Password must contain at least one number'
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Password must contain at least one special character'
  }
  return ''
}
