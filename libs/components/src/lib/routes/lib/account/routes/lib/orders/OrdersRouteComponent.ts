import { Component }                       from "@angular/core";
import { HeaderComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "OrdersRouteComponent.sass",
    ],
    templateUrl: "OrdersRouteComponent.html",
  },
)
export class OrdersRouteComponent
  extends RouteComponent {
}
