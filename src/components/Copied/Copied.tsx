import { String } from '../String/String';
import { colors, fonts } from '../../theme';
import { ease } from 'styled-gen';
import { size } from 'polished';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const Snack = styled.div`
    animation: ${slideAndFade} 2s ${ease.inOutSine} 1;
    background-color: ${colors.brandPrimary};
    border-radius: 0.25rem;
    bottom: 0;
    color: ${colors.white};
    font-size: 10px;
    font-weight: ${fonts.weights.extrabold};
    letter-spacing: 0.1em;
    opacity: 0;
    padding: 0.25rem;
    position: absolute;
    text-transform: uppercase;
    visibility: visible;
    white-space: nowrap;
`;

const Wrapper = styled.div`
    ${size(0, '100%')};

    display: flex;
    justify-content: flex-end;
    position: relative;
`;

export const Copied = (props: { trigger: number }) => {
    const { trigger } = props;
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (!isShowing && trigger) {
            setIsShowing(true);

            setTimeout(() => {
                setIsShowing(false);
            }, 2000);
        }
    }, [trigger]);

    if (!isShowing) {
        return null;
    }

    return (
        <Wrapper>
            <Snack>
                <String id="copied" />
            </Snack>
        </Wrapper>
    );
};
