import { Route } from "@angular/router";
import { description, title } from "@standard/brand";


export const routes: Route[] = [
  {
    loadComponent: () => import("./home/HomeRouteComponent").then(
      (module) => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         title,
    data:          {
      description: description,
    },
  },
];
