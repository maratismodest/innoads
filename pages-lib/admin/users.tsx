'use client';
import Button from '@/components/ui/Button';
import createBanPrisma from '@/utils/api/prisma/createBanPrisma';
import deleteBanPrisma from '@/utils/api/prisma/deleteBanPrisma';
import { Ban, User } from '@prisma/client';
import { clsx } from 'clsx';
import React from 'react';

const Users = ({ users, bans }: { users: User[]; bans: Ban[] }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul className="grid grid-cols-2 gap-2">
        {users.map(user => {
          const isBanned = bans.find(ban => ban.userId == user.id);
          return (
            <li key={user.id} className="relative">
              <span>{user.username}</span>
              <p>
                Banned: <span>{isBanned ? 'true' : 'false'}</span>
              </p>

              <Button
                className={clsx('absolute z-10', 'right-0 top-0')}
                onClick={event => {
                  event.preventDefault();
                  if (isBanned) {
                    deleteBanPrisma(user.id);
                  } else {
                    createBanPrisma(user.id);
                  }
                }}
              >
                {isBanned ? 'false' : 'true'}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
