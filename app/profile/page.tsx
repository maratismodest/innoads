import Profile from "@/pages-lib/profile";
import type {Seo} from "@/types";

type Props = {
  seo: Seo
}

export default function ProfilePage<NextPage>() {
  return <Profile/>
}
