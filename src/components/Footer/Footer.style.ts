import { Icon } from '../../theme/components';
import { colors } from '../../theme';
import { mq } from 'styled-gen';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

export const FooterLogo = styled(Icon).attrs({ icon: 'im' })`
    color: ${colors.primary};
    height: 2.75rem;
    width: auto;
`;

export const FooterWrapper = styled.div`
    background-color: ${rgba(colors.light, 0.31)};
    margin-top: auto;
    padding: 3.75rem 0 2.625rem;
    width: 100%;

    ${mq.desktop(css`
        padding: 3.75rem 0;
    `)}
`;
