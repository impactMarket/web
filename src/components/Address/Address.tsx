import { Copied } from '../Copied/Copied';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { Text } from '../../theme/components';
import { colors, fonts } from '../../theme';
import { formatAddress } from '../../helpers/formatAddress';
import { generateProps, mq } from 'styled-gen';
import CopyToClipboard from 'react-copy-to-clipboard';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const AddressWrapper = styled.div`
    color: ${colors.brandSecondary};
    background-color: ${colors.backgroundSecondary};
    font-family: ${fonts.families.sourceCodePro};
    font-size: 0.875rem;
    font-weight: ${fonts.weights.medium};
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    text-align: center;

    ${mq.phone(css`
        user-select: none !important;
    `)}

    span:not(.is-ellipsis) {
        display: none;

        ${mq.tablet(css`
            display: inline;
        `)}
    }

    span.is-ellipsis {
        display: inline;

        ${mq.tablet(css`
            display: none;
        `)}
    }
`;

const CopyLink = styled.div`
    cursor: pointer;
    display: inline-block;
    margin-top: 1rem;
    position: relative;
`;

const Wrapper = styled.div`
    ${generateProps};
`;

export const Address = (props: { address: string } & GeneratedPropsTypes) => {
    const { address, ...forwardProps } = props;
    const [copied, setCopied] = useState<any>();

    if (!address) {
        return null;
    }

    return (
        <Wrapper {...forwardProps}>
            <CopyToClipboard onCopy={() => setCopied(Date.now())} text={address}>
                <AddressWrapper>
                    <Copied trigger={copied} />
                    <span className="is-ellipsis">{formatAddress(address)}</span>
                    <span>{address}</span>
                </AddressWrapper>
            </CopyToClipboard>
            <CopyLink>
                <CopyToClipboard onCopy={() => setCopied(Date.now())} text={address}>
                    <Text brandPrimary medium>
                        <String id="copyAddress" />
                    </Text>
                </CopyToClipboard>
            </CopyLink>
        </Wrapper>
    );
};
