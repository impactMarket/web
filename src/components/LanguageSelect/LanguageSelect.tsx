import { GeneratedPropsTypes } from '../../theme/Types';
import { Icon, Select, Text } from '../../theme/components';
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
    const { asPath, locale, replace } = useRouter();
    const handleLanguageChange = (locale: string) => replace(asPath, undefined, { locale });

    const languageOptions = langConfig.map(({ code: value, label }) => ({ label, value }));

    return (
        <Wrapper {...props}>
            <Select
                anchor="right"
                initialSelected={locale}
                onChange={handleLanguageChange}
                options={languageOptions}
                renderSelected={(label: string) => (
                    <>
                        <Icon icon="world" sHeight={1} sWidth={1} textSecondary />
                        <Text bold manrope ml={0.5} small>
                            {label}
                        </Text>
                    </>
                )}
            />
        </Wrapper>
    );
};

export default LanguageSelect;
