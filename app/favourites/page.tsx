'use client'
import Favourites from "@/pages-lib/favourites";
import type {Seo} from "@/types";

import React from 'react'

type Props = {
  seo: Seo
}

export default function FavouritesPage<NextPage>() {

  return (
    <Favourites/>
  )
}
