import { Address, QrCode } from '../../components';
import { BaseModal, ModalController } from '../BaseModal/BaseModal';
import { PrismicRichTextType } from '../../lib/Prismic/types';
import { mq } from 'styled-gen';
import { usePrismicData } from '../../lib/Prismic/components/PrismicDataProvider';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';
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

type DataProps = {
    heading?: string;
    text?: PrismicRichTextType;
};

type ModalProps = {
    address?: string;
    controller: ModalController;
};

export const ModalAddressDonation = (props: ModalProps) => {
    const { address, controller } = props;
    const { extractFromModals } = usePrismicData();
    const { heading, text } = extractFromModals('addressDonationModal') as DataProps;

    return (
        <BaseModal controller={controller} heading={heading} size={620}>
            <ModalWrapper>
                <ModalContent>
                    <ModalCol>
                        <RichText content={text} small />
                        <Address address={address} mt={1} />
                    </ModalCol>
                    <ModalCol>
                        <QrCode address={address} />
                    </ModalCol>
                </ModalContent>
            </ModalWrapper>
        </BaseModal>
    );
};
