import * as enCode from './en/code.json';
import * as viCode from './vi/code.json';

const language = {
  en: enCode,
  vi: viCode,
};

export default function langTransformer({
  query = '',
  lang = 'vi',
}: {
  query: string;
  lang: string;
}) {
  try {
    const currentLang = language[lang.toLocaleLowerCase()];
    let current = null;
    const q = query.split('.');
    q.forEach((e) => {
      if (current) {
        current = current[e];
      } else {
        current = currentLang[e];
      }
    });
    return current;
  } catch (_) {
    return query;
  }
}
