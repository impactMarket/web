import { Alfajores, CeloMainnet, useContractKit } from '@celo-tools/use-contractkit';
import config from '../../config';

const network = config.isDaoTestnet ? Alfajores : CeloMainnet;

export const useWallet = () => {
    const { address, connect: connectFromHook, destroy, network: walletNetwork } = useContractKit();

    const wrongNetwork = network?.chainId !== walletNetwork?.chainId;

    const connect = async (callback?: Function) => {
        try {
            await connectFromHook();

            if (!!callback) {
                await callback();
            }

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const disconnect = async () => {
        try {
            await destroy();

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    return { address, connect, disconnect, wrongNetwork };
};
