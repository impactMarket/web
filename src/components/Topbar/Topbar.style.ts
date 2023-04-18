import { colors } from '../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const TopbarStyle = styled.div<{ direction?: string }>`
    background-color: ${colors.g700};
    padding: 1rem 0;
    width: 100%;

    ${mq.upTo(
        'tablet',
        css`
            padding: 0.75rem 0;
            height: 56px;
        `
    )}
`;

export const TopbarContent = styled.div`
    align-items: center;
    display: flex;
    gap: 2.5vw;
    justify-content: center;
    margin: auto;
    max-width: 84rem;
    padding: 0 2rem;

    ${mq.upTo(
        'tablet',
        css`
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 0;
        `
    )}
`;

export const TopbarLeft = styled.div`
    color: ${colors.white};
    display: flex;
    flex-wrap: wrap;
    gap: 2.5vw;
    justify-content: center;

    ${mq.upTo(
        'tablet',
        css`
            gap: 1rem;
            display: none;
        `
    )}
`;

export const TopbarColumn = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;

    .buy {
        border-radius: 0.25rem;
        margin-left: 0.2rem;

        span {
            padding: 0;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.2rem 0;
            line-height: inherit;
        }
    }
`;

export const TopbarWallet = styled.div`
    align-items: center;
    display: flex;
    height: 2rem;

    ${mq.upTo(
        'tablet',
        css`
            width: 100%;
        `
    )}
`;
