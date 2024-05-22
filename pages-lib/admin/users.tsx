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
  console.log('users users', users);
  return (
    <ul className="grid grid-cols-1 gap-1">
      {users.map(user => {
        console.log('user', user);
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
          <li key={user.id} className="relative grid grid-cols-3 rounded border border-blue p-1">
            <span>{user.username}</span>
            <p>
              Banned: <span>{isBanned ? 'true' : 'false'}</span>
            </p>
            <div className="ml-auto flex items-center gap-1">
              <span>Поменять статус?</span>
              <button className={clsx(buttonStyles({ size: 'small' }))} onClick={handleClick}>
                Click
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminUsers;
