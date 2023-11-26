import { ACCESS_TOKEN, UserRole } from 'const';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContextProps } from './types';
import { getUser } from 'api';

const AuthContext = createContext<AuthContextProps | Record<string, unknown>>({});

export interface UserDetails {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    isAdmin: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [userRole, setUserRole] = useState<UserRole>();
    const [pageChange, setPageChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = process.browser ? localStorage.getItem('token') : null;
    const router = useRouter();

    const handleRouteChange = (url: string): void => {
        console.log(url);
        /**
         * Trigger function for route change
         * Block user if he/she don't have access to this route
         */
    };

    useEffect(() => {
        const checkUserSession = async (): Promise<void> => {
            try {
                if (token) {
                    const { data, error } = await getUser();
                    setUser({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        accessToken: data.accessToken,
                        isAdmin: data.isAdmin,
                    });
                    if (data.isAdmin) {
                        setUserRole(UserRole.ADMIN);
                    } else {
                        setUserRole(UserRole.USER);
                    }
                    handleRouteChange(window.location.pathname);
                } else {
                    handleRouteChange(window.location.pathname);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                localStorage.removeItem(ACCESS_TOKEN);
                router.replace('/');
            }
        };
        checkUserSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChangeStart = (): void => {
        setPageChange(true);
    };

    const handlePageChangeEnd = (): void => {
        setPageChange(false);
    };

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeStart', handlePageChangeStart);
        router.events.on('routeChangeComplete', handlePageChangeEnd);
        router.events.on('routeChangeError', handlePageChangeEnd);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeStart', handlePageChangeStart);
            router.events.off('routeChangeComplete', handlePageChangeEnd);
            router.events.off('routeChangeError', handlePageChangeEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const setSessionData = (sessionDetails: UserDetails): void => {
        if (sessionDetails.accessToken) {
            localStorage.setItem('token', sessionDetails.accessToken);
        }
        setUser(sessionDetails);
        if (sessionDetails.isAdmin) {
            setUserRole(UserRole.ADMIN);
        } else {
            setUserRole(UserRole.USER);
        }
        console.log(userRole);
    };

    const removeSessionData = (): void => {
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/');
    };

    /**
     * Context value to access glabally from anywhere
     * Memo to optimize at best
     */
    const value = useMemo(
        () => ({
            user,
            userRole,
            setSessionData,
            removeSessionData,
            loading: loading || pageChange,
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, loading, pageChange]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => useContext(AuthContext) as AuthContextProps;
