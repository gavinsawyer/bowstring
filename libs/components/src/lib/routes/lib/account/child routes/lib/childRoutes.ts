/// <reference types="@angular/localize" />

import { inject, type Type } from "@angular/core";
import { Auth }              from "@angular/fire/auth";
import { type Routes }       from "@angular/router";
import { title }             from "@standard/brand";


const childRoutes: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Messages--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./messages/MessagesChildRouteComponent").then<Type<unknown>>(
      ({ MessagesChildRouteComponent }: typeof import("./messages/MessagesChildRouteComponent")): Type<unknown> => MessagesChildRouteComponent,
    ),
    path:          "messages",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Messages--Meta--Title:Messages` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Orders--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./orders/OrdersChildRouteComponent").then<Type<unknown>>(
      ({ OrdersChildRouteComponent }: typeof import("./orders/OrdersChildRouteComponent")): Type<unknown> => OrdersChildRouteComponent,
    ),
    path:          "orders",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Orders--Meta--Title:Orders` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./payment and shipping/PaymentAndShippingChildRouteComponent").then<Type<unknown>>(
      ({ PaymentAndShippingChildRouteComponent }: typeof import("./payment and shipping/PaymentAndShippingChildRouteComponent")): Type<unknown> => PaymentAndShippingChildRouteComponent,
    ),
    path:          "payment-and-shipping",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Title:Payment and shipping` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./personal information/PersonalInformationChildRouteComponent").then<Type<unknown>>(
      ({ PersonalInformationChildRouteComponent }: typeof import("./personal information/PersonalInformationChildRouteComponent")): Type<unknown> => PersonalInformationChildRouteComponent,
    ),
    path:          "personal-information",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Title:Personal information` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Security--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./security/SecurityChildRouteComponent").then<Type<unknown>>(
      ({ SecurityChildRouteComponent }: typeof import("./security/SecurityChildRouteComponent")): Type<unknown> => SecurityChildRouteComponent,
    ),
    path:          "security",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Security--Meta--Title:Security` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    path:       "",
    pathMatch:  "full",
    redirectTo: (): string => {
      const auth: Auth = inject<Auth>(Auth);

      return auth.currentUser && !auth.currentUser.isAnonymous ? "messages" : "";
    },
  },
];

export default childRoutes;
