/// <reference types="@angular/localize" />

import { type Type }                                                                             from "@angular/core";
import { type ActivatedRouteSnapshot, Route, type Routes, type UrlMatchResult, type UrlSegment } from "@angular/router";
import { title as brandTitle }                                                                   from "@standard/brand";
import { routes }                                                                                from "../../../../";


const parentRoute: Route | undefined  = routes.find<Route>(
  (route: Route): route is Route => route.path === "shop",
);
const description: string | undefined = parentRoute?.data?.["description"];
const title: string | undefined       = parentRoute?.data?.["title"];

if (!description)
  throw new Error("Missing route description");

if (!title)
  throw new Error("Missing route title");

const shopRoutes: Routes = [
  {
    data:          {
      description,
      title,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeShopChildRouteComponent").then<Type<unknown>>(
      ({ HomeShopChildRouteComponent }: typeof import("./home/HomeShopChildRouteComponent")): Type<unknown> => HomeShopChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Category--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Shop-Category--Meta--Title:Category`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./category/CategoryShopChildRouteComponent").then<Type<unknown>>(
      ({ CategoryShopChildRouteComponent }: typeof import("./category/CategoryShopChildRouteComponent")): Type<unknown> => CategoryShopChildRouteComponent,
    ),
    matcher:       (urlSegments: UrlSegment[]): UrlMatchResult | null => ((path: string): boolean => path === "category")(urlSegments[urlSegments.length - 1].path) && urlSegments.slice(
      0,
      - 1,
    ).every(
      ({ path }: UrlSegment): boolean => path === "category",
    ) ? {
      consumed: urlSegments,
    } : null,
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Item--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Shop-Item--Meta--Title:Item`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./item/ItemShopChildRouteComponent").then<Type<unknown>>(
      ({ ItemShopChildRouteComponent }: typeof import("./item/ItemShopChildRouteComponent")): Type<unknown> => ItemShopChildRouteComponent,
    ),
    matcher:       (urlSegments: UrlSegment[]): UrlMatchResult | null => ((path: string): boolean => path === "item")(urlSegments[urlSegments.length - 1].path) && urlSegments.slice(
      0,
      - 1,
    ).every(
      ({ path }: UrlSegment): boolean => path === "category",
    ) ? {
      consumed: urlSegments,
    } : null,
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
];

export default shopRoutes;
