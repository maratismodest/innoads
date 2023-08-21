import React from 'react';

type Props = {
  price: number
}

export default function Price({price}: Props) {
  return <span className='text-xl'>{price !== 0 ? new Intl.NumberFormat('ru-RU', {
    style: 'currency', currency: 'RUB', maximumFractionDigits: 0
  }).format(price) : 'Цена не указана'}</span>;
}
