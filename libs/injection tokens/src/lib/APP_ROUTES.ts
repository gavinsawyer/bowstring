import { InjectionToken } from "@angular/core";
import { type Routes }    from "@angular/router";


export const APP_ROUTES: InjectionToken<Routes> = new InjectionToken<Routes>("APP_ROUTES");
