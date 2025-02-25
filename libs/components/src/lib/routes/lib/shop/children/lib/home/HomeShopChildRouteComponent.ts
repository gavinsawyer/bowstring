import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule }                        from "@angular/forms";
import { MasonryChildDirective }                      from "@bowstring/directives";
import { StripeProductsService }                      from "@bowstring/services";
import { ImageComponent, MasonryContainerComponent }  from "../../../../../../../";
import { ShopChildRouteComponent }                    from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
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

  protected readonly stripeProductsService: StripeProductsService = inject<StripeProductsService>(StripeProductsService);

}
