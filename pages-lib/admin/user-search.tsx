import useDebounce from '@/hooks/useDebounce';
import { User } from '@prisma/client';
import Users from './users';
import inputStyles from '@/styles/inputStyles';
import React, { useState } from 'react';

type Props = {
  users: User[];
};
const UserSearch = ({ users }: Props) => {
  const [username, setUsername] = useState('');
  const debounced = useDebounce(username);

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
