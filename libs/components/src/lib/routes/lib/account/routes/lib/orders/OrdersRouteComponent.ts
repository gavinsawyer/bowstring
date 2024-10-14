import { Component }                                                                                                            from "@angular/core";
import { GridContainerComponent, HeaderComponent, ImageComponent, MasonryContainerComponent, RouteComponent, SectionComponent } from "../../../../../../../";


@Component(
  {
    imports: [
      HeaderComponent,
      ImageComponent,
      MasonryContainerComponent,
      SectionComponent,
      GridContainerComponent,
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
