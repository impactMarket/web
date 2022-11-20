import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const Content = styled.main`
    display: block;
    padding-top: 9.5rem;
    width: 100%;

    ${mq.upTo(
        'tablet',
        css`
            padding-top: 11.5rem;
        `
    )}
`;
