import * as enCode from './en/code.json';
import * as viCode from './vi/code.json';
import * as enMsg from './en/msg.json';
import * as viMsg from './vi/msg.json';

const language = {
  en: { ...enCode, ...enMsg },
  vi: { ...viCode, ...viMsg },
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
