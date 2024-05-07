/// <reference types="@angular/localize" />

import { Type }                 from "@angular/core";
import { DefaultExport, Route } from "@angular/router";
import { title }                from "@standard/brand";


export const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@PrivacyRoute--Description:Standard’s Privacy Policy describes how Standard collects, uses, and shares your personal data.`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    pathMatch:     "full",
    title:         $localize`:@@PrivacyRoute--Title:Privacy` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@TermsRoute--Description:Terms, etc.`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./terms/TermsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./terms/TermsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.TermsRouteComponent,
    ),
    path:          "terms",
    pathMatch:     "full",
    title:          $localize`:@@TermsRoute--Title:Terms` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@OtherwiseRoute--Description:This page was not found.`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         $localize`:@@OtherwiseRoute--Title:Page not found` + ` - ${ title }`,
  },
];
