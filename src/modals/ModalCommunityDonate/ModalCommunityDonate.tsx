import { Address, QrCode, String } from '../../components';
import { Text } from '../../theme/components';
import { mq } from 'styled-gen';
import { withModal } from '../../HOC';
import React from 'react';
import styled, { css } from 'styled-components';

const ModalWrapper = styled.div`
    padding: 2rem;
    display: flex;
    width: 100%;

    ${mq.phone(css`
        flex-direction: column;
    `)}
`;

const ModalCol = styled.div`
    &:first-of-type {
        width: 100%;

        ${mq.tablet(css`
            padding-right: 1rem;
        `)};
    }

    &:nth-child(2n) {
        margin-top: 2.5rem;

        ${mq.tablet(css`
            margin-left: auto;
            margin-top: unset;
        `)}
    }
`;

type ModalProps = {
    contractAddress?: string;
};

export const Modal = (props: ModalProps) => {
    const { contractAddress } = props;

    return (
        <ModalWrapper>
            <ModalCol>
                <Text small>
                    <String id="modal.donate.scanText" variables={{ currency: 'Celo Dollar ($cUSD)' }} />
                </Text>
                <Address address={contractAddress} />
            </ModalCol>
            <ModalCol>
                <QrCode address={contractAddress} />
            </ModalCol>
        </ModalWrapper>
    );
};

export const ModalCommunityDonate = withModal(Modal, { size: 620 });
