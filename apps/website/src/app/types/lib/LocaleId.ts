import project from "../../../../project.json";


export type LocaleId = keyof typeof project.i18n.locales | "en-US";
