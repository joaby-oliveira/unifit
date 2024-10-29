import { UserInterface } from '@/types/user';
import { create } from 'zustand';

type UserStore = {
    user: UserInterface | null
    setUser: (user: UserInterface) => void
}

const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (user: UserInterface) => set((state) => ({ user })),
}))

export default useUserStore;