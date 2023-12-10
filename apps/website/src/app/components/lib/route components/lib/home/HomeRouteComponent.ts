import { Component }                                       from "@angular/core";
import { CapsuleComponent, CardComponent, RouteComponent } from "@standard/components";


@Component({
  imports:     [
    CapsuleComponent,
    CardComponent,
  ],
  standalone:  true,
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {
}
