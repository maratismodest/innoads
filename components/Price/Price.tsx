import React from 'react'

import classes from './Price.module.scss'

const Price = ({price}: Props): JSX.Element =>
    <span className={classes.price}>{price !== 0 ?
        <>{price} <>&#8381;</>
        </> :
        'Цена не указана'}</span>
type Props = {
    price: number
}

export default Price
