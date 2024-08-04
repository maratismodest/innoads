'use client';
import VirtualListPage from '@/components/VirtualList/VirtualListPage';

const VirtualPage = () => {
  if (process.env.NODE_ENV === 'production') {
    return <div>This page is not available in production.</div>;
  }
  return (
    <>
      <h1>Virtual List Users</h1>
      <VirtualListPage />
    </>
  );
};

export default VirtualPage;
