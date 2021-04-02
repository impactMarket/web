import { GeneratedPropsTypes } from '../../Types';
import { colors } from '../../variables/colors';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const DashboardCard = styled.div<GeneratedPropsTypes>`
    background-color: ${colors.white};
    border-radius: 0.5rem;
    border: 1px solid ${colors.backgroundSecondary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 1.375rem;
    position: relative;

    ${generateProps}
`;
