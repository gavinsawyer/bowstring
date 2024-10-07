/// <reference types="@angular/localize" />

import { type Type }                      from "@angular/core";
import { type DefaultExport, type Route } from "@angular/router";
import { title }                          from "@standard/brand";


const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./account/AccountRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ AccountRouteComponent }: typeof import("./account/AccountRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => AccountRouteComponent,
    ),
    path:          "account",
    pathMatch:     "full",
    title:         `${ $localize`:@@libs--Components--Routes--Account--MetaTitle:Account` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Privacy--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ PrivacyRouteComponent }: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => PrivacyRouteComponent,
    ),
    path:          "privacy",
    pathMatch:     "full",
    title:         `${ $localize`:@@libs--Components--Routes--Privacy--MetaTitle:Privacy` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Terms--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./terms/TermsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      ({ TermsRouteComponent }: typeof import("./terms/TermsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => TermsRouteComponent,
    ),
    path:          "terms",
    pathMatch:     "full",
    title:         `${ $localize`:@@libs--Components--Routes--Terms--MetaTitle:Terms` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Otherwise--MetaDescription:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         `${ $localize`:@@libs--Components--Routes--Otherwise--MetaTitle:Page not found` } - ${ title }`,
  },
];

export default routes;
