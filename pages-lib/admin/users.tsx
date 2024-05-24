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
              <span>поменять?</span>
              <button className={clsx(buttonStyles({ size: 'small' }))} onClick={handleClick}>
                Да
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminUsers;
