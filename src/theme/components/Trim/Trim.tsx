import { Text, TextLink } from '@impact-market/ui';
import { useTranslation } from '../../../components/TranslationProvider/TranslationProvider';
import React, { useState } from 'react';

const Trim = (props: any) => {
    const [showMore, setShowMore] = useState(false);
    const { message, limit, rows, hideSeeMore, ...forwardProps } = props;
    const splitMessage = message.split('\n');
    const { t } = useTranslation();

    if (message.length <= limit && splitMessage.length <= rows) {
        return <Text {...forwardProps}>{message}</Text>;
    }

    return (
        <>
            <Text {...forwardProps} limit={limit} rows={rows}>
                {showMore ? message : `${splitMessage.slice(0, rows).join('\n').substring(0, limit)}...`}
            </Text>
            {!hideSeeMore && (
                <TextLink onClick={() => setShowMore(!showMore)}>
                    {showMore ? t('seeLess') : `${t('seeMore')}...`}
                </TextLink>
            )}
        </>
    );
};

export default Trim;
