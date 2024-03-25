import { DatePipe }          from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CapsuleComponent }  from "../../../capsule/CapsuleComponent";
import { CardComponent }     from "../../../card/CardComponent";
import { LinkComponent }     from "../../../link/LinkComponent";
import { RouteComponent }    from "../../../route/RouteComponent";


@Component({
  imports:     [
    CardComponent,
    DatePipe,
    LinkComponent,
    CapsuleComponent,
  ],
  standalone:  true,
  templateUrl: "./PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent extends RouteComponent implements OnInit {}
