import { Component, OnInit } from "@angular/core";
import { CardComponent }     from "../../../card/CardComponent";
import { RouteComponent }    from "../../../route/RouteComponent";


@Component({
  standalone:  true,
  templateUrl: "./PrivacyRouteComponent.html",
  imports:     [
    CardComponent,
  ],
})
export class PrivacyRouteComponent extends RouteComponent implements OnInit {
}
