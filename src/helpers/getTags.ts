export const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p', 'quote'] as const;

type Options = {
    defaultTag?: typeof tags[number] | string;
};

export const getTag = (props?: any, { defaultTag = 'div' }: Options = {}): string =>
    Object.keys(props).reduce((acc: string, prop: string) => (tags.find(tag => tag === prop) ? prop : acc), defaultTag);
