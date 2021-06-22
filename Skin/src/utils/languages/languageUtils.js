import i18n from 'react-native-i18n';

import en from './en';
import de from './de';
import fr from './fr';
import slovenian from './slovenian';

i18n.translations = {
  en,
  de,
  fr,
  slovenian,
};

i18n.fallbacks = true;

// export default i18n.translate.bind(i18n);
export default i18n;
