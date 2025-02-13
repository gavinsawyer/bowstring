/// <reference types="@angular/localize" />

import { type Type }                                       from "@angular/core";
import { type ActivatedRouteSnapshot, Route, type Routes } from "@angular/router";
import { title as brandTitle }                             from "@bowstring/brand";
import { routes }                                          from "../../../../";


const parentRoute: Route | undefined  = routes.find<Route>(
  (route: Route): route is Route => route.path === "account",
);
const description: string | undefined = parentRoute?.data?.["description"];
const title: string | undefined       = parentRoute?.data?.["title"];

if (!description)
  throw new Error("Missing route description");

if (!title)
  throw new Error("Missing route title");

const accountRoutes: Routes = [
  {
    data:          {
      description,
      title,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeAccountChildRouteComponent").then<Type<unknown>>(
      ({ HomeAccountChildRouteComponent }: typeof import("./home/HomeAccountChildRouteComponent")): Type<unknown> => HomeAccountChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    redirectTo:    "messages",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Messages--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-Messages--Meta--Title:Messages`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./messages/MessagesAccountChildRouteComponent").then<Type<unknown>>(
      ({ MessagesAccountChildRouteComponent }: typeof import("./messages/MessagesAccountChildRouteComponent")): Type<unknown> => MessagesAccountChildRouteComponent,
    ),
    path:          "messages",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Orders--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-Orders--Meta--Title:Orders`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./orders/OrdersAccountChildRouteComponent").then<Type<unknown>>(
      ({ OrdersAccountChildRouteComponent }: typeof import("./orders/OrdersAccountChildRouteComponent")): Type<unknown> => OrdersAccountChildRouteComponent,
    ),
    path:          "orders",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Title:Payment and shipping`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./payment and shipping/PaymentAndShippingAccountChildRouteComponent").then<Type<unknown>>(
      ({ PaymentAndShippingAccountChildRouteComponent }: typeof import("./payment and shipping/PaymentAndShippingAccountChildRouteComponent")): Type<unknown> => PaymentAndShippingAccountChildRouteComponent,
    ),
    path:          "payment-and-shipping",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Title:Personal information`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./personal information/PersonalInformationAccountChildRouteComponent").then<Type<unknown>>(
      ({ PersonalInformationAccountChildRouteComponent }: typeof import("./personal information/PersonalInformationAccountChildRouteComponent")): Type<unknown> => PersonalInformationAccountChildRouteComponent,
    ),
    path:          "personal-information",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Security--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-Security--Meta--Title:Security`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./security/SecurityAccountChildRouteComponent").then<Type<unknown>>(
      ({ SecurityAccountChildRouteComponent }: typeof import("./security/SecurityAccountChildRouteComponent")): Type<unknown> => SecurityAccountChildRouteComponent,
    ),
    path:          "security",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-ConnectedApps--Meta--Description:...`,
      title:       $localize`:@@libs--Components--Routes--Account-ConnectedApps--Meta--Title:Connected apps`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./connected apps/ConnectedAppsAccountChildRouteComponent").then<Type<unknown>>(
      ({ ConnectedAppsAccountChildRouteComponent }: typeof import("./connected apps/ConnectedAppsAccountChildRouteComponent")): Type<unknown> => ConnectedAppsAccountChildRouteComponent,
    ),
    path:          "connected-apps",
    title:         ({ data: { title: routeTitle } }: ActivatedRouteSnapshot): string => `${ routeTitle } - ${ brandTitle } ${ title }`,
  },
];

export default accountRoutes;
