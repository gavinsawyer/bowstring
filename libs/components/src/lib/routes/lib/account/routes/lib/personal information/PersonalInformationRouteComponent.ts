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
      "PersonalInformationRouteComponent.sass",
    ],
    templateUrl: "PersonalInformationRouteComponent.html",
  },
)
export class PersonalInformationRouteComponent
  extends RouteComponent {
}
