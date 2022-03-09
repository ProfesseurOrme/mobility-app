import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from "./locales/fr-translation.json";
import en from "./locales/en-translation.json";

const resources = {
    fr: {
        translation: fr
    },
    en: {
        translation: en
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'en',
        resources,
    })
;

export default i18n;
