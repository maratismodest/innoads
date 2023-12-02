'use client';
import Item from '@/components/Item';
import Button from '@/components/ui/Button';
import type { PostDTO } from '@/types';
import fetchAds from '@/utils/api/fetchAds';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      username === process.env.NEXT_PUBLIC_ADMIN &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      setIsLogged(true);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
  };

  useEffect(() => {
    const _username = localStorage.getItem('username');
    const _password = localStorage.getItem('password');
    if (
      _username === process.env.NEXT_PUBLIC_ADMIN &&
      _password === process.env.NEXT_PUBLIC_ADMIN
    ) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      fetchAds({ size: 500 }).then(res => {
        console.log('res', res);
        setPosts(res.content);
      });
    }
  }, [isLogged]);

  if (!isLogged) {
    return (
      <form onSubmit={onSubmit} className="mx-auto grid w-60 max-w-screen-lg grid-cols-1 gap-2">
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    );
  }

  return (
    <ul className="items" data-testid="posts">
      {posts.map((post: PostDTO) => (
        <li key={post.id}>
          <Item post={post} edit={true} />
        </li>
      ))}
    </ul>
  );
};

export default Page;
