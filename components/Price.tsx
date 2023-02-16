import React from 'react'

const Price = ({ price }: Props): JSX.Element => <h2>{price !== 0 ? <>{price} <>&#8381;</>
</> : 'Цена не указана'}</h2>

type Props = {
    price: number
}

export default Price
