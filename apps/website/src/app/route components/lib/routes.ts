/// <reference types="@angular/localize" />

import { Type }                 from "@angular/core";
import { DefaultExport, Route } from "@angular/router";
import { description, title }   from "@standard/brand";


export const routes: Route[] = [
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
  {
    data:          {
      description: $localize`:@@PlaylistRoute--Description:A playlist is a list of songs.`,
    },
    loadComponent: (): Promise<Type<unknown> | DefaultExport<Type<unknown>>> => import("./playlist/PlaylistRouteComponent").then<Type<unknown> | DefaultExport<Type<unknown>>>(
      (module: typeof import("./playlist/PlaylistRouteComponent")): Type<unknown> | DefaultExport<Type<unknown>> => module.PlaylistRouteComponent,
    ),
    path:          "playlist",
    pathMatch:     "full",
    title:         $localize`:@@PlaylistRoute--Title:Playlist` + ` - ${title}`,
  },
];
