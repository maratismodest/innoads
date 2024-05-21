'use client';
import Users from '@/pages-lib/admin/users';
import fetchBansApi from '@/api/fetchBansApi';
import fetchUsersApi from '@/api/fetchUsersApi';
// import fetchBans from '@/utils/api/prisma/fetchBans';
// import fetchUsers from '@/utils/api/prisma/fetchUsers';
import { Ban, User } from '@prisma/client';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [bans, setBans] = useState<Ban[]>([]);

  // console.log('users', users);
  // console.log('bans', bans);

  useEffect(() => {
    fetchUsersApi().then(res => setUsers(res));
    fetchBansApi().then(res => setBans(res));
  }, []);

  return (
    <div>
      <Users users={users} bans={bans} />
      <hr />
    </div>
  );
}
