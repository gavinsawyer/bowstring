import { Component, OnInit } from "@angular/core";
import { CapsuleComponent }  from "@standard/components";
import { CardComponent }     from "../../../card/CardComponent";
import { RouteComponent }    from "../../../route/RouteComponent";


@Component({
  imports: [
    CardComponent,
    CapsuleComponent,
  ],
  standalone:  true,
  templateUrl: "./TermsRouteComponent.html",
})
export class TermsRouteComponent extends RouteComponent implements OnInit {
}
