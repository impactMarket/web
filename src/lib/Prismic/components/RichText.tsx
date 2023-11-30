import { GeneratedPropsTypes } from '../../../theme/Types';
import { PrismicRichText } from '@prismicio/react';
import { PrismicRichTextType } from '../types';
import {
    RichContentFormat,
    TLink,
    Text,
    TextProps
} from '../../../theme/components';
import { bracked } from '../../../helpers/bracked';
import Image from './Image';
import React from 'react';
import parse from '../../../helpers/parse';
import styled from 'styled-components';
import { colors } from '@impact-market/ui';

type SerializerOptions = {
    components?: { [key: string]: any };
    serializerProps?: { [key: string]: GeneratedPropsTypes | TextProps };
    variables?: { [key: string]: string };
};

type SerializerFunction = (...args: any | any[]) => any;

// eslint-disable-next-line max-params
const serializer: SerializerFunction = ({
    children,
    key,
    node,
    type,
    ...options
}) => {
    const {
        components = {},
        serializerProps = {},
        variables = {}
    } = options || ({} as SerializerOptions);
    const forwardProps = serializerProps?.[type] || {};

    if (type === 'hyperlink') {
        const { url: href, ...otherProps } = node?.data;
        let internalLinkLength: any;

        const internalLinks = [
            'https:///',
            'https://impactmarket.com/',
            'www.impactmarket.com/',
            'https://www.impactmarket.com/'
        ];

        internalLinks.map((isInternalLink) => {
            href.startsWith(isInternalLink) &&
                (internalLinkLength = isInternalLink.length);
        });

        const urlValidator = internalLinks.filter((isInternalLink) => {
            href.startsWith(isInternalLink);
        });

        const isInternal = urlValidator
            ? href.substring(internalLinkLength - 1)
            : href;

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

    if (type.includes('em')) {
        const { text } = node;

        const TextStyled = styled(Text)`
            position: relative;
            display: inline-flex;

            &::before {
                /* Highlight color */
                background-color: ${colors.p600};

                content: '';
                position: absolute;
                width: calc(100% + 4px);
                height: 35%;
                left: -2px;
                bottom: 0;
                z-index: -1;
                transform: rotate(-2deg);
            }
        `;

        return <TextStyled>{text}</TextStyled>;
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
    const {
        components = {},
        content,
        serializerProps,
        variables,
        ...forwardProps
    } = props;

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
                        // @ts-ignore
                        field={content}
                    />
                </RichContentFormat>
            )}
        </Text>
    );
};

export default RichText;
