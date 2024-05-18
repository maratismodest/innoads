import Users from '@/pages-lib/admin/users';
import { getAllBans } from '@/prisma/services/bans';
import fetchUsers from '@/utils/api/prisma/fetchUsers';
// import { getAllPosts } from '@/prisma/services/posts';
import { getAllUsers } from '@/prisma/services/users';
import Image from 'next/image';
import React from 'react';

const Page = async () => {
  // const posts = await getAllPosts();
  const users = await fetchUsers();
  const bans = await getAllBans();
  return (
    <div>
      <Users users={users} bans={bans} />
      <hr />
    </div>
  );
};

export default Page;
