import { Button, ButtonProps, Img, Text } from '../../theme/components';
import { modal } from 'react-modal-handler';
import React from 'react';

type CeloDonationButtonProps = {
    address: string;
    heading?: string;
    label: string;
    footer?: any;
} & ButtonProps;

export const CeloDonationButton = (props: CeloDonationButtonProps) => {
    const { address, footer, heading, label, ...forwardProps } = props;

    const handleCeloDonationClick = () => {
        modal.open('celoDonation', { address, footer, heading: heading || label, label, withCloseButton: true });
    };

    return (
        <Button {...forwardProps} onClick={handleCeloDonationClick}>
            <Text medium>{label}</Text>
            <Img inlineFlex ml={0.5} sHeight={1.5} sWidth="auto" src="/img/cusd.png" />
        </Button>
    );
};
