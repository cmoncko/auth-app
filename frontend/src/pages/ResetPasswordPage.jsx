import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { AuthCard } from '../components/AuthCard'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { Spinner } from '../components/Spinner'
import { authAPI } from '../api/axiosConfig'
import { getPasswordError } from '../utils/validators'
import { useToast } from '../hooks/useToast'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { showToast } = useToast()
  
  const email = searchParams.get('email')
  
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    confirmPassword: '',
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      showToast('Email is required. Please start from forgot password.', 'error')
      navigate('/forgot-password')
    }
  }, [email, navigate, showToast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (formData.otp.trim().length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
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
      const response = await authAPI.reset({
        email,
        otp: formData.otp,
        password: formData.password,
      })
      
      showToast(response.data.message, 'success')
      setTimeout(() => navigate('/login'), 500)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Password reset failed'
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <AuthCard 
        title="Reset Password"
        subtitle={`Reset password for ${email}`}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="OTP"
            placeholder="Enter 6-digit OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            error={errors.otp}
            disabled={loading}
          />

          <InputField
            label="New Password"
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
            placeholder="Confirm your new password"
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
                <Spinner /> Resetting...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            <Link
              to="/login"
              className="text-gray-900 font-semibold hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  )
}
