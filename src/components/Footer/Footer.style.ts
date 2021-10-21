import { Icon } from '../../theme/components';
import { colors } from '../../theme';
import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

export const FooterLogo = styled(Icon).attrs({ icon: 'im' })`
    color: ${colors.brandPrimary};
    height: 2.75rem;
    width: auto;
`;

type FooterWrapperProps = {
    whiteBackground?: boolean;
    withDonateButton?: boolean;
};

export const FooterWrapper = styled.div<FooterWrapperProps>`
    background-color: ${({ whiteBackground = false }) => (whiteBackground ? colors.white : colors.backgroundLight)};
    margin-top: auto;
    padding: 3.75rem 0 2.625rem;
    width: 100%;

    ${({ withDonateButton }) =>
        mq.desktop(css`
            padding: ${withDonateButton ? '3.75rem 0' : '6.25rem 0'};
        `)};
`;
