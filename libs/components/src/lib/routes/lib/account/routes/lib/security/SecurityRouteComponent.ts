import { Component }                              from "@angular/core";
import { HeaderComponent, HeadingGroupComponent } from "../../../../../../content";
import { SectionComponent }                       from "../../../../../../layout and organization";
import { RouteComponent }                         from "../../../../../../navigation and search";


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
