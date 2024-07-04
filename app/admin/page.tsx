'use client';

import Spinner from '@/components/ui/Spinner';
import withAuth from '@/hoc/withAuth';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import useAuth from '@/hooks/useAuth';
import AdminPosts from '@/pages-lib/admin/admin-posts';
import UserSearch from '@/pages-lib/admin/user-search';
import { handleDeleteAllArchived } from '@/pages-lib/admin/utils';
import buttonStyles from '@/styles/buttonStyles';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Role } from '@prisma/client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';

async function AdminPage() {
  const t = useTranslations();

  const { user } = useAuth();
  const { users, usersLoading, usersError, usersRefetch } = useUsersQuery();
  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery({
    size: 1000,
  });

  const onClick = async () => {
    await usersRefetch();
    await postsRefetch();
  };

  if (user!.role !== Role.ADMIN) {
    return (
      <div>
        <h1>У вас нет доступа к этой странице!</h1>
      </div>
    );
  }

  if (usersLoading || postsLoading) {
    return <Spinner />;
  }

  if (!users || usersError || !posts || postsError) {
    return (
      <>
        <h1>Что пошло не так при получении пользователей</h1>
      </>
    );
  }

  return (
    <>
      <div className="mb-2 flex justify-between">
        <h1>{t('Панель администрирования')}</h1>
        <button className={buttonStyles()} onClick={onClick} id="refetch">
          {t('Обновить данные')}
        </button>
        <button className={buttonStyles()} onClick={() => handleDeleteAllArchived(posts)}>
          {t('Удалить все архивные посты')}
        </button>
      </div>
      <TabGroup>
        <TabList className="flex gap-2">
          <Tab
            className={clsx(
              buttonStyles({ size: 'small' }),
              '!rounded-full data-[selected]:underline'
            )}
          >
            {t('Пользователи')}
          </Tab>
          <Tab
            className={clsx(
              buttonStyles({ size: 'small' }),
              '!rounded-full data-[selected]:underline'
            )}
          >
            {t('Объявления')}
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <UserSearch users={users} />
          </TabPanel>
          <TabPanel>
            <AdminPosts posts={posts} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default withAuth(AdminPage);
