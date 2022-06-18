import useEffectOnce from "hooks/useEffectOnce";
import jwt from 'jsonwebtoken'
import {createContext, ReactNode, useContext, useState} from "react";

export interface UserProps {
    id: number,
    username: string
    auth_date?: string,
    first_name?: string,
    hash?: string,
    last_name?: string,
    photo_url?: string,
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
};
const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({children}: Props) {
    const [user, setUser] = useState<UserProps | undefined>(undefined);
    const [token, setToken] = useState('');

    const checkToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
            if (decoded) {
                setUser(decoded as UserProps)
                setToken(token)
            }
        }
    }
    useEffectOnce(() => {
        checkToken()
        return () => checkToken()
    });

    const login = (user: UserProps) => {
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token')
        setUser(undefined);
    };

    const value = {
        user,
        token,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
