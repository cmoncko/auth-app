import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthCard } from '../components/AuthCard'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { Spinner } from '../components/Spinner'
import { authAPI } from '../api/axiosConfig'
import { validateEmail, validatePassword } from '../utils/validators'
import { useToast } from '../hooks/useToast'

export default function LoginPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
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

    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    
    try {
      const loginData = {}
      
      loginData.email = formData.emailOrUsername
      
      
      loginData.password = formData.password

      const response = await authAPI.login(loginData)
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      showToast(response.data.message, 'success')
      setTimeout(() => navigate('/dashboard'), 500)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed'
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <AuthCard 
        title="Sign In"
        subtitle="Welcome back to your account"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email or Username"
            placeholder="your@email.com or username"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            error={errors.emailOrUsername}
            disabled={loading}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
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
                <Spinner /> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <Link
            to="/forgot-password"
            className="block text-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Forgot your password?
          </Link>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  )
}
