import React, { useState } from 'react';

import Spinner from '@/components/ui/Spinner';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';

// import { User } from '@prisma/client';
import Users from './users';

type Props = {
  // users: User[];
};
const UserSearch = ({}: Props) => {
  const { users = [], usersLoading, usersRefetch, usersError } = useUsersQuery();
  const [username, setUsername] = useState('');
  const debounced = useDebounce(username);

  if (usersLoading) {
    return (<Spinner />);
  }

  if (usersError) {
    return <h1>Ошибка при получении данных о пользователях</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      <input
        className={inputStyles()}
        placeholder="@username"
        onChange={event => setUsername(event.target.value)}
      />
      <Users users={debounced ? users.filter(x => x.username.includes(debounced)) : users} />
    </div>
  );
};

export default UserSearch;
