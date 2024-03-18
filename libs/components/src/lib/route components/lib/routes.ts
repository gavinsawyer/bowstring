import { Type }                 from "@angular/core";
import { DefaultExport, Route } from "@angular/router";
import { title }                from "@standard/brand";


export const routes: Route[] = [
  {
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    title:         title + " | Privacy",
    data: {
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, facere.",
    },
  },
  {
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./terms/TermsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./terms/TermsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.TermsRouteComponent,
    ),
    path:          "terms",
    title:         title + " | Terms",
    data: {
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, facere.",
    },
  },
  {
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         title + " | Page not found",
    data: {
      description: "This page was not found.",
    },
  },
];
