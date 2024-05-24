'use client';
import CreatePostModule from '@/modules/PostModule/CreatePostModule/CreatePostModule';
import { routes } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function AddPage<NextPage>() {
  const router = useRouter();
  const onSubmitOptional = useCallback(async () => router.push(routes.profile), []);
  return <div>test</div>;
  // return <CreatePostModule onSubmitOptional={onSubmitOptional} />;
}
