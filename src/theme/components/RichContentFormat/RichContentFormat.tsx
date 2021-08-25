import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const RichContentFormat = styled.div`
    p + p {
        margin-top: 1em;
    }

    ${generateProps};
`;
