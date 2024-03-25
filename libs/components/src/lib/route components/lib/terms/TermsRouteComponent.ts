import { DatePipe }          from "@angular/common";
import { Component }         from "@angular/core";
import { CapsuleComponent }  from "../../../capsule/CapsuleComponent";
import { CardComponent }     from "../../../card/CardComponent";
import { RouteComponent }    from "../../../route/RouteComponent";


@Component({
  imports: [
    CardComponent,
    CapsuleComponent,
    DatePipe,
  ],
  standalone:  true,
  templateUrl: "./TermsRouteComponent.html",
})
export class TermsRouteComponent extends RouteComponent { }
