import React from 'react'

const Price = ({ price }: Props): JSX.Element => <span className='text-xl'>{price !== 0 ? <>{price} <>&#8381;</>
</> : 'Цена не указана'}</span>

type Props = {
    price: number
}

export default Price
