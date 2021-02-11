import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import * as data from '../res/strings.json'

i18n.translations = data;
i18n.locale = Localization.locale;
i18n.fallbacks = true;
export default i18n;