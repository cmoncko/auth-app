import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthCard } from '../components/AuthCard'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { Spinner } from '../components/Spinner'
import { authAPI } from '../api/axiosConfig'
import { validateEmail, validatePassword, getPasswordError } from '../utils/validators'
import { useToast } from '../hooks/useToast'

export default function SignupPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    const passwordError = getPasswordError(formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    
    try {
      const response = await authAPI.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      
      showToast(response.data.message, 'success')
      setTimeout(() => navigate('/login'), 500)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Signup failed'
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <AuthCard 
        title="Create Account"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Username"
            placeholder="Choose a unique username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            disabled={loading}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="your@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={loading}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Min 6+ chars, 1 number & special char"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={loading}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  )
}
