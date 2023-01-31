import axios from 'axios'

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Secret': process.env.NEXT_PUBLIC_SECRET,
        'Authorization': typeof window !== 'undefined' && `Bearer ${localStorage.getItem('token')}`,
    },
})

export default client
