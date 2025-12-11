import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-gray-500 text-lg mt-2">Page not found</p>
        </div>
        <p className="text-gray-600 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </div>
    </div>
  )
}
