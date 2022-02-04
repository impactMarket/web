import * as prismicT from '@prismicio/types';

export type PrismicSlice = {
    items: any[];
    primary: any;
    sliceType: string;
};

export type PrismicDocument = prismicT.PrismicDocument;

export type PrismicImageType = prismicT.ImageField;

export type PrismicRichTextType = prismicT.RichTextField;
