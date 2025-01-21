/// <reference types="@angular/localize" />

import { type Type }   from "@angular/core";
import { type Routes } from "@angular/router";
import { title }       from "@standard/brand";


const children: Routes = [
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./home/HomeAccountChildRouteComponent").then<Type<unknown>>(
      ({ HomeAccountChildRouteComponent }: typeof import("./home/HomeAccountChildRouteComponent")): Type<unknown> => HomeAccountChildRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         `${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` } - ${ title }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Messages--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./messages/MessagesAccountChildRouteComponent").then<Type<unknown>>(
      ({ MessagesAccountChildRouteComponent }: typeof import("./messages/MessagesAccountChildRouteComponent")): Type<unknown> => MessagesAccountChildRouteComponent,
    ),
    path:          "messages",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Messages--Meta--Title:Messages` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Orders--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./orders/OrdersAccountChildRouteComponent").then<Type<unknown>>(
      ({ OrdersAccountChildRouteComponent }: typeof import("./orders/OrdersAccountChildRouteComponent")): Type<unknown> => OrdersAccountChildRouteComponent,
    ),
    path:          "orders",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Orders--Meta--Title:Orders` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./payment and shipping/PaymentAndShippingAccountChildRouteComponent").then<Type<unknown>>(
      ({ PaymentAndShippingAccountChildRouteComponent }: typeof import("./payment and shipping/PaymentAndShippingAccountChildRouteComponent")): Type<unknown> => PaymentAndShippingAccountChildRouteComponent,
    ),
    path:          "payment-and-shipping",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PaymentAndShipping--Meta--Title:Payment and shipping` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./personal information/PersonalInformationAccountChildRouteComponent").then<Type<unknown>>(
      ({ PersonalInformationAccountChildRouteComponent }: typeof import("./personal information/PersonalInformationAccountChildRouteComponent")): Type<unknown> => PersonalInformationAccountChildRouteComponent,
    ),
    path:          "personal-information",
    title:         `${ $localize`:@@libs--Components--Routes--Account-PersonalInformation--Meta--Title:Personal information` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
  {
    data:          {
      description: $localize`:@@libs--Components--Routes--Account-Security--Meta--Description:...`,
    },
    loadComponent: (): Promise<Type<unknown>> => import("./security/SecurityAccountChildRouteComponent").then<Type<unknown>>(
      ({ SecurityAccountChildRouteComponent }: typeof import("./security/SecurityAccountChildRouteComponent")): Type<unknown> => SecurityAccountChildRouteComponent,
    ),
    path:          "security",
    title:         `${ $localize`:@@libs--Components--Routes--Account-Security--Meta--Title:Security` } - ${ title } ${ $localize`:@@libs--Components--Routes--Account--Meta--Title:Account` }`,
  },
];

export default children;
