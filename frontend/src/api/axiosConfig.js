import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data) => api.post('/signup', data),
  login: (data) => api.post('/login', data),
  forgot: (data) => api.post('/forgot', data),
  reset: (data) => api.post('/reset', data),
}

export default api
