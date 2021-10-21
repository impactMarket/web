import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const RichContentFormat = styled.div<GeneratedPropsTypes>`
    p + p {
        margin-top: 1em;
    }

    ${generateProps};
`;
