import { Div, TextLink } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { useWallet } from '../../hooks/useWallet';
import Infobox from '../Infobox/Infobox';
import React, { useState } from 'react';

export const CommunitySubmissionWarnings = (props: GeneratedPropsTypes) => {
    const { connect } = useWallet();

    const [status] = useState(null);

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
