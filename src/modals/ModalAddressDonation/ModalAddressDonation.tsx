import { Address, QrCode, String } from '../../components';
import { Text } from '../../theme/components';
import { colors } from '../../theme';
import { mq } from 'styled-gen';
import { withModal } from '../../HOC';
import React from 'react';
import styled, { css } from 'styled-components';

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

const ModalFooter = styled.div`
    border-top: 1px solid ${colors.borderLight};
    display: flex;
    margin-top: 1.5rem;
    padding-top: 1rem;
`;

const ModalContent = styled.div`
    display: flex;
    width: 100%;

    ${mq.phone(css`
        flex-direction: column;
    `)}
`;

const ModalWrapper = styled.div`
    padding: 2rem;
`;

type ModalProps = {
    address?: string;
    currency?: string;
    footer?: any;
};

export const Modal = (props: ModalProps) => {
    const { address, currency, footer } = props;

    return (
        <ModalWrapper>
            <ModalContent>
                <ModalCol>
                    <Text small>
                        <String id="modal.donate.scanText" variables={{ currency }} />
                    </Text>
                    <Address address={address} />
                </ModalCol>
                <ModalCol>
                    <QrCode address={address} />
                </ModalCol>
            </ModalContent>
            {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalWrapper>
    );
};

export const ModalAddressDonation = withModal(Modal, { size: 620 });
