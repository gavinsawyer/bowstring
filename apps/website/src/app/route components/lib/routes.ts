/// <reference types="@angular/localize" />

import { type Type }                      from "@angular/core";
import { type DefaultExport, type Route } from "@angular/router";
import { description, title }             from "@standard/brand";


export const routes: Route[] = [
  {
    data:          {
      description: $localize`:@@apps--Website--RouteComponents--DesignRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./design/DesignRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./design/DesignRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.DesignRouteComponent,
    ),
    path:          "design",
    pathMatch:     "full",
    title:         $localize`:@@apps--Website--RouteComponents--DesignRoute--Title:Design` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--RouteComponents--DevelopRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./develop/DevelopRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./develop/DevelopRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.DevelopRouteComponent,
    ),
    path:          "develop",
    pathMatch:     "full",
    title:         $localize`:@@apps--Website--RouteComponents--DevelopRoute--Title:Develop` + ` - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@apps--Website--RouteComponents--NewsRoute--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./news/NewsRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./news/NewsRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.NewsRouteComponent,
    ),
    path:          "news",
    pathMatch:     "full",
    title:         $localize`:@@apps--Website--RouteComponents--NewsRoute--Title:News` + ` - ${ title }`,
  },
  {
    data:          {
      description: description,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./home/HomeRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./home/HomeRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
  },
];
