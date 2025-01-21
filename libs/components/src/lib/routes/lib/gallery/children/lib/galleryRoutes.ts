/// <reference types="@angular/localize" />

import { type Type }                                       from "@angular/core";
import { type ActivatedRouteSnapshot, Route, type Routes } from "@angular/router";
import { title as brandTitle }                             from "@standard/brand";
import { routes }                                          from "../../../../";


const parentRoute: Route | undefined  = routes.find<Route>(
  (route: Route): route is Route => route.path === "gallery",
);
const description: string | undefined = parentRoute?.data?.["description"];
const title: string | undefined       = parentRoute?.data?.["title"];

if (!description)
  throw new Error("Missing route description");

if (!title)
  throw new Error("Missing route title");

const galleryRoutes: Routes = [
  {
    data:          {
      description,
      title,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeGalleryChildRouteComponent").then<Type<unknown>>(
      ({ HomeGalleryChildRouteComponent }: typeof import("./home/HomeGalleryChildRouteComponent")): Type<unknown> => HomeGalleryChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Gallery-Item--Meta--Title:Item`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./item/ItemGalleryChildRouteComponent").then<Type<unknown>>(
      ({ ItemGalleryChildRouteComponent }: typeof import("./item/ItemGalleryChildRouteComponent")): Type<unknown> => ItemGalleryChildRouteComponent,
    ),
    path:          ":itemId",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
];

export default galleryRoutes;
