import { Text } from '../../../theme/components';
import { colors } from '../../../theme';
import { currencyValue } from '../../../helpers/currencyValue';
import { mq } from 'styled-gen';
import { numericalValue } from '../../../helpers/numericalValue';
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

    ${mq.from(
        'md',
        css`
            align-items: unset;
            flex-direction: row;
            justify-content: space-between;
        `
    )}
`;

const Summary = ({ translations }: any) => {
    const { staking } = useStaking();
    const {
        estimateClaimableRewardByStaking,
        generalAPR,
        stakedAmount,
        totalStaked,
        userAPR
    } = staking || {};

    const { stakingSummaryItems } = translations;

    const getData = (helper: string) => {
        if (helper === 'apr') {
            return `${numericalValue(userAPR)}%`;
        }

        if (helper === 'total') {
            return currencyValue(totalStaked, {
                isToken: true,
                symbol: 'PACT'
            });
        }

        if (helper === 'myTotal') {
            return currencyValue(stakedAmount, {
                isToken: true,
                symbol: 'PACT'
            });
        }

        if (helper === 'generalApr') {
            return `${numericalValue(generalAPR)}%`;
        }

        if (helper === 'estimatedFromStaking') {
            return currencyValue(estimateClaimableRewardByStaking, {
                isToken: true,
                symbol: 'PACT'
            });
        }

        // if (helper === 'earned') {
        //     return currencyValue(earned, { isToken: true, symbol: 'PACT' });
        // }

        return '';
    };

    return (
        <>
            {stakingSummaryItems?.map(
                ({ helper, label }: any, index: React.Key) => {
                    const data = getData(helper);

                    if (!data) {
                        return null;
                    }

                    return (
                        <Item key={index}>
                            <Text sColor={colors.g800} sFontWeight={600}>
                                {label}
                            </Text>
                            <Text sColor={colors.g800}>{getData(helper)}</Text>
                        </Item>
                    );
                }
            )}
        </>
    );
};

export default Summary;
