import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const languageResources = {
    en: {translation: en},
    fr: {translation: fr}
}

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: languageResources,
        lng: 'en',
        fallbackLng: 'en',
    })

export default i18n;
