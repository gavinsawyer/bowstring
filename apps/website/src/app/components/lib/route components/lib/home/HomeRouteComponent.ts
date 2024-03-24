import { DatePipe }                                        from "@angular/common";
import { Component }                                       from "@angular/core";
import { CapsuleComponent, CardComponent, RouteComponent } from "@standard/components";


@Component({
  imports:     [
    CapsuleComponent,
    CardComponent,
    DatePipe,
  ],
  standalone:  true,
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {

  public readonly now: Date = new Date();

}
