import { ChangeDetectionStrategy, Component }                                   from "@angular/core";
import { ReactiveFormsModule }                                                  from "@angular/forms";
import { MasonryChildDirective }                                                from "@standard/directives";
import { FlexboxContainerComponent, ImageComponent, MasonryContainerComponent } from "../../../../../../../";
import { ShopChildRouteComponent }                                              from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      FlexboxContainerComponent,
      ImageComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
      ReactiveFormsModule,
    ],
    styleUrl:        "HomeShopChildRouteComponent.sass",
    templateUrl:     "HomeShopChildRouteComponent.html",

    standalone: true,
  },
)
export class HomeShopChildRouteComponent
  extends ShopChildRouteComponent {

}
