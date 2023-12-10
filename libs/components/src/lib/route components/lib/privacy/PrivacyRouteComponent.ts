import { Component, OnInit } from "@angular/core";
import { CardComponent }     from "../../../card/CardComponent";
import { LinkComponent }     from "../../../link/LinkComponent";
import { RouteComponent }    from "../../../route/RouteComponent";


@Component({
  imports:     [
    CardComponent,
    LinkComponent,
  ],
  standalone:  true,
  templateUrl: "./PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent extends RouteComponent implements OnInit {
}
