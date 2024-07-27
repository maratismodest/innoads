import { User } from '@prisma/client';
import React from 'react';

import Spinner from '@/components/ui/Spinner';
import useUsersQuery from '@/hooks/query/useUsersQuery';

import ItemRenderer from './ItemRenderer';
import VirtualList from './VirtualList';

export interface VirtualListItem {
  id: number;
  content: User;
}

const App: React.FC = () => {
  const { users = [] } = useUsersQuery({});
  if (!users.length) {
    return <Spinner />;
  }
  const items: VirtualListItem[] = users.map((user, i) => ({
    id: i,
    content: user,
  }));

  // const { id, bans } = user as UserWithBans;
  // const isBanned = Boolean(bans.find(ban => ban.userId == user.id));


  return (
    <VirtualList
      items={items}
      itemHeight={38}
      windowHeight={800}
      gapSize={4}
      renderItem={(item) => <ItemRenderer content={item.content} />}
    />
  );
};

export default App;