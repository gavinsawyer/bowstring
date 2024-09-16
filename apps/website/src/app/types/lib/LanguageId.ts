import { type LocaleId } from "./LocaleId";


export type LanguageId = LocaleId extends `${ infer languageId }-${ never }` ? languageId : never;
