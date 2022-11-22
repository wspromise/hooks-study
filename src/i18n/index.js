import { createI18n } from 'vue-i18n';

// 默认语言 -
const lang = navigator.language || navigator.browserLanguage;
const localLang = localStorage.getItem('lang');
let default_lang = lang.slice(0, 2) === 'zh' ? 'zh_CN' : 'en_US';
if (localLang) {
  default_lang = localLang;
} else {
  localStorage.setItem('lang', default_lang);
}

/**
 * 获取语言包
 * @param {*} zhMessageKey 中文语言的key
 * @param {*} enMessageKey 英文语言的key
 */
const genMessage = (zhMessageKey = 'zh_CN', enMessageKey = 'en_US') => {
  const files = require.context('./', true, /zh.js|en.js$/);
  // 中文包
  let zhMessage = {};
  // 英文包
  let enMessage = {};
  files.keys().forEach(key => {
    let fileNameSplitArr = key.split('/');
    /** 取出文件内容  */
    // 文件里面用export暴露
    let modules = files(key);
    // 文件里面用export default暴露
    let modulesDefault = modules.default;
    // 语言包
    let message = modulesDefault
      ? { [fileNameSplitArr[1]]: modulesDefault }
      : modules;
    // 区分中英文语言包（zh表示中文，en是英文）
    let locale = fileNameSplitArr[2].replace('.js', '');
    switch (locale) {
      case 'zh':
        zhMessage = { ...zhMessage, ...message };
        break;
      case 'en':
        enMessage = { ...enMessage, ...message };
        break;
    }
  });
  // 语言包
  let messages = {
    [zhMessageKey]: zhMessage,
    [enMessageKey]: enMessage,
  };
  return messages;
};

export const i18n = createI18n({
  legacy: false,
  locale: default_lang,
  messages: genMessage(),
});

export async function setupI18n(app) {
  app.use(i18n);
}
