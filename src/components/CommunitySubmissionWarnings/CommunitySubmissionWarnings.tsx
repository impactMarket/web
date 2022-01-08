import { Div, TextLink } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { useVotingPower } from '@impact-market/utils';
import { useWallet } from '../../hooks/useWallet';
import Infobox from '../Infobox/Infobox';
import React, { useEffect, useState } from 'react';

export const CommunitySubmissionWarnings = (props: GeneratedPropsTypes) => {
    const { address, connect, wrongNetwork } = useWallet();
    const { enoughVotingPowerToPropose: votingPower } = useVotingPower();

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!address) {
            return setStatus('noWallet');
        }

        if (!!address && wrongNetwork) {
            return setStatus('wrongNetwork');
        }

        if (!!address && typeof votingPower === 'boolean' && !votingPower) {
            return setStatus('noVotingPower');
        }

        return setStatus(null);
    }, [address, votingPower, wrongNetwork]);

    if (!status) {
        return null;
    }

    return (
        <Div {...props}>
            {status === 'noWallet' && (
                <Infobox mt={1.5} type="info">
                    <String id="toGenerateProposalYouNeedTo" />{' '}
                    <TextLink brandPrimary onClick={connect}>
                        <String id="connectToYourWallet" />.
                    </TextLink>
                </Infobox>
            )}
            {status === 'wrongNetwork' && (
                <Infobox mt={1.5} type="error">
                    <String id="wrongNetworkDetected" />
                </Infobox>
            )}
            {status === 'noVotingPower' && (
                <Infobox mt={1.5} type="warning">
                    <String id="noVotingPower" />
                </Infobox>
            )}
        </Div>
    );
};
