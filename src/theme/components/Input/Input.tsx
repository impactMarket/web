import { colors } from '../../variables/colors';
import { fonts } from '../../variables/fonts';
import styled from 'styled-components';

export const Input = styled.input`
    background-color: ${colors.white};
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: ${colors.body};
    font-family: ${fonts.families.inter};
    font-size: 16px;
    height: 42px;
    outline: 0;
    padding: 0 8px;
    width: 100%;

    &:focus {
        border: 1px solid rgba(0, 0, 0, 0.3);
    }

    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.textSecondary};
    }
`;
