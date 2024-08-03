import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import type { Post } from '@prisma/client';
import { clsx } from 'clsx';
import React from 'react';

import Posts from '@/components/Posts';
import buttonStyles from '@/styles/buttonStyles';

interface ArchivedProps {
  posts: Post[];
}

const Archived = ({ posts }: ArchivedProps) => {
  return (
    <div className="w-full">
      <div className="text-center">
        <h2>Архивные</h2>
        <p>Вы отметили их как не актуальные: для пользовтелей сайта они не отображаются.</p>
      </div>
      <Disclosure>
        <DisclosureButton className="w-full py-2">
          <p className={clsx(buttonStyles({ size: 'small' }), '!mx-auto')}>показать/скрыть</p>
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500">
          <Posts posts={posts} edit={false} className="pointer-events-none bg-gray" />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default Archived;
