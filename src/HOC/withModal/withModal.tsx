import { Heading, Icon } from '../../theme/components';
import {
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper
} from './withModal.style';
import { String } from '../../components';
import React, { Component } from 'react';

export type ModalComponentProps = {
    controller?: any;
    heading?: string;
    headingKey?: string;
    withCloseButton?: boolean;
};

type ModalComponentState = {
    options?: { [key: string]: any };
};

export const withModal = (ModalComponent: any, options: any = {}) =>
    class Modal extends Component<ModalComponentProps, ModalComponentState> {
        state: { [key: string]: any } = {
            options: {
                size: 630
            }
        };

        componentDidMount() {
            this.setState({ options: { ...this.state.options, ...options } });

            document.addEventListener('keydown', this.handleKeyDown, false);
        }

        componentWillUnmount() {
            document.removeEventListener('keydown', this.handleKeyDown, false);
        }

        handleClose = () => {
            const { onClose } = this.props.controller;

            return onClose();
        };

        handleKeyDown = (event: any) => {
            if (event.keyCode === 27 && this.props.withCloseButton) {
                this.handleClose();
            }
        };

        render() {
            const isActive = this.props?.controller?.isActive;
            const size = this.state?.options?.size;
            const heading = this.props?.heading || this.state?.options?.heading;
            const headingKey = this.props?.headingKey || this.state?.options?.headingKey;
            const withCloseButton = this.props.withCloseButton || this.state?.options?.withCloseButton;

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
                                        <ModalCloseButton onClick={this.handleClose}>
                                            <Icon icon="close" sHeight={0.95} />
                                        </ModalCloseButton>
                                    )}
                                </ModalHeading>
                            )}
                            <ModalComponent {...this.props} />
                        </ModalInnerContent>
                    </ModalContent>
                </ModalWrapper>
            );
        }
    };
