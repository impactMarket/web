import { setCookies } from 'cookies-next';
import config from '../../config';

export const registerSignature = (signature: string, message: string) => {
    const expiryDate = new Date(Date.now() + 86400 * 1000 * parseInt(config.signatureExpires, 10));

    setCookies('SIGNATURE', signature, { expires: expiryDate, path: '/' });
    setCookies('MESSAGE', message, { expires: expiryDate, path: '/' });
};
