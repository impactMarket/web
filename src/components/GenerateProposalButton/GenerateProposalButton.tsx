import { Button, RichContentFormat, Text } from '../../theme/components';
import { CommunityContractAttributes } from '../../apis/types';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { frequencyToText, toNumber, toToken, useDAO, useVotingPower } from '@impact-market/utils';
import { toast } from '../Toaster/Toaster';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import { useWallet } from '../../hooks/useWallet';
import React, { useEffect, useState } from 'react';
import config from '../../../config';

const votingPlatformUrl = config?.votingPlatformUrl;
const getVotingPlatformUrl = (id: any) => {
    try {
        const convertedId = Number(+id)
            .toString(16)
            .padStart(4, '0x0');

        return votingPlatformUrl.replace(':id', convertedId);
    } catch (error) {
        console.log(error);

        return votingPlatformUrl.replace(':id', '');
    }
};

const ToastMessage = (props: any) => (
    <RichContentFormat>
        <String id="toast.generateProposalSuccess" variables={{ proposalUrl: props?.url }} />
    </RichContentFormat>
);

type GenerateProposalButtonType = {
    contract?: CommunityContractAttributes;
    proposalId?: string | number;
    requestByAddress: string;
} & GeneratedPropsTypes;

export const GenerateProposalButton = (props: GenerateProposalButtonType) => {
    const { address, wrongNetwork } = useWallet();
    const { contract, proposalId, requestByAddress, ...forwardProps } = props;
    const { addCommunity } = useDAO();
    const { enoughVotingPowerToPropose } = useVotingPower();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [votingPower, setVotingPower] = useState('pending');

    useEffect(() => {
        if (typeof enoughVotingPowerToPropose === 'boolean') {
            setVotingPower(enoughVotingPowerToPropose ? 'yes' : 'no');
        }
    }, [enoughVotingPowerToPropose]);

    const handleClick = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const { baseInterval, claimAmount, communityId, incrementInterval, maxClaim } = contract;

            const data = {
                baseInterval,
                claimAmount,
                decreaseStep: toToken(0.01),
                incrementInterval,
                managers: [requestByAddress],
                maxClaim,
                maxTranche: toToken(10000, { EXPONENTIAL_AT: 25 }),
                minTranche: toToken(0.1),
                proposalDescription: `${name} |\nclaim amount: ${toNumber(claimAmount)}\nmax claim: ${toNumber(
                    maxClaim
                )}\nbase interval: ${frequencyToText(contract.baseInterval)}\n${
                    config.baseUrl
                }/communities/${communityId}`
            };

            const responseId = await addCommunity(data);

            if (responseId) {
                return toast.success(<ToastMessage url={getVotingPlatformUrl(responseId)} />);
            }

            toast.error(t('toast.generateProposalError'));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
            toast.error(t('toast.generateProposalError'));
        }
    };

    if (proposalId) {
        return (
            <RichContentFormat {...forwardProps}>
                <Text body>
                    <String id="proposalAlreadySubmitted" variables={{ url: getVotingPlatformUrl(proposalId) }} />
                </Text>
            </RichContentFormat>
        );
    }

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
