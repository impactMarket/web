import { Button, DashboardCard, Div, Text, TextLink } from '../../../theme/components';
import { String } from '../../../components';
import { frequencyToText, toNumber, toToken, useDAO, useVotingPower } from '@impact-market/utils';
import { toast } from '../../../components/Toaster/Toaster';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import { useWallet } from '../../../hooks/useWallet';
import Infobox from '../../../components/Infobox/Infobox';
import React, { useEffect, useState } from 'react';
import config from '../../../../config';

const votingPlatformUrl = config?.votingPlatformUrl;

const ToastMessage = (props: any) => (
    <>
        <String id="proposalNameGenerated" variables={{ name: props?.name }} />{' '}
        <TextLink brandPrimary href={props?.url} target="_blank">
            <String id="viewProposal" />
        </TextLink>
    </>
);

const ProposalBox = (props: any) => {
    const { contract, id, name, proposalId, requestByAddress } = props;
    const { address, connect } = useWallet();
    const { addCommunity } = useDAO();
    const [alreadyProposed, setAlreadyProposed] = useState(!!proposalId);
    const [isLoading, setIsLoading] = useState(false);
    const [votingPower, setVotingPower] = useState('pending');
    const { enoughVotingPowerToPropose } = useVotingPower();
    const { t } = useTranslation();

    useEffect(() => {
        if (typeof enoughVotingPowerToPropose === 'boolean') {
            setVotingPower(enoughVotingPowerToPropose ? 'yes' : 'no');
        }
    }, [enoughVotingPowerToPropose]);

    const handleConnectClick = async () => {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenerateProposalClick = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const data = {
                ...contract,
                decreaseStep: toToken(0.01),
                managers: [requestByAddress],
                maxTranche: toToken(10000, { EXPONENTIAL_AT: 25 }),
                minTranche: toToken(0.1),
                proposalDescription: `${name} |\nclaim amount: ${toNumber(contract.claimAmount)}\nmax claim: ${toNumber(
                    contract.maxClaim
                )}\nbase interval: ${frequencyToText(contract.baseInterval)}\n${config.baseUrl}/communities/${id}`
            };

            const responseId = await addCommunity(data);

            if (responseId) {
                setAlreadyProposed(true);

                toast.success(<ToastMessage name={name} url={votingPlatformUrl} />);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
            toast.error(t('toast.defaultError'));
        }
    };

    return (
        <DashboardCard fluidHeight>
            <Div column pr={2} sWidth="100%">
                <Text center small>
                    <String
                        id="totalClaimAmountPerBeneficiary"
                        variables={{
                            amount: toNumber(contract?.maxClaim),
                            amountPerDay: toNumber(contract?.claimAmount)
                        }}
                    />
                </Text>
                <Text center mt={0.5} small textSecondary>
                    <String
                        id="eachClaimHasMinutesIncrement"
                        variables={{ minutes: (contract?.incrementInterval * 5) / 60 }}
                    />
                </Text>
            </Div>
            {!address && (
                <Infobox mt={1.5} type="info">
                    <String id="toGenerateProposalYouNeedTo" />{' '}
                    <TextLink brandPrimary onClick={handleConnectClick}>
                        <String id="connectToYourWallet" />.
                    </TextLink>
                </Infobox>
            )}
            {votingPower === 'no' && address && (
                <Infobox mt={1.5} type="warning">
                    <String id="noVotingPower" />
                </Infobox>
            )}
            {!alreadyProposed && (
                <Button
                    disabled={votingPower === 'no' || !address}
                    isLoading={isLoading || (votingPower === 'pending' && !!address)}
                    mt={{ sm: 1.5 }}
                    onClick={handleGenerateProposalClick}
                >
                    <Text body manrope>
                        <String id="generateProposal" />
                    </Text>
                </Button>
            )}
        </DashboardCard>
    );
};

export default ProposalBox;
