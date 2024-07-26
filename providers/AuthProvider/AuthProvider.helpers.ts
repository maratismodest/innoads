import * as jose from 'jose';

const decodeToken = async (token: string) => {
  try {
    const decoded: jose.JWTPayload = await jose.decodeJwt(token);
    console.log('decoded', decoded);
    return decoded;
  } catch (error) {
    console.error('decodeToken', error);
  }
};

export { decodeToken };