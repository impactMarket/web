import { NextApiRequest, NextApiResponse } from 'next';

const fetch = require('node-fetch');
const testnetMerkleTree = require('../../../_files/testnet-merkletree.json');

const url = (address: string | string[]) => `https://impactmarket-backend-airgrab.herokuapp.com/${address}`;

const merkleTreeHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const { address, testnet }: { address?: string; testnet?: boolean } = req?.query || {};

        if (!!testnet) {
            const file = testnetMerkleTree?.claims?.[address];

            res.status(200).json({ merkleTree: file });
        } else {
            const response = await fetch(url(address));
            const file = await response.json();

            res.status(200).json({ merkleTree: file });
        }
    } catch (error) {
        console.log(error);

        res.status(500);
    }
};

export default merkleTreeHandler;
