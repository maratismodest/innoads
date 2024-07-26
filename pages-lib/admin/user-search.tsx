import React, { useState } from 'react';

import Spinner from '@/components/ui/Spinner';
import ItemRenderer from '@/components/VirtualList/ItemRenderer';
// import { User } from '@prisma/client';
import VirtualList from '@/components/VirtualList/VirtualList';
import { VirtualListItem } from '@/components/VirtualList/VirtualListPage';
import useUsersQuery from '@/hooks/query/useUsersQuery';
import useDebounce from '@/hooks/useDebounce';
import inputStyles from '@/styles/inputStyles';

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

  const items: VirtualListItem[] = users.map((user, i) => ({
    id: i,
    content: user,
  }));


  return (
    <div className="grid grid-cols-1 gap-2">
      <input
        className={inputStyles()}
        placeholder="@username"
        onChange={event => setUsername(event.target.value)}
      />
      <VirtualList
        items={items.filter(({content}) => content.username.toLowerCase().includes(debounced.toLowerCase()))}
        itemHeight={38}
        windowHeight={800}
        gapSize={4}
        renderItem={(item) => <ItemRenderer content={item.content} />}
      />
    </div>
  );
};

export default UserSearch;
