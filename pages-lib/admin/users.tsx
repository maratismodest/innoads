'use client';
import Button from '@/components/ui/Button';
import buttonStyles from '@/styles/buttonStyles';
import createBanPrisma from '@/utils/api/prisma/createBanPrisma';
import deleteBanPrisma from '@/utils/api/prisma/deleteBanPrisma';
import { Ban, User } from '@prisma/client';
import { clsx } from 'clsx';
import React from 'react';

const AdminUsers = ({ users, bans }: { users: User[]; bans: Ban[] }) => {
  return (
    <div>
      <h2>Пользователи</h2>
      <ul className="grid grid-cols-1 gap-1">
        {users.map(user => {
          const isBanned = Boolean(bans.find(ban => ban.userId == user.id));
          // console.log('isBanned', isBanned);
          return (
            <li key={user.id} className="relative grid grid-cols-3 rounded border border-blue p-1">
              <span>{user.username}</span>
              <p>
                Banned: <span>{isBanned ? 'true' : 'false'}</span>
              </p>
              <div className="ml-auto flex items-center gap-1">
                <span>Поменять статус?</span>
                <button
                  className={clsx(buttonStyles({ size: 'small' }))}
                  onClick={event => {
                    event.preventDefault();
                    // console.log('user.id', user.id);
                    if (isBanned) {
                      deleteBanPrisma(user.id);
                    } else {
                      createBanPrisma(user.id);
                    }
                  }}
                >
                  Click
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminUsers;
