import axios from "axios";
import { InitialPostInterface } from 'interfaces'

export const postTelegram = async (formData: InitialPostInterface) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/telegram/post`,
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
export default postTelegram
