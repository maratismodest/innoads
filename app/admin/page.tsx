'use client';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import withAuth from '@/hoc/withAuth';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import useAuth from '@/hooks/useAuth';
import Users from '@/pages-lib/admin/users';
import { handleDeleteAllArchived } from '@/pages-lib/admin/utils';
import buttonStyles from '@/styles/buttonStyles';
import {
  Checkbox,
  Field,
  Label,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { Role } from '@prisma/client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

async function AdminPage() {
  const t = useTranslations();
  const [enabled, setEnabled] = useState(false);

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
            <Users users={users} />
          </TabPanel>
          <TabPanel>
            <Field className="mb-2 flex items-center gap-1 hover:cursor-pointer">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-gray data-[checked]:bg-white"
              >
                {/* Checkmark icon */}
                <svg
                  className="stroke-black opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label>{t('показать только активные')}</Label>
            </Field>
            <Posts posts={enabled ? posts.filter(x => x.published === true) : posts} edit={true} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default withAuth(AdminPage);
