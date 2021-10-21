export const formatAddress = (address?: string, limit: any = 12) => {
    const startLimit = limit ? parseInt(limit[0], 10) || parseInt(limit, 10) || 0 : 0;
    const endLimit = limit ? parseInt(limit[1], 10) || parseInt(limit, 10) || 0 : 0;

    return address ? `${address.substring(0, startLimit)}...${address.substring(address.length - endLimit)}` : address;
};
