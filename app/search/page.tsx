import SearchPage from '@/components/SearchPage';
import Spinner from '@/components/ui/Spinner';
import React, {Suspense} from 'react';

export default function Search() {
  return (
    <Suspense fallback={<Spinner/>}>
      <SearchPage/>
    </Suspense>
  )
}
