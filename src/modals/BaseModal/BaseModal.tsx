import { Heading, Icon } from '../../theme/components';
import {
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper
} from './BaseModal.style';
import { String } from '../../components';
import React, { useEffect } from 'react';

export type ModalController = {
    animationDuration: number;
    isActive: boolean;
    onClose: Function;
    onOpen: Function;
    onOpenClass: string;
};

type ModalComponentProps = {
    children: any;
    controller: ModalController;
    heading?: string;
    headingKey?: string;
    size?: number;
    withCloseButton?: boolean;
};

export const BaseModal = (props: ModalComponentProps) => {
    const { children, controller, heading, headingKey, size = 630, withCloseButton = true } = props;

    const { isActive, onClose } = controller;

    const handleClose = () => {
        return onClose();
    };

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.keyCode === 27 && withCloseButton) {
                return handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.addEventListener('keydown', handleKeyDown, false);
        };
    }, []);

    return (
        <ModalWrapper>
            <ModalBackdrop isActive={isActive} />
            <ModalContent isActive={isActive} size={size}>
                <ModalInnerContent>
                    {(!!headingKey || !!heading || withCloseButton) && (
                        <ModalHeading>
                            {(!!heading || !!headingKey) && (
                                <Heading extrabold h3>
                                    {headingKey ? <String id={headingKey} /> : heading}
                                </Heading>
                            )}
                            {withCloseButton && (
                                <ModalCloseButton onClick={handleClose}>
                                    <Icon icon="close" sHeight={0.95} />
                                </ModalCloseButton>
                            )}
                        </ModalHeading>
                    )}
                    {children}
                </ModalInnerContent>
            </ModalContent>
        </ModalWrapper>
    );
};
