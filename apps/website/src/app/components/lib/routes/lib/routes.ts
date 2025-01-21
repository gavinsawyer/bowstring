/// <reference types="@angular/localize" />

import { type Type }          from "@angular/core";
import { type Routes }        from "@angular/router";
import { description, title } from "@standard/brand";


const routes: Routes = [
  {
    data:          {
      description: description,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeRouteComponent").then<Type<unknown>>(
      ({ HomeRouteComponent }: typeof import("./home/HomeRouteComponent")): Type<unknown> => HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--Design--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./design/DesignRouteComponent").then<Type<unknown>>(
      ({ DesignRouteComponent }: typeof import("./design/DesignRouteComponent")): Type<unknown> => DesignRouteComponent,
    ),
    path:          "design",
    title:         `${ $localize`:@@apps--Website--Components--Routes--Design--Meta--Title:Design` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--Develop--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./develop/DevelopRouteComponent").then<Type<unknown>>(
      ({ DevelopRouteComponent }: typeof import("./develop/DevelopRouteComponent")): Type<unknown> => DevelopRouteComponent,
    ),
    path:          "develop",
    title:         `${ $localize`:@@apps--Website--Components--Routes--Develop--Meta--Title:Develop` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--Components--Routes--News--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./news/NewsRouteComponent").then<Type<unknown>>(
      ({ NewsRouteComponent }: typeof import("./news/NewsRouteComponent")): Type<unknown> => NewsRouteComponent,
    ),
    path:          "news",
    title:         `${ $localize`:@@apps--Website--Components--Routes--News--Meta--Title:News` } - ${ title }`,
  },
];

export default routes;
