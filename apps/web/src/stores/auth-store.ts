import { JwtPayload } from '@/types/jwt';
import { decode } from 'jsonwebtoken';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    isLoggedIn: boolean;
    typeUser: "USER" | "ADMIN" | null
    login: () => void;
    logout: () => void;
    getToken: () => string | null;
}
const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            typeUser: null,
            getToken: () => {
                const userLocalStorage = localStorage.getItem('accessToken');
                if (userLocalStorage) {
                    return userLocalStorage
                }
                return null
            },
            login: () => {
                const userLocalStorage = localStorage.getItem('accessToken');
                if (userLocalStorage) {
                    const jwtDecoded = decode(userLocalStorage) as JwtPayload | null;

                    set({ isLoggedIn: true, typeUser: jwtDecoded!.role });
                }
            },
            logout: () => {
                set({ isLoggedIn: false });
                localStorage.clear();
            },
        }),
        {
            name: 'userLoginStatus',
        }
    )
);


export default useAuthStore;