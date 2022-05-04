import { Div, TextLink } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { hasPACTVotingPower } from '@impact-market/utils';
import { useProvider } from '@celo-tools/use-contractkit';
import { useWallet } from '../../hooks/useWallet';
import Infobox from '../Infobox/Infobox';
import React, { useEffect, useState } from 'react';

export const CommunitySubmissionWarnings = (props: GeneratedPropsTypes) => {
    const { address, connect, wrongNetwork } = useWallet();
    const provider = useProvider();

    const [hasVotingPower, setHasVotingPower] = useState(false);

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (address) {
            hasPACTVotingPower(provider as any, address).then(has => setHasVotingPower(has));
        }
    }, [address, provider]);

    useEffect(() => {
        if (!address) {
            return setStatus('noWallet');
        }

        if (!!address && wrongNetwork) {
            return setStatus('wrongNetwork');
        }

        if (!!address && typeof hasVotingPower === 'boolean' && !hasVotingPower) {
            return setStatus('noVotingPower');
        }

        return setStatus(null);
    }, [address, hasVotingPower, wrongNetwork]);

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
