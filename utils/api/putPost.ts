import axios from "axios";
import {PostInterface} from "interfaces";

export const putPost = async (formData: PostInterface) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${formData.id}`,
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (e) {
    console.log('e', e)
  }
}
export default putPost
