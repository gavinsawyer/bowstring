import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShopChildRouteComponent }            from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:        "",

    standalone: true,
  },
)
export class StagingShopChildRouteComponent
  extends ShopChildRouteComponent {

}
