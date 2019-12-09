import {register, init} from "svelte-i18n";
import Cookies from "js-cookie";

register("en", () => import("../locales/en.json"));
register("fr", () => import("../locales/fr-CH.json"));
register("de", () => import("../locales/de-CH.json"));

let defaultLocale = "fr";

// business logic to retrieve the default language
if (typeof window !== "undefined") {

  // Define possible languages
  const possibleLanguages = ["en", "fr", "de"];

  // Quickly compute the parameters in the hash tag
  const parameters = location.hash.substr(1)
    .split("&")
    .map(v => v.split("="))
    .reduce((pre, [key, value]) => ({...pre, [key]: value}), {});

  if (typeof (parameters['language']) === 'string'
    && possibleLanguages.includes(parameters['language'])) {
    defaultLocale = parameters['language'];
  } else if (Cookies.get('language')) {
    // see if we have a language cookie
    defaultLocale = Cookies.get('language');
  } else {

    // Try to set the language according to the browser preference.
    const preferredLanguage = window.navigator.language.substring(0, 2);
    if (possibleLanguages.includes(preferredLanguage)) {
      defaultLocale = preferredLanguage;
    }
  }
}

init({
  fallbackLocale: defaultLocale,
  // Use a built-in feature to automatically load the language according to the browser preference.
  // Commented as for now see we implement more logic.
  // initialLocale: {navigator: true}
});
