import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Spinner from '@/components/ui/Spinner';
import ItemRenderer from '@/components/VirtualList/ItemRenderer';
import VirtualList from '@/components/VirtualList/VirtualList';
import { VirtualListItem } from '@/components/VirtualList/VirtualListPage';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import buttonStyles from '@/styles/buttonStyles';
import inputStyles from '@/styles/inputStyles';

import { defaultValues, IUserSearchForm, schema } from './yup';

type Props = {};

const AdminUsers: FC<Props> = ({}) => {
  const { handleSubmit, register, watch } = useForm<IUserSearchForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const username = watch('username');
  const { users = [], usersLoading, usersRefetch, usersError } = useUsersQuery({ search: username });

  const onSubmit = async () => {
    await usersRefetch();
  };

  const items: VirtualListItem[] = useMemo(() =>
    users.map((user, i) => ({
      id: i,
      content: user,
    })), [users]);


  return (
    <div className="grid grid-cols-1 gap-2">
      <form className="flex items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('username')}
          className={inputStyles()}
          placeholder="@username"
        />
        <button className={buttonStyles({ size: 'medium' })} type="submit">Поиск</button>
      </form>
      {usersLoading && <Spinner />}
      {usersError && <h1>Ошибка при получении данных о пользователях</h1>}
      {!usersLoading && !usersError && items.length > 0 && <VirtualList
        items={items}
        itemHeight={38}
        windowHeight={800}
        gapSize={4}
        renderItem={(item) => <ItemRenderer content={item.content} />}
      />}
    </div>
  );
};

export default AdminUsers;
