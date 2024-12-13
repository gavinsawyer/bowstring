/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const routes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account--Meta--Description:...`,
    },
    loadChildren:  (): Promise<Routes> => import("./account/children").then<Routes>(
      ({ children }: typeof import("./account/children")): Routes => children,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./account/AccountRouteComponent").then<Type<unknown>>(
      ({ AccountRouteComponent }: typeof import("./account/AccountRouteComponent")): Type<unknown> => AccountRouteComponent,
    ),
    path:          "account",
    title:         `${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Gallery--Meta--Description:...`,
    },
    loadChildren:  (): Promise<Routes> => import("./gallery/children").then<Routes>(
      ({ children }: typeof import("./gallery/children")): Routes => children,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./gallery/GalleryRouteComponent").then<Type<unknown>>(
      ({ GalleryRouteComponent }: typeof import("./gallery/GalleryRouteComponent")): Type<unknown> => GalleryRouteComponent,
    ),
    path:          "gallery",
    title:         `${ $localize`:@@libs--Components--Routes--Gallery--Meta--Title:Gallery` } - ${ title }`,
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
      description: $localize`:@@libs--Components--Routes--Shop--Meta--Description:...`,
    },
    loadChildren:  (): Promise<Routes> => import("./shop/children").then<Routes>(
      ({ children }: typeof import("./shop/children")): Routes => children,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./shop/ShopRouteComponent").then<Type<unknown>>(
      ({ ShopRouteComponent }: typeof import("./shop/ShopRouteComponent")): Type<unknown> => ShopRouteComponent,
    ),
    path:          "shop",
    title:         `${ $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop` } - ${ title }`,
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
