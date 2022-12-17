import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PostInterface } from 'interfaces'

export function useLocalStorage(): [PostInterface[], Dispatch<SetStateAction<PostInterface[]>>] {
    const [favourites, setFavourites] = useState<PostInterface[]>([])

    useEffect(() => {
        const lsFavourites = localStorage.getItem('favourites')
        if (lsFavourites) {
            const list = JSON.parse(lsFavourites)
            setFavourites(list)
        } else {
            localStorage.setItem('favourites', JSON.stringify([]))
        }
    }, [favourites])


    return [favourites, setFavourites]
}