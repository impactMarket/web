import { Heading, Icon } from '../../theme/components';
import {
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper
} from './withModal.style';
import { get } from 'lodash';
import React, { Component } from 'react';

export type ModalComponentProps = {
    controller?: any;
    heading?: string;
    withCloseButton?: boolean;
};

type ModalComponentState = {
    options?: any;
};

export const withModal = (ModalComponent: any, options: any = {}) =>
    class Modal extends Component<ModalComponentProps, ModalComponentState> {
        state = {
            options: {}
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
            const isActive = get(this.props, 'controller.isActive');

            return (
                <ModalWrapper>
                    <ModalBackdrop isActive={isActive} />
                    <ModalContent isActive={isActive}>
                        <ModalInnerContent>
                            {(this.props.heading || this.props.withCloseButton) && (
                                <ModalHeading>
                                    {this.props.heading && (
                                        <Heading extrabold h4>
                                            {this.props.heading}
                                        </Heading>
                                    )}
                                    {this.props.withCloseButton && (
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
