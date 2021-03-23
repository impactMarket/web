import * as FlexboxGrid from 'react-styled-flexboxgrid';
import { GeneratedPropsTypes } from '../../Types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

export const Col = styled(FlexboxGrid.Col)<GeneratedPropsTypes>`
    ${generateProps};
`;

export const Grid = styled(FlexboxGrid.Grid)<GeneratedPropsTypes>`
    ${generateProps};
`;

export const Row = styled(FlexboxGrid.Row)<GeneratedPropsTypes>`
    ${generateProps};
`;
