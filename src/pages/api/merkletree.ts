const fetch = require('node-fetch');
const testnetMerkleTree = require('../../../_files/testnet-merkletree.json');

const url = 'https://impactmarket-backend-airgrab.herokuapp.com/';

const merkleTreeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { testnet } = req?.query || {};

        if (!!testnet) {
            res.status(200).json({ merkleTree: testnetMerkleTree });
        } else {
            const response = await fetch(url);
            const file = await response.json();

            console.log(response);

            res.status(200).json({ merkleTree: file }).end();
        }
    } catch (error) {
        console.log(error);

        res.status(500).end();
    }
};

export default merkleTreeHandler;
