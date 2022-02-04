import { Button, ButtonProps } from '../../theme/components';
import { modal } from 'react-modal-handler';
import React from 'react';

type AddressDonationButtonProps = {
    address: string;
    label?: string;
} & ButtonProps;

export const AddressDonationButton = (props: AddressDonationButtonProps) => {
    const { address, children, ...forwardProps } = props;

    const handleButtonClick = () => {
        modal.open('addressDonation', { address });
    };

    return (
        <Button {...forwardProps} onClick={handleButtonClick}>
            {children}
        </Button>
    );
};
