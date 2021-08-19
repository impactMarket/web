export const formatAddress = (address?: string, limit = 12) =>
    address ? `${address.substring(0, limit)}...${address.substring(address.length - limit)}` : address;
