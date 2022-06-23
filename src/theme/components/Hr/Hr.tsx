import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const Hr = styled.div<GeneratedPropsTypes>`
    background-color: ${colors.border};
    display: block;
    height: 1px;
    margin: 0.5rem 0;
    width: 100%;

    ${generateProps};
`;
