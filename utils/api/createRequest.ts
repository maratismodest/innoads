import axios from 'axios'

export const beRoutes = {
  telegrams: '/telegrams',
  ads: '/ads',
  uploads: '/uploads',
  users: '/users'
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authorization': typeof window !== 'undefined' && `Bearer ${localStorage.getItem('token')}`,
  },
})

export default client
