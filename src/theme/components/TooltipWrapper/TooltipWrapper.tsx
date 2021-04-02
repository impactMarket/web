import { colors } from '../../variables/colors';
import { rgba } from 'polished';
import styled from 'styled-components';

export const TooltipWrapper = styled.div`
    background-color: ${colors.white};
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 0.5rem ${rgba(colors.textPrimary, 0.16)};
`;
