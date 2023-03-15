import { GeneratedPropsTypes } from '../../../theme/Types';
import { PrismicRichText } from '@prismicio/react';
import { PrismicRichTextType } from '../types';
import { RichContentFormat, TLink, Text, TextProps } from '../../../theme/components';
import { bracked } from '../../../helpers/bracked';
import Image from './Image';
import React from 'react';
import parse from '../../../helpers/parse';

type SerializerOptions = {
    components?: { [key: string]: any };
    serializerProps?: { [key: string]: GeneratedPropsTypes | TextProps };
    variables?: { [key: string]: string };
};

type SerializerFunction = (...args: any | any[]) => any;

// eslint-disable-next-line max-params
const serializer: SerializerFunction = ({ children, key, node, type, ...options }) => {
    const { components = {}, serializerProps = {}, variables = {} } = options || ({} as SerializerOptions);
    const forwardProps = serializerProps?.[type] || {};

    if (type === 'hyperlink') {
        const { url: href, ...otherProps } = node?.data;

        const isInternal = href.startsWith('https:///') ? href.substring(8) : href;

        const linkProps = { ...otherProps, ...forwardProps, href: isInternal };

        return (
            <TLink key={key} {...linkProps}>
                {children}
            </TLink>
        );
    }

    if (type === 'image') {
        return <Image {...node} />;
    }

    if (type === 'span') {
        const { text } = node;
        const content = bracked(text, variables);

        return parse(content, components);
    }

    return null;
};

type RichTextProps = {
    components?: {
        [key: string]: any;
    };
    content: PrismicRichTextType | string;
    serializerProps?: {
        paragraph?: TextProps;
        hyperlink?: TextProps;
    };
    variables?: {
        [key: string]: any;
    };
} & TextProps;

const RichText = (props: RichTextProps) => {
    const { components = {}, content, serializerProps, variables, ...forwardProps } = props;

    return (
        <Text div {...forwardProps}>
            {typeof content === 'string' ? (
                parse(bracked(content, variables), components)
            ) : (
                <RichContentFormat>
                    <PrismicRichText
                        // eslint-disable-next-line max-params
                        components={(type, node, content, children, key) =>
                            serializer({
                                children,
                                components,
                                content,
                                key,
                                node,
                                serializerProps,
                                type,
                                variables
                            })
                        }
                        field={content}
                    />
                </RichContentFormat>
            )}
        </Text>
    );
};

export default RichText;
