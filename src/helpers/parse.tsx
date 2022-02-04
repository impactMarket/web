import React from 'react';
import baseParse, { attributesToProps } from 'html-react-parser';

const parse = (str?: string, components: any = {}) =>
    baseParse(str, {
        replace: (domNode: any) => {
            const Component = components?.[domNode?.attribs?.component];

            if (Component) {
                const attrs = attributesToProps(domNode.attribs);
                const parsedAttrs = Object.entries(attrs).reduce((result, [key, value]) => {
                    if (value === '' || value === 'true' || (typeof value === 'boolean' && !!value)) {
                        return {
                            ...result,
                            [key]: true
                        };
                    }

                    return {
                        ...result,
                        [key]: value
                    };
                }, {});

                const children = domNode?.children?.[0]?.data;

                const forwardProps = { ...parsedAttrs, children };

                return <Component {...forwardProps} />;
            }

            return domNode;
        }
    });

export default parse;
