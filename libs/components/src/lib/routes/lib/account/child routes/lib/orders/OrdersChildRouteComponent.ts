import { Component }                                                                             from "@angular/core";
import { MasonryChildDirective }                                                                 from "@standard/directives";
import { FlexboxContainerComponent, HeaderComponent, ImageComponent, MasonryContainerComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                   from "../../../child route/ChildRouteComponent";


@Component(
  {
    imports: [
      HeaderComponent,
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
      FlexboxContainerComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "OrdersChildRouteComponent.sass",
    ],
    templateUrl: "OrdersChildRouteComponent.html",
  },
)
export class OrdersChildRouteComponent
  extends ChildRouteComponent {
}
