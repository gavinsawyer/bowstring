import { InjectionToken } from "@angular/core";
import { LocaleId }       from "../../types";


export const LOCALE_IDS: InjectionToken<LocaleId[]> = new InjectionToken<LocaleId[]>("LOCALE_IDS");
