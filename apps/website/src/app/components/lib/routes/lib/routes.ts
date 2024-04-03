import { Type }                 from "@angular/core";
import { DefaultExport, Route } from "@angular/router";
import { description, title }   from "@standard/brand";


export const routes: Route[] = [
  {
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./home/HomeRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./home/HomeRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
    data:          {
      description: description,
    },
  },
];
