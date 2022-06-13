import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import jwt from 'jsonwebtoken'
import {useEffectOnce} from "hooks/useEffectOnce";

interface UserProps {
    id: number,
    auth_date: string,
    first_name: string,
    hash: string,
    last_name: string,
    photo_url: string,
    username: string
}

type authContextType = {
    user: any;
    login: any;
    logout: any;
};

const authContextDefaultValues: authContextType = {
    user: undefined,
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
    const [user, setUser] = useState<any>(undefined);

    const checkToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            console.log('token', token)
            const decoded = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_SECRET}`);
            setUser(decoded)
        }
    }
    useEffectOnce(() => {
        checkToken()
        return () => checkToken()
    });

    const login = (a: any) => {
        setUser(a);
    };

    const logout = () => {
        setUser(undefined);
    };

    const value = {
        user,
        login,
        logout,
    };
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
