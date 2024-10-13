/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const routes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account--Meta--Description:...`,
    },
    loadChildren:  (): Promise<Routes> => import("./account/routes").then<Routes>(
      ({ routes: accountRoutes }: typeof import("./account/routes")): Routes => accountRoutes,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./account/AccountRouteComponent").then<Type<unknown>>(
      ({ AccountRouteComponent }: typeof import("./account/AccountRouteComponent")): Type<unknown> => AccountRouteComponent,
    ),
    path:          "account",
    title:         `${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Privacy--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown>>(
      ({ PrivacyRouteComponent }: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> => PrivacyRouteComponent,
    ),
    path:          "privacy",
    title:         `${ $localize`:@@libs--Components--Routes--Privacy--Meta--Title:Privacy` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Terms--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./terms/TermsRouteComponent").then<Type<unknown>>(
      ({ TermsRouteComponent }: typeof import("./terms/TermsRouteComponent")): Type<unknown> => TermsRouteComponent,
    ),
    path:          "terms",
    title:         `${ $localize`:@@libs--Components--Routes--Terms--Meta--Title:Terms` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Otherwise--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown>>(
      ({ OtherwiseRouteComponent }: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> => OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         `${ $localize`:@@libs--Components--Routes--Otherwise--Meta--Title:Page not found` } - ${ title }`,
  },
];

export default routes;
