/// <reference types="@angular/localize" />

import { type Type }                                from "@angular/core";
import { type ActivatedRouteSnapshot, type Routes } from "@angular/router";
import { title }                                    from "@standard/brand";


const routes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Gallery--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Gallery--Meta--Title:Gallery`,
    },
    loadChildren:  (): Promise<Routes> => import("./gallery/children").then<Routes>(
      ({ galleryRoutes }: typeof import("./gallery/children")): Routes => galleryRoutes,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./gallery/GalleryRouteComponent").then<Type<unknown>>(
      ({ GalleryRouteComponent }: typeof import("./gallery/GalleryRouteComponent")): Type<unknown> => GalleryRouteComponent,
    ),
    path:          "gallery",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop`,
    },
    loadChildren:  (): Promise<Routes> => import("./shop/children").then<Routes>(
      ({ shopRoutes }: typeof import("./shop/children")): Routes => shopRoutes,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./shop/ShopRouteComponent").then<Type<unknown>>(
      ({ ShopRouteComponent }: typeof import("./shop/ShopRouteComponent")): Type<unknown> => ShopRouteComponent,
    ),
    path:          "shop",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account--Meta--Title:Account`,
    },
    loadChildren:  (): Promise<Routes> => import("./account/children").then<Routes>(
      ({ accountRoutes }: typeof import("./account/children")): Routes => accountRoutes,
    ),
    loadComponent: (): Promise<Type<unknown>> => import("./account/AccountRouteComponent").then<Type<unknown>>(
      ({ AccountRouteComponent }: typeof import("./account/AccountRouteComponent")): Type<unknown> => AccountRouteComponent,
    ),
    path:          "account",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Privacy--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Privacy--Meta--Title:Privacy`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./privacy/PrivacyRouteComponent").then<Type<unknown>>(
      ({ PrivacyRouteComponent }: typeof import("./privacy/PrivacyRouteComponent")): Type<unknown> => PrivacyRouteComponent,
    ),
    path:          "privacy",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Terms--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Terms--Meta--Title:Terms`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./terms/TermsRouteComponent").then<Type<unknown>>(
      ({ TermsRouteComponent }: typeof import("./terms/TermsRouteComponent")): Type<unknown> => TermsRouteComponent,
    ),
    path:          "terms",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Otherwise--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Otherwise--Meta--Title:Page not found`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./otherwise/OtherwiseRouteComponent").then<Type<unknown>>(
      ({ OtherwiseRouteComponent }: typeof import("./otherwise/OtherwiseRouteComponent")): Type<unknown> => OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ title }`,
  },
];

export default routes;
