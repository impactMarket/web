import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const Div = styled.div<GeneratedPropsTypes>`
    display: flex;

    ${generateProps}
`;
