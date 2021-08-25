import 'react-toastify/dist/ReactToastify.min.css';
import { Icon, Text } from '../../theme/components';
import { IconType } from '../../theme/Types';
import { ToastContainer, toast as toastifyToast } from 'react-toastify';
import { colors } from '../../theme';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const ToastWrapper = styled.div`
    display: flex;
`;

type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

type ColorType = keyof typeof colors;

type ToastTypeOptions = {
    color: ColorType;
    icon?: IconType;
};

const toastType: { [key in TypeOptions]: ToastTypeOptions } = {
    default: { color: 'brandPrimary' },
    error: { color: 'error', icon: 'circleWarning' },
    info: { color: 'brandPrimary', icon: 'circleInfo' },
    success: { color: 'success', icon: 'circleSuccess' },
    warning: { color: 'warning', icon: 'circleWarning' }
};

const Toast = ({ color, children, icon }: { children: any } & ToastTypeOptions) => (
    <ToastWrapper>
        <Icon icon={icon} mr={0.75} sColor={color} sHeight={1.375} />
        <Text div medium small textPrimary>
            {children}
        </Text>
    </ToastWrapper>
);

const types = Object.keys(toastType) as (keyof typeof toastType)[];

export const toast: { [key in TypeOptions]: (content: string | ReactElement) => React.ReactText } = types.reduce(
    (methods: any, type: TypeOptions) => ({
        ...methods,
        [type]: (content: string) => {
            const toastProps = toastType[type];

            return toastifyToast(<Toast {...toastProps}>{content}</Toast>, { type });
        }
    }),
    {}
);

const Toaster = () => <ToastContainer closeButton={false} icon={false} />;

export default Toaster;
