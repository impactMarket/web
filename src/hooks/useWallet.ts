import { useContractKit } from '@celo-tools/use-contractkit';

export const useWallet = () => {
    const { address, connect: connectFromHook, destroy } = useContractKit();

    const connect = async () => {
        try {
            await connectFromHook();
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async () => await destroy().catch(error => console.log(error));

    return { address, connect, disconnect };
};
