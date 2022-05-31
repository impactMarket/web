import { Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { currencyValue } from '../../../helpers/currencyValue';
import { mq } from 'styled-gen';
import { numericalValue } from '../../../helpers/numericalValue';
import { usePrismicData } from '../../../lib/Prismic/components/PrismicDataProvider';
import { useStaking } from '@impact-market/utils';
import React from 'react';
import styled, { css } from 'styled-components';

const Item = styled.div`
    display: flex;
    flex-direction: column;

    &:not(:last-of-type) {
        border-bottom: 0.75px solid ${colors.backgroundSecondary};
        padding-bottom: 0.75rem;
    }

    & + & {
        margin-top: 1rem;
    }

    ${mq.tablet(css`
        align-items: unset;
        flex-direction: row;
        justify-content: space-between;
    `)}
`;

export const Summary = () => {
    const { staking } = useStaking();
    const { apr, stakedAmount } = staking || {};

    const { extractFromPage } = usePrismicData();

    const { items } = extractFromPage('summary') as { items: { helper: string; label: string }[] };

    const getData = (helper: string) => {
        if (helper === 'apr') {
            return `${numericalValue(apr)}%`;
        }

        if (helper === 'total') {
            return currencyValue(stakedAmount, { isToken: true, symbol: 'PACT' });
        }

        // if (helper === 'earned') {
        //     return currencyValue(earned, { isToken: true, symbol: 'PACT' });
        // }

        return '';
    };

    return (
        <>
            {items.map(({ helper, label }, index) => {
                const data = getData(helper);

                if (!data) {
                    return null;
                }

                return (
                    <Item key={index}>
                        <Text bold>{label}</Text>
                        <Text>{getData(helper)}</Text>
                    </Item>
                );
            })}
        </>
    );
};
