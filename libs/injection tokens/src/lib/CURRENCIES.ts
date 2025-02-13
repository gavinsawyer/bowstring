import { InjectionToken }  from "@angular/core";
import { type Currencies } from "@bowstring/types";


export const CURRENCIES: InjectionToken<Currencies> = new InjectionToken<Currencies>("CURRENCIES");
