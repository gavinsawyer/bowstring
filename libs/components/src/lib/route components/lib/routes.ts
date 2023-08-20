import { Route } from "@angular/router";
import { title } from "@standard/brand";


export const routes: Route[] = [
  {
    loadComponent: () => import("./privacy/PrivacyRouteComponent").then(
      (module) => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    title:         title + " | Privacy",
    data: {
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, facere.",
    },
  },
  {
    loadComponent: () => import("./otherwise/OtherwiseRouteComponent").then(
      (module) => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         title + " | Page not found",
    data: {
      description: "This page was not found.",
    },
  },
];
