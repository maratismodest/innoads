import {UserDTO} from '@/types/UserDTO'
import fetchUser from '@/utils/api/fetchUser'
import * as jose from 'jose'
import {createContext, ReactNode, useEffect, useState} from 'react'

type authContextType = {
  user: UserDTO | undefined;
  login: (user: UserDTO, token: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: undefined,
  login: () => {
  },
  logout: () => {
  },
}
export const AuthContext = createContext<authContextType>(authContextDefaultValues)

type Props = {
  children: ReactNode;
};

export function AuthProvider({children}: Props) {
  const [user, setUser] = useState<UserDTO | undefined>(undefined)

  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded: jose.JWTPayload = await jose.decodeJwt(token)
        const fetchedUser = await fetchUser(decoded.id as number)
        if (fetchedUser) {
          login(fetchedUser, token)
        } else {
          logout()
          alert('Вы слишком давно авторизовывались: попробуйте перезапустить страницу и авторизоваться заново')
        }
      }
      return

    } catch
      (e) {
      console.log('e', e)
    }
  }

// @ts-ignore
  useEffect(() => {
    checkToken()
    return () => checkToken()
  }, [])

  const login = (user: UserDTO, token: string) => {
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  const value = {
    user,
    login,
    logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
