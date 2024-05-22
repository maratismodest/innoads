'use client';
import Posts from '@/components/Posts';
import useAuth from '@/hooks/useAuth';
import Users from '@/pages-lib/admin/users';
import buttonStyles from '@/styles/buttonStyles';
import fetchBansApi from '@/utils/api/fetchBansApi';
import fetchUsersApi from '@/utils/api/fetchUsersApi';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import { Ban, Post, User, Role } from '@prisma/client';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { user } = useAuth();
  console.log('user', user);
  const [users, setUsers] = useState<User[]>([]);
  const [bans, setBans] = useState<Ban[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const onClick = () => {
    fetchUsersApi().then(res => setUsers(res));
    fetchBansApi().then(res => setBans(res));
    fetchPosts({ size: 500 }).then(res => setPosts(res));
  };
  useEffect(() => {
    if (user && user.role === Role.ADMIN) {
      onClick();
    }
  }, [user]);

  if (!user || user.role !== Role.ADMIN) {
    return (
      <div>
        <h1>У вас нет доступа к этой странице!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 flex justify-between">
        <h1>Панель администрирования</h1>
        <button className={buttonStyles()} onClick={onClick}>
          Обновить данные
        </button>
      </div>
      <Users users={users} bans={bans} />
      <hr />
      <h2>Посты</h2>
      <p>Можно с помощью крестика снять объявление из публикации</p>
      <Posts posts={posts.filter(x => x.published === true)} edit={true} />
      <hr />
      <h2>Архивные</h2>
      <Posts posts={posts.filter(x => x.published === false)} edit={true} />
    </>
  );
}
