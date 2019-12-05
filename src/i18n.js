import { register, init } from 'svelte-i18n'

register('en', () => import('../locales/en.json'))
register('fr', () => import('../locales/fr-CH.json'))
register('de', () => import('../locales/de-CH.json'))

let defaultLocale = 'fr';

if (typeof(window) !== "undefined") {

    const preferredLanguage  = window.navigator.language.substring(0, 2);
    const possibleLanguages = ['en', 'fr', 'de'];
    if (possibleLanguages.includes(preferredLanguage)) {
        defaultLocale = preferredLanguage
    }

    // todo detect parameter language. Can svelte-i18n do that by default?
    // todo store in cookie the language preference?
}

init({
    fallbackLocale: defaultLocale,
    initialLocale: { navigator: true },
})
