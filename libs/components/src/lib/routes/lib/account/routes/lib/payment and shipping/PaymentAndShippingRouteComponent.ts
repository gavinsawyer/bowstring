import { Component }                                                                from "@angular/core";
import { HeaderComponent, HeadingGroupComponent, RouteComponent, SectionComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
      HeadingGroupComponent,
      SectionComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "PaymentAndShippingRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingRouteComponent.html",
  },
)
export class PaymentAndShippingRouteComponent
  extends RouteComponent {
}
