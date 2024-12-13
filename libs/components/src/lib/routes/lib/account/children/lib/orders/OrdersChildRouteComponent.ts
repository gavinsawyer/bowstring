import { ChangeDetectionStrategy, Component }                         from "@angular/core";
import { MasonryChildDirective }                                      from "@standard/directives";
import { HeaderComponent, ImageComponent, MasonryContainerComponent } from "../../../../../../../";
import { ChildRouteComponent }                                        from "../../../child/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      HeaderComponent,
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
    ],
    styleUrls:       [
      "OrdersChildRouteComponent.sass",
    ],
    templateUrl:     "OrdersChildRouteComponent.html",

    standalone: true,
  },
)
export class OrdersChildRouteComponent
  extends ChildRouteComponent {
}
