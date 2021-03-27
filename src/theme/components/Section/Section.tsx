import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const Section = styled.section<GeneratedPropsTypes>`
    display: block;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;

    ${generateProps}
`;
