import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

type DashboardCardProps = {
    fluidHeight?: boolean;
};

export const DashboardCard = styled.div<
    DashboardCardProps & GeneratedPropsTypes
>`
    background-color: ${colors.white};
    border: 1px solid ${colors.g200};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: ${({ fluidHeight }) => !fluidHeight && '100%'};
    padding: 1rem;
    position: relative;

    ${generateProps}
`;
