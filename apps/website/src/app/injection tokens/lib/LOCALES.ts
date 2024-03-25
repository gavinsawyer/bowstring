import { InjectionToken } from "@angular/core";
import project            from "../../../../project.json";


export const LOCALES: InjectionToken<(keyof typeof project.i18n.locales | "en-US")[]> = new InjectionToken<(keyof typeof project.i18n.locales | "en-US")[]>("LOCALES");
