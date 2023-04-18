import { toast } from '../components/Toaster/Toaster';

export const handleKnownErrors = (error: any, defaultError: any) => {
    const errorMessage = error.toString().toLowerCase();

    if (errorMessage.includes('insufficient funds')) {
        toast.error(
            `You don't have enough balance to complete the transaction. Please fund your wallet with some cUSD to complete the transaction.`
        );
    }

    if (errorMessage.includes('exceeds the configured cap')) {
        toast.error(`Tx fee exceeds the configured cap`);
    }

    toast.error(defaultError);
};
