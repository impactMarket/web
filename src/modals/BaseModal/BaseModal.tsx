import { Heading, TLink } from '../../theme/components';
import {
    ModalBackdrop,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper
} from './BaseModal.style';
import { String } from '../../components';
import React, { useEffect } from 'react';
import { Button, CircledIcon, colors, Icon } from '@impact-market/ui';
import styled from 'styled-components';
import useFilters from 'src/hooks/useFilters';

const ModalCloseButton = styled(Button)`
    padding: 0;

    .button-content {
        padding: 0.5rem;
    }
`;

export const LabelStyled = styled.div`
    cursor: pointer;
`;

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
    handleBackButton?: Function;
    heading?: string;
    headingKey?: string;
    size?: number;
    withBackButton?: boolean;
    withCloseButton?: boolean;
    icon?: string;
};

export const BaseModal = (props: ModalComponentProps) => {
    const {
        children,
        controller,
        handleBackButton,
        heading,
        headingKey,
        size = 630,
        withBackButton,
        withCloseButton = true,
        icon
    } = props;

    const { isActive, onClose } = controller;
    const { clear } = useFilters();

    const handleClose = () => {
        onClose();
        clear('modal');
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
                            {icon && !withBackButton && (
                                <CircledIcon icon={icon} medium />
                            )}
                            {withBackButton && (
                                <LabelStyled onClick={handleBackButton}>
                                    <Icon
                                        icon="arrowLeft"
                                        mr={0.5}
                                        sColor={colors.p700}
                                    />
                                    <TLink
                                        sColor={colors.p700}
                                        sFontSize={0.875}
                                        sFontWeight={500}
                                    >
                                        Back
                                    </TLink>
                                </LabelStyled>
                            )}
                            {(!!heading || !!headingKey || !icon) && (
                                <Heading extrabold h3>
                                    {headingKey ? (
                                        <String id={headingKey} />
                                    ) : (
                                        heading
                                    )}
                                </Heading>
                            )}
                            {withCloseButton && (
                                <ModalCloseButton
                                    onClick={handleClose}
                                    bgColor={colors.n01}
                                    gray
                                >
                                    <Icon icon="close" g900 />
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
