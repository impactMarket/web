import { GeneratedPropsTypes } from '../../Types';
import { Icon } from '../Icon/Icon';
import { colors } from '../../variables/colors';
import { ease, mq, transitions } from 'styled-gen';
import React from 'react';
import styled, { css } from 'styled-components';

const TooltipWrapper = styled.div`
    align-items: flex-start;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    margin-left: 8px;
    position: relative;

    ${mq.tabletLandscape(css`
        justify-content: flex-start;
    `)}
`;

const Tip = styled.div`
    ${transitions('all', 750, ease.outQuart)};

    background-color: #ffffff;
    border-radius: 8px;
    border: 0.0625rem solid ${colors.border};
    box-shadow: 0px 0.25rem 1.5rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    opacity: 0;
    padding: 1.5rem;
    position: absolute;
    top: 100%;
    transform: translate(0, 2rem);
    visibility: hidden;
    width: 12rem;
    z-index: 999;

    ${mq.tabletLandscape(css`
        top: unset;
        transform: translate(2.875rem, -0.625rem);
        width: 20.25rem;
    `)}
`;

const TipIcon = styled.div`
    color: ${colors.brandSecondary};

    &:hover {
        & ~ ${Tip} {
            opacity: 1;
            transform: translate(0, 10px);
            visibility: visible;

            ${mq.tabletLandscape(css`
                transform: translate(26px, -10px);
            `)}
        }
    }
`;

type InfoTooltipProps = {
    children: any;
};

export const InfoTooltip = (props: InfoTooltipProps & GeneratedPropsTypes) => {
    const { children, ...forwardProps } = props;

    return (
        <TooltipWrapper {...forwardProps}>
            <TipIcon>
                <Icon icon="info" sHeight={1} />
            </TipIcon>
            <Tip>{children}</Tip>
        </TooltipWrapper>
    );
};
