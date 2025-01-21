import { ChangeDetectionStrategy, Component, input, type InputSignal } from "@angular/core";
import { ReactiveFormsModule }                                         from "@angular/forms";
import { HeaderComponent, HeadingGroupComponent, LinkComponent }       from "../../../../../../../";
import { ShopChildRouteComponent }                                     from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      HeaderComponent,
      HeadingGroupComponent,
      LinkComponent,
      ReactiveFormsModule,
    ],
    styleUrls:       [
      "CategoryShopChildRouteComponent.sass",
    ],
    templateUrl:     "CategoryShopChildRouteComponent.html",

    standalone: true,
  },
)
export class CategoryShopChildRouteComponent
  extends ShopChildRouteComponent {

  protected readonly itemId$: InputSignal<string> = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
