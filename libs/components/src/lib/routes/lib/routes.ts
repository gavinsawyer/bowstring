/// <reference types="@angular/localize" />

import { type Type }                      from "@angular/core";
import { type DefaultExport, type Route } from "@angular/router";
import { title }                          from "@standard/brand";


const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Privacy--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    pathMatch:     "full",
    title:         $localize`:@@libs--Components--Routes--Privacy--Title:Privacy` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Terms--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./terms/TermsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./terms/TermsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.TermsRouteComponent,
    ),
    path:          "terms",
    pathMatch:     "full",
    title:         $localize`:@@libs--Components--Routes--Terms--Title:Terms` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Otherwise--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         $localize`:@@libs--Components--Routes--Otherwise--Title:Page not found` + ` - ${ title }`,
  },
];

export default routes;
