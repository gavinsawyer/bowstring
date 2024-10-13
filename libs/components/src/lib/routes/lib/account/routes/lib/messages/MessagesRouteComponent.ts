import { Component }                       from "@angular/core";
import { HeaderComponent, RouteComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      HeaderComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "MessagesRouteComponent.sass",
    ],
    templateUrl: "MessagesRouteComponent.html",
  },
)
export class MessagesRouteComponent
  extends RouteComponent {
}
