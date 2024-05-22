'use client';
import Accordion from '@/components/Accordion';
import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import Users from '@/pages-lib/admin/users';
import buttonStyles from '@/styles/buttonStyles';
import fetchBansApi from '@/utils/api/fetchBansApi';
import fetchPosts from '@/utils/api/prisma/fetchAds';
import fetchUsers from '@/utils/api/backend/fetchUsers';
import { Ban, Post, Role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function AdminPage() {
  const { data: users, isLoading, error } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const { user, loading } = useAuth();
  // const { users, getUsers, loadingUsers } = useUsersStore();
  const [bans, setBans] = useState<Ban[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const onClick = () => {
    fetchBansApi().then(res => setBans(res));
    fetchPosts({ size: 500 }).then(res => setPosts(res));
  };
  useEffect(() => {
    if (user && user.role === Role.ADMIN) {
      onClick();
    }
  }, [user]);

  if (loading || isLoading) {
    return <Spinner />;
  }

  if (error || !users) {
    return <h1>Что пошло не так при получении пользователей</h1>;
  }

  if (!user || user.role !== Role.ADMIN) {
    return (
      <div>
        <h1>У вас нет доступа к этой странице!</h1>
      </div>
    );
  }

  console.log('users', users);

  return (
    <>
      <div className="mb-2 flex justify-between">
        {/*{bears}*/}
        {/*<button onClick={increasePopulation}>one up</button>*/}
        <h1>Панель администрирования</h1>
        <button className={buttonStyles()} onClick={onClick}>
          Обновить данные
        </button>
      </div>
      <Accordion title="Пользователи">
        <Users users={users} bans={bans} />
      </Accordion>

      <hr />
      <Accordion title="Активные объявления">
        <Posts posts={posts.filter(x => x.published === true)} edit={true} />
      </Accordion>

      <hr />
      <Accordion title="Архивные объявления">
        <Posts posts={posts.filter(x => x.published === false)} edit={true} />
      </Accordion>
    </>
  );
}
