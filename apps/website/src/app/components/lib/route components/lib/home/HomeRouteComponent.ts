import { Component }                                       from "@angular/core";
import { RouterLink, RouterLinkActive }                    from "@angular/router";
import { CapsuleComponent, CardComponent, RouteComponent } from "@standard/components";


@Component({
  imports:     [
    CapsuleComponent,
    CardComponent,
    RouterLink,
    RouterLinkActive,
  ],
  standalone:  true,
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {
}
