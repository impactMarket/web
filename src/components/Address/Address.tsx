import { Copied } from '../Copied/Copied';
import { Currency, Text } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { colors, fonts } from '../../theme';
import { formatAddress } from '../../helpers/formatAddress';
import { generateProps, mq } from 'styled-gen';
import { useDeviceSize } from '../../hooks/useDeviceSize';
import CopyToClipboard from 'react-copy-to-clipboard';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const AddressRow = styled.div`
    align-items: center;
    display: flex;
`;

const AddressWrapper = styled.div<any>`
    color: ${colors.brandSecondary};
    background-color: ${colors.backgroundSecondary};
    font-family: ${fonts.families.sourceCodePro};
    font-size: 0.875rem;
    font-weight: ${fonts.weights.medium};
    padding: ${({ small }) => (small ? '0.5rem 1rem' : '1rem')};
    border-radius: 0.5rem;
    text-align: center;
    width: 100%;

    ${mq.phone(css`
        user-select: none !important;
    `)}
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

export const Address = (
    props: {
        address: string;
        renderLabel?: Function;
        currency?: string;
        forceEllipsis?: boolean;
        small?: boolean;
    } & GeneratedPropsTypes
) => {
    const { address, currency, forceEllipsis, renderLabel, small, ...forwardProps } = props;
    const [copied, setCopied] = useState<any>();
    const { sizes, width } = useDeviceSize();

    if (!address) {
        return null;
    }

    return (
        <Wrapper {...forwardProps}>
            <AddressRow>
                {!!currency && <Currency currency={currency} mr={0.5} sHeight={2.375} sWidth={2.375} />}
                <CopyToClipboard onCopy={() => setCopied(Date.now())} text={address}>
                    <AddressWrapper small={small}>
                        <Copied trigger={copied} />
                        {forceEllipsis ? (
                            <span>
                                {formatAddress(address, [width < sizes.sm ? 8 : 12, width < sizes.sm ? 8 : 12])}
                            </span>
                        ) : (
                            <span>{width < sizes.sm ? formatAddress(address) : address}</span>
                        )}
                    </AddressWrapper>
                </CopyToClipboard>
            </AddressRow>
            <CopyLink>
                <CopyToClipboard onCopy={() => setCopied(Date.now())} text={address}>
                    {!!renderLabel ? (
                        renderLabel()
                    ) : (
                        <Text brandPrimary medium>
                            <String id="copyAddress" />
                        </Text>
                    )}
                </CopyToClipboard>
            </CopyLink>
        </Wrapper>
    );
};
