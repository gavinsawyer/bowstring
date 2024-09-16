import { InjectionToken } from "@angular/core";
import { type LocaleId }  from "../../types";


export const LOCALE_IDS: InjectionToken<LocaleId[]> = new InjectionToken<LocaleId[]>("LOCALE_IDS");
