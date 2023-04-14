import React from 'react'

const Price = ({price}: Props): JSX.Element =>
  <span className='text-xl'>{price !== 0 ? new Intl.NumberFormat('ru-RU', {
    style: 'currency', currency: 'RUB', maximumFractionDigits: 0
  }).format(price) : 'Цена не указана'}</span>

type Props = {
  price: number
}

export default Price
