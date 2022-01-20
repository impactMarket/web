'use strict';

const fetch = require('node-fetch');
const fs = require('fs');
const langs = require('../lang-config');
const Prismic = require('@prismicio/client');
const prismicConfiguration = require('../prismicConfiguration');

const { apiEndpoint } = prismicConfiguration;
const { promises: fsPromises } = fs;

require('dotenv').config();

const accessToken = process.env.PRISMIC_KEY;

const fileDir = './i18n';
const filePath = './i18n/translations.json';

const client = Prismic.createClient(apiEndpoint, { fetch, accessToken });
const defaultLang = langs.find(({ isDefault }) => isDefault)?.code?.toLowerCase() || 'en-us';

const parseTranslationObject = object => Object.keys(object)
    .sort().reduce((results, key) => ({ ...results, [key.replace(/\_/g, '.')]: object[key] }), {});

const getTranslationObject = (arr, searchLang) => arr.find(({ lang }) => lang === searchLang)?.data || {};

const getTranslations = async () => {
    try {
        const [translationsResponse, translationsTempResponse] = await Promise.all([
            client.getAllByType('translations', { lang: '*' }),
            client.getAllByType('translations-site-temp', { lang: '*' })
        ])

        const translationsObject = langs.reduce((results, { code }) => {
            const baseTranslations = getTranslationObject(translationsResponse, code.toLowerCase()) || {};
            const tempTranslations = getTranslationObject(translationsTempResponse, code.toLowerCase()) || {};

            const translationsObject = parseTranslationObject({ ...baseTranslations, ...tempTranslations });

            return { ...results, [code.toLowerCase()]: translationsObject }
        }, {});

        const translations = JSON.stringify(translationsObject, null, 4);

        if (!fs.existsSync(fileDir)) {
            await fs.mkdirSync(fileDir);
        };

        await fsPromises.writeFile(filePath, translations, { encoding: 'utf-8', flag: 'w' });

        return console.log('Translations file created!');
    } catch (error) {
        console.log(error);
    }
}

getTranslations();