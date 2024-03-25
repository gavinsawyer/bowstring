import { Type }                 from "@angular/core";
import { DefaultExport, Route } from "@angular/router";
import { description, title }   from "@standard/brand";


export const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@LocalesRoute--Description:Standard is available in a number of locales.`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./locales/LocalesRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./locales/LocalesRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.LocalesRouteComponent,
    ),
    path:          "locales",
    pathMatch:     "full",
    title:         title + " | " + $localize`:@@LocalesRoute--Title:Locales`,
  },
  {
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./home/HomeRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./home/HomeRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
    data:          {
      description: description,
    },
  },
];
