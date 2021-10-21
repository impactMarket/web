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
    const str = t(id, variables) || '<span style="color: red; font-weight: 700">No translation!<span>';

    if (typeof children === 'function') {
        return children(parse(str));
    }

    return <>{parse(str)}</>;
};
