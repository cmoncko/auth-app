import React from 'react'
import Router from './routes/Router'
import { ToastContainer } from './components/ToastContainer'
import { ToastProvider, useToast } from './hooks/useToast.jsx'
import './index.css'

function AppContent() {
  const { toasts } = useToast()

  return (
    <>
      <Router />
      <ToastContainer toasts={toasts} />
    </>
  )
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App
