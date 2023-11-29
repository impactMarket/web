/* eslint-disable no-nested-ternary */
import { GeneratedPropsTypes } from '../../theme/Types';
import { Text } from '../../theme/components';
import { colors } from '../../theme';
import { generateProps } from 'styled-gen';
import { lighten } from 'polished';
import React from 'react';
import styled from 'styled-components';

type StepProps = {
    isActive?: boolean;
    isDone?: boolean;
};

const Step = styled.li<StepProps>`
    align-items: center;
    background-color: ${({ isActive, isDone }) =>
        isActive
            ? colors.brandPrimary
            : isDone
            ? lighten(0.3, colors.success)
            : colors.inactive};
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    height: 2rem;
    justify-content: center;
    position: relative;
    width: 2rem;
    z-index: 1;
`;

const Steps = styled.ul`
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 13.75rem;
    position: relative;
    width: 100%;

    &::before {
        background-color: ${colors.inactive};
        content: '';
        height: 1px;
        left: 0;
        position absolute;
        width: 100%;
        z-index: 0;
    }
`;

const StepsWrapper = styled.ul`
    align-items: center;
    display: flex;
    justify-content: center;

    ${generateProps};
`;

type StepsIndicatorProps = {
    activeStep?: number;
    steps: string[];
} & GeneratedPropsTypes;

export const StepsProgress = (props: StepsIndicatorProps) => {
    const { activeStep, steps, ...forwardProps } = props;

    return (
        <StepsWrapper {...forwardProps}>
            <Steps>
                {steps.map((_, index) => (
                    <Step
                        isActive={index === activeStep}
                        isDone={index < activeStep}
                        key={index}
                    >
                        <Text sFontWeight={700} small white>
                            {index + 1}
                        </Text>
                    </Step>
                ))}
            </Steps>
        </StepsWrapper>
    );
};
