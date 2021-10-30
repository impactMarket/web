'use strict';

const fetch = require('node-fetch');
const langs = require('../lang-config');
const fs = require('fs');

const { promises: fsPromises } = fs;

const langsBaseUrl = 'https://impactmarket.github.io/translations/web/';
const fileDir = './i18n';
const filePath = './i18n/translations.json';

const isLocalDevelopment = process.env.LOCAL_DEVELOPMENT;

const getLang = async lang => {
    if (isLocalDevelopment) {
        try {
            const translationData = await require(`../../translations/web/${lang}.json`);

            return translationData;
        } catch (error) {
            return {};

            console.log(error);
        }
    }

    const url = `${langsBaseUrl}${lang}.json`;

    try {
        const response = await fetch(url);
        const translationData = await response.json();

        return translationData;
    } catch (error) {
        console.log(error)
    }
};

const getAllLangs = async () => Promise.all(
    langs.map(async ({ shortCode }) => {
        const translations = await getLang(shortCode);

        return { key: shortCode, translations };
    })
)

const run = async () => {
    const translationsArr = await getAllLangs();

    const translationsObject = translationsArr.reduce((results, { key, translations }) => ({ ...results, [key]: translations }), {});
    const translations = JSON.stringify(translationsObject, null, 4);

    if (!fs.existsSync(fileDir)) {
        await fs.mkdirSync(fileDir);
    };

    await fsPromises.writeFile(filePath, translations, { encoding: 'utf-8', flag: 'w' });
};

run();
