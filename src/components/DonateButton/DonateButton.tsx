import { Button, Currency } from '../../theme/components';
import { GeneratedPropsTypes } from '../../theme/Types';
import { String } from '../String/String';
import { modal } from 'react-modal-handler';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React, { useCallback } from 'react';

const currencies = ['btc', 'eth', 'celo'] as const;

export const DonateButton = (props: GeneratedPropsTypes) => {
    const { t } = useTranslation();

    const handleDonateClick = useCallback(() => {
        modal.open('donate', { heading: t('donate'), withCloseButton: true });
    }, []);

    return (
        <Button fluid large lined onClick={handleDonateClick} {...props}>
            <String id="donate" />
            {currencies.map(
                (currency: (typeof currencies)[number], index: number) => (
                    <Currency
                        currency={currency}
                        key={currency}
                        ml={index ? 0.5 : 1}
                    />
                )
            )}
        </Button>
    );
};
