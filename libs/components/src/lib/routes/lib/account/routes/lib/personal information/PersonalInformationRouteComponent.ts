import { Component }                       from "@angular/core";
import { HeaderComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "PersonalInformationRouteComponent.sass",
    ],
    templateUrl: "PersonalInformationRouteComponent.html",
  },
)
export class PersonalInformationRouteComponent
  extends RouteComponent {
}
