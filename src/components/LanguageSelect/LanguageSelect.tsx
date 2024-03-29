import { GeneratedPropsTypes } from '../../theme/Types';
import { Select, Text } from '../../theme/components';
import { colors } from '../../theme';
import { generateProps } from 'styled-gen';
import { useRouter } from 'next/router';
import React from 'react';
import langConfig from '../../../lang-config';
import styled, { css } from 'styled-components';

type LanguageSelectProps = {
    withSeparator?: boolean;
} & GeneratedPropsTypes;

const Wrapper = styled.div<LanguageSelectProps>`
    display: flex;
    align-items: center;

    ${({ withSeparator }) =>
        withSeparator &&
        css`
            border-left: 1px solid ${colors.brandSecondaryLight};
            padding-left: 1rem;
        `}

    ${generateProps};
`;
const LanguageSelect = (props: LanguageSelectProps) => {
    const { asPath, locale } = useRouter();
    const router = useRouter();
    const handleLanguageChange = (locale: string) => {
        router.replace(asPath, undefined, { locale }).catch((e) => {
            if (!e.cancelled) {
                throw e;
            }
        });
    };

    const languageOptions = langConfig.map(({ code: value, label }) => ({
        label,
        value
    }));

    return (
        <Wrapper {...props}>
            <Select
                anchor="right"
                initialSelected={locale}
                onChange={handleLanguageChange}
                options={languageOptions}
                renderSelected={(label: string) => <Text g500>{label}</Text>}
            />
        </Wrapper>
    );
};

export default LanguageSelect;
