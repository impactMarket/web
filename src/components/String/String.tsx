import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React from 'react';
import parse from 'html-react-parser';

type StringProps = {
    children?: any;
    id: string;
    variables?: { [key: string]: string | number };
};

export const String = (props: StringProps) => {
    const { children, id, variables } = props;
    const { t } = useTranslation();

    if (typeof children === 'function') {
        return children(parse(t(id, variables)));
    }

    return <>{parse(t(id, variables))}</>;
};
