import { registerSignature } from './registerSignature';
import { toast } from '../components/Toaster/Toaster';
import config from '../../config';

export const handleSignature = async (signMessage: any) => {
    try {
        const timestamp = new Date()?.getTime()?.toString();
        const messageToSign = `${config.signatureMessage} ${timestamp}`;

        toast.info('Please go to the wallet to sign the message');
        await signMessage(messageToSign).then((signature: string) => {
            registerSignature(signature, messageToSign);
        });

        return { success: true };
    } catch (error) {
        console.log('Signature', error);

        if (error.toString().includes('eth_sign has been disabled')) {
            toast.error('Sign requests are disabled. You must enable it in the advanced settings on your wallet.');
        }

        throw Error;
    }
};
