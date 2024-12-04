/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const childRoutes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./item/ItemChildRouteComponent").then<Type<unknown>>(
      ({ ItemChildRouteComponent }: typeof import("./item/ItemChildRouteComponent")): Type<unknown> => ItemChildRouteComponent,
    ),
    path:          ":itemId",
    title:         `${ $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Title:Item` } - ${ title } ${ $localize`:@@libs--Components--Routes--Gallery--Meta--Title:Gallery` }`,
  },
];

export default childRoutes;
