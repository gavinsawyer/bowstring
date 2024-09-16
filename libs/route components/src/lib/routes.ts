/// <reference types="@angular/localize" />

import { type Type }                      from "@angular/core";
import { type DefaultExport, type Route } from "@angular/router";
import { title }                          from "@standard/brand";


export const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@libs--RouteComponents--PrivacyRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    pathMatch:     "full",
    title:         $localize`:@@libs--RouteComponents--PrivacyRoute--Title:Privacy` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--RouteComponents--TermsRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./terms/TermsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./terms/TermsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.TermsRouteComponent,
    ),
    path:          "terms",
    pathMatch:     "full",
    title:         $localize`:@@libs--RouteComponents--TermsRoute--Title:Terms` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--RouteComponents--OtherwiseRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         $localize`:@@libs--RouteComponents--OtherwiseRoute--Title:Page not found` + ` - ${ title }`,
  },
];
