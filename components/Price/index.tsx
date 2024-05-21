import { getFormattedPrice } from './utils';
import React from 'react';

type Props = {
  price: number;
};

export default function Price({ price }: Props) {
  return (
    <span className="text-xl">{price !== 0 ? getFormattedPrice(price) : 'Цена не указана'}</span>
  );
}
