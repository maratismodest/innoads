'use client';
import buttonStyles from '@/styles/buttonStyles';
import createBanPrisma from '@/utils/api/prisma/createBanPrisma';
import deleteBanPrisma from '@/utils/api/prisma/deleteBanPrisma';
import { Ban, User } from '@prisma/client';
import { clsx } from 'clsx';
import React from 'react';

interface AdminUsersProps {
  users: User[];
  bans: Ban[];
}

const AdminUsers = ({ users, bans }: AdminUsersProps) => {
  return (
    <ul className="grid grid-cols-1 gap-1">
      {users.map(user => {
        const isBanned = Boolean(bans.find(ban => ban.userId == user.id));
        const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (isBanned) {
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
            className="relative grid grid-cols-3 items-center rounded-2xl border border-blue px-4 py-1"
          >
            <span className="truncate">{user.username}</span>
            <p>
              бан: <span>{isBanned ? 'да' : 'нет'}</span>
            </p>
            <div className="ml-auto flex items-center gap-1">
              <button className={clsx(buttonStyles({ size: 'small' }))} onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminUsers;
