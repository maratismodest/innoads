'use client';
import Accordion from '@/components/Accordion';
import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import useBansQuery from '@/hooks/query/useBansQuery';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import Users from '@/pages-lib/admin/users';
import buttonStyles from '@/styles/buttonStyles';
import { Role } from '@prisma/client';
import React, { useEffect } from 'react';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { users, usersLoading, usersError, usersRefetch } = useUsersQuery();
  const { bans, bansLoading, bansError, bansRefetch } = useBansQuery();
  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery({
    size: 500,
  });

  const onClick = async () => {
    usersRefetch();
    bansRefetch();
    postsRefetch();
  };

  useEffect(() => {
    if (user && user.role === Role.ADMIN) {
      onClick();
    }
  }, [user]);

  if (loading || usersLoading || bansLoading || postsLoading) {
    return <Spinner />;
  }

  if (!users || usersError || !bans || bansError || !posts || postsError) {
    return (
      <>
        <h1>Что пошло не так при получении пользователей</h1>
      </>
    );
  }

  if (!user || user.role !== Role.ADMIN) {
    return (
      <div>
        <h1>У вас нет доступа к этой странице!</h1>
        <button className={buttonStyles()} onClick={onClick}>
          Обновить данные
        </button>
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
