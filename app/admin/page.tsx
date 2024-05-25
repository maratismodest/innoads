'use client';

import Posts from '@/components/Posts';
import Spinner from '@/components/ui/Spinner';
import useAuth from '@/hooks/useAuth';
import useBansQuery from '@/hooks/query/useBansQuery';
import usePostsQuery from '@/hooks/query/usePostsQuery';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import Users from '@/pages-lib/admin/users';
import buttonStyles from '@/styles/buttonStyles';
import { Role } from '@prisma/client';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Field,
  Label,
  Switch,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';

export default function AdminPage() {
  const [enabled, setEnabled] = useState(false);

  const { user, loading } = useAuth();
  const { users, usersLoading, usersError, usersRefetch } = useUsersQuery();
  const { posts, postsLoading, postsError, postsRefetch } = usePostsQuery({
    size: 500,
  });

  const onClick = async () => {
    usersRefetch();
    postsRefetch();
  };

  useEffect(() => {
    if (user && user.role === Role.ADMIN) {
      onClick();
    }
  }, [user]);

  if (loading || usersLoading || postsLoading) {
    return <Spinner />;
  }

  if (!users || usersError || !posts || postsError) {
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
        <button className={buttonStyles()} onClick={onClick} id="refetch">
          Обновить данные
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
            Пользователи
          </Tab>
          <Tab
            className={clsx(
              buttonStyles({ size: 'small' }),
              '!rounded-full data-[selected]:underline'
            )}
          >
            Объявления
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
              <Label>показать только активные</Label>
            </Field>
            <Posts posts={enabled ? posts.filter(x => x.published === true) : posts} edit={true} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
