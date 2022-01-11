import { useTranslation } from '../TranslationProvider/TranslationProvider';
import React, { FC } from 'react';
import baseParse, { attributesToProps } from 'html-react-parser';

type StringProps = {
    children?: any;
    components?: { [key: string]: FC };
    id: string;
    variables?: { [key: string]: string | number };
};

const parse = (str: string, components: { [key: string]: FC } = {}) => {
    try {
        return baseParse(str, {
            // @ts-ignore
            replace: (domNode: any) => {
                const Component = components?.[domNode?.attribs?.component];

                if (Component) {
                    const attrs = attributesToProps(domNode.attribs);

                    const { children } = domNode;

                    const props = { ...attrs, children: children?.[0]?.data };

                    return <Component {...props} />;
                }
            }
        });
    } catch (error) {
        console.log('Error parsing string: \n', error);

        return '';
    }
};

export const String = (props: StringProps) => {
    const { children, components, id, variables } = props;
    const { t } = useTranslation();
    const str = t(id, variables) || '<span style="color: red; font-weight: 700">No translation!<span>';

    if (typeof children === 'function') {
        return children(parse(str, components));
    }

    return <>{parse(str, components)}</>;
};
