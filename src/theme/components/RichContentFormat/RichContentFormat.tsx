import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../..';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const RichContentFormat = styled.div<GeneratedPropsTypes>`
    p + p {
        margin-top: 0.5em;
    }

    a {
        color: ${colors.brandPrimary};
        display: inline;
    }

    ${generateProps};
`;
