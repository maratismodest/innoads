import Profile from "@/pages-lib/profile";
import {seo} from "@/utils/constants";
import {Metadata} from "next";

export const metadata: Metadata = {...seo.profile}

export default function ProfilePage<NextPage>() {
  return <Profile/>
}
