import Favourites from "@/pages-lib/favourites";
import {seo} from "@/utils/constants";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = seo.favourites

export default function FavouritesPage<NextPage>() {
  return <Favourites />
}
