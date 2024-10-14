import { Component }                                                                  from "@angular/core";
import { MasonryChildDirective }                                                      from "@standard/directives";
import { HeaderComponent, ImageComponent, MasonryContainerComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
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
