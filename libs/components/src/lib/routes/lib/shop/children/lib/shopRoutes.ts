/// <reference types="@angular/localize" />

import { isPlatformBrowser }                                                                                           from "@angular/common";
import { inject, PLATFORM_ID, type Type }                                                                              from "@angular/core";
import { collection, type CollectionReference, Firestore, getDocs, query, type QuerySnapshot, where }                  from "@angular/fire/firestore";
import { type ActivatedRouteSnapshot, RedirectCommand, type Route, type Routes, UrlSegment, UrlSegmentGroup, UrlTree } from "@angular/router";
import { title as brandTitle }                                                                                         from "@bowstring/brand";
import { type StripeProductDocument }                                                                                  from "@bowstring/interfaces";
import { routes }                                                                                                      from "../../../../";


const parentRoute: Route | undefined  = routes.find<Route & { path: "shop" }>(
  (route: Route): route is Route & { path: "shop" } => route.path === "shop",
);
const description: string | undefined = parentRoute?.data?.["description"];
const title: string | undefined       = parentRoute?.data?.["title"];

if (!description)
  throw new Error("Missing route description");

if (!title)
  throw new Error("Missing route title");

const shopRoutes: Routes = [
  {
    data:          {
      description,
      title,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeShopChildRouteComponent").then<Type<unknown>>(
      ({ HomeShopChildRouteComponent }: typeof import("./home/HomeShopChildRouteComponent")): Type<unknown> => HomeShopChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Staging--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Shop-Staging--Meta--Title:Staging`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./staging/StagingShopChildRouteComponent").then<Type<unknown>>(
      ({ StagingShopChildRouteComponent }: typeof import("./staging/StagingShopChildRouteComponent")): Type<unknown> => StagingShopChildRouteComponent,
    ),
    path:          "staging",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    canMatch:      [
      async (
        _route: Route,
        urlSegments: UrlSegment[],
      ): Promise<boolean | RedirectCommand> => isPlatformBrowser(inject<NonNullable<unknown>>(PLATFORM_ID)) ? getDocs<StripeProductDocument, StripeProductDocument>(
        query<StripeProductDocument, StripeProductDocument>(
          collection(
            inject<Firestore>(Firestore),
            "stripeProducts",
          ) as CollectionReference<StripeProductDocument, StripeProductDocument>,
          where(
            "path",
            "==",
            urlSegments[urlSegments.length - 1].path,
          ),
        ),
      ).then<boolean, never>(
        (stripeProductDocumentsQuerySnapshot: QuerySnapshot<StripeProductDocument, StripeProductDocument>): boolean => !stripeProductDocumentsQuerySnapshot.empty,
        (error: unknown): never => {
          console.error(error);

          throw error;
        },
      ) : new RedirectCommand(
        new UrlTree(
          new UrlSegmentGroup(
            [
              new UrlSegment(
                "shop",
                {},
              ),
              new UrlSegment(
                "staging",
                {},
              ),
            ],
            {},
          ),
        ),
        {
          skipLocationChange: true,
        },
      ),
    ],
    data:          {
      description: $localize`:@@libs--Components--Routes--Shop-Staging--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Shop-Staging--Meta--Title:Staging`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./product/ProductShopChildRouteComponent").then<Type<unknown>>(
      ({ ProductShopChildRouteComponent }: typeof import("./product/ProductShopChildRouteComponent")): Type<unknown> => ProductShopChildRouteComponent,
    ),
    path:          ":productPath",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
];

export default shopRoutes;
