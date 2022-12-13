import React from 'react'

const Price = ({ price }: Props): JSX.Element =>
    price !== 0 ? (
        <>
            {price} <span>&#8381;</span>
        </>
    ) : (
        <span>Цена не указана</span>
    )
type Props = {
    price: number
}

export default Price