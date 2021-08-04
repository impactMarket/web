import { Icon } from '../Icon/Icon';
import { colors } from '../../variables/colors';
import { size } from 'polished';
import React from 'react';
import styled from 'styled-components';

const CheckboxBox = styled.div`
    ${size('1.75rem')}

    align-items: center;
    background-color: ${colors.white};
    border-radius: 0.5rem;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    border: 1px solid ${colors.borderLight};
`;

type CheckboxProps = {
    isChecked?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
    const { isChecked } = props;

    return <CheckboxBox>{isChecked && <Icon brandPrimary icon="tick" sWidth={0.875} />}</CheckboxBox>;
};
