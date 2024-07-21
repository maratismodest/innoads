'use client';
import { UserWithBans } from '@/types';
import createBanPrisma from '@/utils/api/prisma/createBanPrisma';
import deleteBanPrisma from '@/utils/api/prisma/deleteBanPrisma';
import { Switch } from '@headlessui/react';
import { User } from '@prisma/client';
import React from 'react';

interface AdminUsersProps {
  users: User[] | UserWithBans[];
}

const AdminUsers = ({ users }: AdminUsersProps) => {
  return (
    <ul className="grid grid-cols-1 gap-1">
      {users.map(user => {
        const { id, bans } = user as UserWithBans;
        // const isBanned = Boolean(bans.find(ban => ban.userId == user.id));
        const handleClick = async (checked: boolean) => {
          if (bans.length) {
            await deleteBanPrisma(user.id);
          } else {
            await createBanPrisma(user.id);
          }
          const refetchButton = document.getElementById('refetch');
          if (refetchButton) {
            console.log('refetchButton', refetchButton);
            refetchButton.click();
          }
        };
        return (
          <li
            key={user.id}
            className="relative grid grid-cols-2 items-center rounded-2xl border border-blue px-4 py-1"
          >
            <span className="truncate">{user.username}</span>
            <div className="ml-auto flex items-center gap-1">
              <span>бан</span>
              <Switch
                checked={bans.length > 0}
                onChange={handleClick}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-blue data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
              </Switch>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminUsers;
