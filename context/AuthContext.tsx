import client from "@/utils/api/createRequest";
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react'
import * as jose from 'jose'
import {UserDTO} from '@/types/UserDTO'
import fetchUser from '@/utils/api/fetchUser'

type authContextType = {
  user: UserDTO | undefined;
  login: (a: UserDTO) => void;
  logout: () => void;
  token: string
  setToken: Dispatch<SetStateAction<string>>
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  token: '',
  login: () => {
  },
  logout: () => {
  },
  setToken: () => {
  },
}
export const AuthContext = createContext<authContextType>(authContextDefaultValues)


type Props = {
  children: ReactNode;
};

export function AuthProvider({children}: Props) {
  const [user, setUser] = useState<UserDTO | undefined>(undefined)
  const [token, setToken] = useState('')

  const checkToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = await jose.decodeJwt(token)
        const response = await fetchUser(decoded.id as number)
        if (response) {
          // @ts-ignore
          setUser(decoded)
          setToken(token)
          client.defaults.headers.common['Authorization'] = `Bearer ${token}`
          console.log('client',client.defaults.headers.common)
        } else {
          localStorage.removeItem('token')
          alert('Вы слишком давно авторизовывались: попробуйте перезапустить страницу и авторизоваться заново')
          return
        }

      } catch
        (e) {
        console.log('e', e)
      }
    }
  }

// @ts-ignore
  useEffect(() => {
    checkToken()
    return () => checkToken()
  }, [])

  const login = (user: UserDTO) => {
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  const value = {
    user,
    token,
    setToken,
    login,
    logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
