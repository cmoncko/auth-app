import React from 'react'

export default {
  InputField: () => import('./InputField.jsx').then(m => m.InputField),
  Button: () => import('./Button.jsx').then(m => m.Button),
  AuthCard: () => import('./AuthCard.jsx').then(m => m.AuthCard),
  ToastContainer: () => import('./ToastContainer.jsx').then(m => m.ToastContainer),
  Spinner: () => import('./Spinner.jsx').then(m => m.Spinner),
}
