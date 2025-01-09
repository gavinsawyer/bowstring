/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const children: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Item--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./item/ItemShopChildRouteComponent").then<Type<unknown>>(
      ({ ItemShopChildRouteComponent }: typeof import("./item/ItemShopChildRouteComponent")): Type<unknown> => ItemShopChildRouteComponent,
    ),
    path:          ":itemId",
    title:         `${ $localize`:@@libs--Components--Routes--Shop-Item--Meta--Title:Item` } - ${ title } ${ $localize`:@@libs--Components--Routes--Shop--Meta--Title:Shop` }`,
  },
];

export default children;
