import { Button, Text } from '../../theme/components';
import { CommunityContractAttributes } from '../../apis/types';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { hasPACTVotingPower } from '@impact-market/utils';
import { useProvider } from '@celo/react-celo';
import { useWallet } from '../../hooks/useWallet';
import React, { useEffect, useState } from 'react';

type GenerateProposalButtonType = {
    contract?: CommunityContractAttributes;
    description?: string;
    onSuccess?: Function;
    proposalId?: string | number;
    requestByAddress: string;
} & GeneratedPropsTypes;

export const GenerateProposalButton = (props: GenerateProposalButtonType) => {
    const { address, wrongNetwork } = useWallet();
    const { contract, description, onSuccess, requestByAddress, ...forwardProps } = props;

    const provider = useProvider();

    const [isLoading] = useState(false);
    const [hasVotingPower, setHasVotingPower] = useState(false);
    const [votingPower, setVotingPower] = useState('pending');

    useEffect(() => {
        if (typeof hasVotingPower === 'boolean') {
            setVotingPower(hasVotingPower ? 'yes' : 'no');
        }
    }, [hasVotingPower]);

    useEffect(() => {
        if (address) {
            hasPACTVotingPower(provider as any, address).then(has => setHasVotingPower(has));
        }
    }, [address, provider]);

    const handleClick = async () => {
        // no functionality!
    };

    // TODO: validate if should hide the button
    // if (proposalId) {
    //     return (
    //         <RichContentFormat {...forwardProps}>
    //             <Text body>
    //                 <String id="proposalAlreadySubmitted" variables={{ url: getVotingPlatformUrl(proposalId) }} />
    //             </Text>
    //         </RichContentFormat>
    //     );
    // }

    return (
        <Button
            {...forwardProps}
            disabled={votingPower === 'no' || !address || wrongNetwork}
            isLoading={isLoading}
            onClick={handleClick}
        >
            <Text body manrope>
                <String id="generateProposal" />
            </Text>
        </Button>
    );
};
