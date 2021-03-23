import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const Img = styled.img<GeneratedPropsTypes>`
    display: flex;
    height: auto;
    width: 100%;

    ${generateProps}
`;
