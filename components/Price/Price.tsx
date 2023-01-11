import React from 'react'

const Price = ({ price, className }: Props): JSX.Element =>
    <span className={className}>{price !== 0 ?
        <>{price} <>&#8381;</>
        </> :
        'Цена не указана'}</span>
type Props = {
    price: number,
    className?: string
}

export default Price
