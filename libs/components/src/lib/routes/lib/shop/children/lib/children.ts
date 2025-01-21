/// <reference types="@angular/localize" />

import { type Type }                               from "@angular/core";
import { type Routes, UrlMatchResult, UrlSegment } from "@angular/router";
import { title }                                   from "@standard/brand";


const children: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeShopChildRouteComponent").then<Type<unknown>>(
      ({ HomeShopChildRouteComponent }: typeof import("./home/HomeShopChildRouteComponent")): Type<unknown> => HomeShopChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         `${ $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Category--Meta--Description:...`,
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
    title:         `${ $localize`:@@libs--Components--Routes--Shop-Category--Meta--Title:Category` } - ${ title } ${ $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Item--Meta--Description:...`,
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
    title:         `${ $localize`:@@libs--Components--Routes--Shop-Item--Meta--Title:Item` } - ${ title } ${ $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop` }`,
  },
];

export default children;
