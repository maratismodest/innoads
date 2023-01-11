import { createContext, ReactNode, useState } from 'react'
import useEffectOnce from 'hooks/useEffectOnce'
import * as jose from 'jose'
import fetchUser from 'utils/api/fetchUser'

export interface UserProps {
    id: number,
    username: string
    first_name?: string | null,
    last_name?: string | null,
    photo_url?: string | null,
}

type authContextType = {
    user: UserProps | undefined;
    login: (a: UserProps) => void;
    logout: () => void;
    token: string
};

const authContextDefaultValues: authContextType = {
    user: undefined,
    token: '',
    login: () => {
    },
    logout: () => {
    },
}
export const AuthContext = createContext<authContextType>(authContextDefaultValues)


type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<UserProps | undefined>(undefined)
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
    useEffectOnce(() => {
        checkToken()
        return () => checkToken()
    })

    const login = (user: UserProps) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(undefined)
    }

    const value = {
        user,
        token,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
