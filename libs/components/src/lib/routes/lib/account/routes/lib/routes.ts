/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const routes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Messages--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./messages/MessagesRouteComponent").then<Type<unknown>>(
      ({ MessagesRouteComponent }: typeof import("./messages/MessagesRouteComponent")): Type<unknown> => MessagesRouteComponent,
    ),
    path:          "messages",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Messages--Meta--Title:Messages` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Orders--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./orders/OrdersRouteComponent").then<Type<unknown>>(
      ({ OrdersRouteComponent }: typeof import("./orders/OrdersRouteComponent")): Type<unknown> => OrdersRouteComponent,
    ),
    path:          "orders",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Orders--Meta--Title:Orders` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./payment and shipping/PaymentAndShippingRouteComponent").then<Type<unknown>>(
      ({ PaymentAndShippingRouteComponent }: typeof import("./payment and shipping/PaymentAndShippingRouteComponent")): Type<unknown> => PaymentAndShippingRouteComponent,
    ),
    path:          "payment-and-shipping",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Title:Payment and shipping` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./personal information/PersonalInformationRouteComponent").then<Type<unknown>>(
      ({ PersonalInformationRouteComponent }: typeof import("./personal information/PersonalInformationRouteComponent")): Type<unknown> => PersonalInformationRouteComponent,
    ),
    path:          "personal-information",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Title:Personal information` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Security--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./security/SecurityRouteComponent").then<Type<unknown>>(
      ({ SecurityRouteComponent }: typeof import("./security/SecurityRouteComponent")): Type<unknown> => SecurityRouteComponent,
    ),
    path:          "security",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Security--Meta--Title:Security` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    path:       "",
    pathMatch:  "full",
    redirectTo: "orders",
  },
];

export default routes;
