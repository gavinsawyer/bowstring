import type project from "../../../../project.json";


export type LocaleId =
  | "en-US"
  | keyof typeof project.i18n.locales;
