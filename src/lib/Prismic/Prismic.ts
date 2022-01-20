import { PrismicDocument } from './types';
import { getLocalizedDocuments } from './helpers/getLocalizedDocuments';
import { predicate } from '@prismicio/client';
import client from './client';
import keysToCamel from './helpers/keysToCamel';
import langConfig from '../../../lang-config';
import snakeToCamel from './helpers/snakeToCamel';
import toArray from './helpers/toArray';

const defaultLang = langConfig.find(({ isDefault }) => isDefault)?.code;

type GetByTypesProps = {
    clientOptions?: object;
    lang?: string;
    types: string | string[];
};

const Prismic = {
    getByTypes: async ({ clientOptions = {}, lang = defaultLang, types }: GetByTypesProps) => {
        try {
            const api = await client(clientOptions);

            const response = await api.dangerouslyGetAll({
                lang: '*',
                predicates: predicate.any('document.type', toArray(types))
            });

            const documents = getLocalizedDocuments(response, lang);

            const collection = keysToCamel(documents).reduce(
                (result: { [key: string]: PrismicDocument | PrismicDocument[] }, document: PrismicDocument) => {
                    const key = snakeToCamel(document.type, 'website_');
                    const entry = result[key];

                    if (entry) {
                        const newEntry = Array.isArray(entry) ? entry : [entry];

                        return { ...result, [key]: [...newEntry, document] };
                    }

                    return { ...result, [key]: document };
                },
                {}
            );

            return collection;
        } catch (error) {
            console.log(error);

            return {};
        }
    }
};

export default Prismic;
