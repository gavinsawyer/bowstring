import { Component }                       from "@angular/core";
import { HeaderComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "SecurityRouteComponent.sass",
    ],
    templateUrl: "SecurityRouteComponent.html",
  },
)
export class SecurityRouteComponent
  extends RouteComponent {
}
