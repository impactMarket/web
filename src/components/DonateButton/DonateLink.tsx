import { GeneratedPropsTypes } from '../../theme/Types';
import { TextLink } from '../../theme/components';
import { modal } from 'react-modal-handler';
import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React, { useCallback } from 'react';

export const DonateLink = (props: GeneratedPropsTypes) => {
    const { t } = useTranslation();

    const handleDonateClick = useCallback(() => {
        modal.open('donate', { heading: t('donate'), withCloseButton: true });
    }, []);

    return <TextLink onClick={handleDonateClick} {...props} />;
};
