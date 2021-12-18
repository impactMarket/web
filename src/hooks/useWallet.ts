import { useContractKit } from '@celo-tools/use-contractkit';
import { useRouter } from 'next/router';

export const useWallet = () => {
    const { address, connect: connectFromHook, destroy } = useContractKit();
    const { asPath, push } = useRouter();

    const connect = async () => {
        try {
            await connectFromHook();

            if (asPath !== '/governance-token') {
                return push('/governance-token');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async () => {
        try {
            await destroy();

            return;
        } catch (error) {
            console.log(error);
        }
    };

    return { address, connect, disconnect };
};
