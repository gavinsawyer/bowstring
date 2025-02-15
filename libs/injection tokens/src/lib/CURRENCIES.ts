import { InjectionToken }      from "@angular/core";
import type * as currenciesLib from "@bowstring/currencies";


export const CURRENCIES: InjectionToken<typeof currenciesLib> = new InjectionToken<typeof currenciesLib>("CURRENCIES");
