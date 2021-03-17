import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

type ButtonProps = GeneratedPropsTypes;

export const Div = styled.div<ButtonProps>`
    display: flex;

    ${generateProps}
`;
