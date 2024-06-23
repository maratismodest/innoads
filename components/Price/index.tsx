'use client';
import { useTranslations } from 'next-intl';
import { getFormattedPrice } from './utils';
import React, { memo } from 'react';

type Props = {
  price: number;
};

function Price({ price }: Props) {
  const t = useTranslations();
  return (
    <span className="text-xl">{price > 0 ? getFormattedPrice(price) : t('Цена не указана')}</span>
  );
}

export default memo(Price);
