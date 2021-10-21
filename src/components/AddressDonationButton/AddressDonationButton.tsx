import { Button, ButtonProps } from '../../theme/components';
import { modal } from 'react-modal-handler';
import React from 'react';

type AddressDonationButtonProps = {
    address: string;
    currency: string;
    heading: string;
    label?: string;
    footer?: any;
} & ButtonProps;

export const AddressDonationButton = (props: AddressDonationButtonProps) => {
    const { address, currency, children, footer, heading, ...forwardProps } = props;

    const handleButtonClick = () => {
        modal.open('addressDonation', { address, currency, footer, heading, withCloseButton: true });
    };

    return (
        <Button {...forwardProps} onClick={handleButtonClick}>
            {children}
        </Button>
    );
};
