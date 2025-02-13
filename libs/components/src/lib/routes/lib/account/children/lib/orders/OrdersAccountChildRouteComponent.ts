import { ChangeDetectionStrategy, Component }                         from "@angular/core";
import { MasonryChildDirective }                                      from "@bowstring/directives";
import { HeaderComponent, ImageComponent, MasonryContainerComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                 from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      HeaderComponent,
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
    ],
    styleUrl:        "OrdersAccountChildRouteComponent.sass",
    templateUrl:     "OrdersAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class OrdersAccountChildRouteComponent
  extends AccountChildRouteComponent {
}
