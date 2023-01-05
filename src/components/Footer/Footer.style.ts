import { Col } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { generateProps, mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const LinksColumn = styled(Col).attrs({
    flex: true,
    md: 9,
    pl: 2,
    xs: 12
})`
    gap: 3rem;
    justify-content: end;
    width: 100%;

    ${mq.upTo(
        'md',
        css`
            flex-wrap: wrap;
            gap: 2.5rem 2rem;
            justify-content: start;
            padding: 0 1rem;
            margin-top: 2rem;
        `
    )}
`;

export const LinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
`;

export const Img = styled.img<GeneratedPropsTypes>`
    ${generateProps};
`;
