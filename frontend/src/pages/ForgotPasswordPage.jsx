import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthCard } from '../components/AuthCard'
import { InputField } from '../components/InputField'
import { Button } from '../components/Button'
import { Spinner } from '../components/Spinner'
import { authAPI } from '../api/axiosConfig'
import { validateEmail } from '../utils/validators'
import { useToast } from '../hooks/useToast'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    
    try {
      const response = await authAPI.forgot({ email })
      
      showToast(response.data.message, 'success')
      setSubmitted(true)
      
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`)
      }, 500)
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send OTP'
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <AuthCard 
        title="Forgot Password?"
        subtitle={submitted ? "Check your email for the OTP" : "Enter your email to reset your password"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleChange}
            error={error}
            disabled={loading || submitted}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading || submitted}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Sending OTP...
              </span>
            ) : submitted ? (
              'OTP Sent'
            ) : (
              'Send OTP'
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
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
