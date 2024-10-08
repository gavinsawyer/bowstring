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
      "SecurityRouteComponent.sass",
    ],
    templateUrl: "SecurityRouteComponent.html",
  },
)
export class SecurityRouteComponent
  extends RouteComponent {
}
