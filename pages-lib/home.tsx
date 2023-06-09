import Categories from "@/components/Categories";
import InfinitePosts from "@/modules/InfinitePosts";
import {PostDTO} from "@/types";
import React, {useMemo} from 'react';

type Props = {
  posts: PostDTO[],
  totalPages: number,
}

const Home = ({totalPages, posts}: Props) => {
  const count = useMemo(() => totalPages * 20, [totalPages])
  return (
    <>
      <Categories/>
      <div className='flex justify-between align-baseline'>
        <h1>Последние</h1>
        <span>{count} объявлений</span>
      </div>
      <InfinitePosts initPosts={posts} initPage={1} options={{}}/>
    </>
  );
};

export default Home;
