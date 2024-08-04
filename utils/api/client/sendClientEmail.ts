import { clientPrisma } from '@/utils/api/createRequest';

export const sendClientEmail = async () => {
  try {
    const { data } = await clientPrisma.post('/send');
    return data;
  } catch (e) {
    console.log('e', e);
  }
};
