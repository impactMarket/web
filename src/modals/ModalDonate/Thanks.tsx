import { Box, Button } from '@impact-market/ui';
import { Text } from '../../theme/components';
import React from 'react';
import RichText from '../../lib/Prismic/components/RichText';
import { usePrismicData } from 'src/lib/Prismic/components/PrismicDataProvider';
import { useTranslation } from 'src/components/TranslationProvider/TranslationProvider';

export const Thanks = ({
    setDonationType,
    donateValue,
    setDonateValue
}: any) => {
    const { t } = useTranslation();
    const { extractFromModals } = usePrismicData();
    const translations = extractFromModals('donateModal') as any;

    const { thanksHeading, thanksDescription } = translations;
    const { type, value } = donateValue;

    return (
        <Box flex style={{ flexDirection: 'column', gap: '2rem' }}>
            <Box>
                <RichText content={thanksHeading} sFontSize="1.125rem" medium />
                <RichText
                    content={thanksDescription}
                    variables={{
                        value:
                            type === 1
                                ? `$${value}`
                                : type === 2
                                ? `monthly $${value}`
                                : 0
                    }}
                    g500
                    mt={0.5}
                    small
                />
            </Box>

            <Box>
                <Button
                    icon="checkCircle"
                    onClick={() => {
                        setDonationType(0);
                        setDonateValue({ type: 0, value: 0 });
                    }}
                    // @ts-ignore
                    style={{
                        width: '100%'
                    }}
                >
                    <Text semibold>{t('donate-again')}</Text>
                </Button>
            </Box>
        </Box>
    );
};
