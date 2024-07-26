import { Switch } from '@headlessui/react';
import { User } from '@prisma/client';
import React, { useState } from 'react';

import { UserWithBans } from '@/types';
import createBanPrisma from '@/utils/api/prisma/createBanPrisma';
import deleteBanPrisma from '@/utils/api/prisma/deleteBanPrisma';

interface ItemProps {
  content: User;
}

const ItemRenderer: React.FC<ItemProps> = ({ content: user }) => {
  const { bans, username, id } = user as UserWithBans;
  const [isBanned, setIsBanned] = useState(bans.length > 0);

  const handleClick = async (checked: boolean) => {
    if (isBanned) {
      await deleteBanPrisma(id);
    } else {
      await createBanPrisma(id);
    }
    setIsBanned(checked);
  };

  return (
    <div className="grid grid-cols-2 items-center rounded-2xl border border-blue px-4 py-1">
      <span className="truncate">{username}</span>
      <div className="ml-auto flex items-center gap-1">
        <span>бан</span>
        <Switch
          checked={isBanned}
          onChange={handleClick}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-blue/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-blue data-[focus]:outline-1 data-[focus]:outline-white"
        >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
        </Switch>
      </div>
    </div>
  );
};


export default ItemRenderer;