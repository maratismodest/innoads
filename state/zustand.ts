import fetchBans from '@/utils/api/prisma/fetchBans';
import fetchUsers from '@/utils/api/prisma/fetchUsers';
import { Ban, User } from '@prisma/client';
import { create } from 'zustand';

interface Props {
  users: User[];
  loadingUsers: boolean;
  getUsers: () => void;
}

const useUsersStore = create<Props>(set => ({
  users: [],
  loadingUsers: false,
  getUsers: async () => {
    set(() => ({ loadingUsers: true }));
    const _users = await fetchUsers();
    set(() => ({ users: _users, loadingUsers: false }));
  },
}));

interface UseBansProps {
  bans: Ban[];
  loadingBans: boolean;
  getBans: () => void;
}

const useBansStore = create<UseBansProps>(set => ({
  bans: [],
  loadingBans: false,
  getBans: async () => {
    set(() => ({ loadingBans: true }));
    const _bans = await fetchBans();
    set(() => ({ bans: _bans, loadingUsers: false }));
  },
}));

export { useUsersStore, useBansStore };
