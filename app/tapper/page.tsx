import { Metadata } from 'next';

import Tapper from '@/pages-lib/tapper/Tapper';
import { getAllTaps } from '@/prisma/services/taps';
import { routes, seo } from '@/utils/constants';

export const metadata: Metadata = {
  title: seo.tapper.title,
  description: seo.tapper.description,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL + routes.tapper,
  },
};

export default async function TapperPage() {
  return (
    <section className="relative flex h-full flex-1 items-center justify-center gap-4 bg-[#1c1f24]">
      <Tapper />
    </section>
  );
}
