import type { User } from '@prisma/client';
import { Person, WithContext } from 'schema-dts';

import { tgLink } from '@/utils/constants';

export const getPersonJsonLd = (user: User): WithContext<Person> => ({
  ['@context']: 'https://schema.org',
  '@type': 'Person',
  '@id': tgLink + '/' + user.username,
});