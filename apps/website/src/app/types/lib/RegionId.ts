import { LocaleId } from "./LocaleId";


export type RegionId = LocaleId extends `${ never }-${ infer regionId }` ? regionId : never;
