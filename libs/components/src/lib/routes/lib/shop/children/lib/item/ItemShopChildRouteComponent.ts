import { CurrencyPipe, DecimalPipe }                                                                                                                                                                                                                           from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, type InputSignal }                                                                                                                                                                                 from "@angular/core";
import { ReactiveFormsModule }                                                                                                                                                                                                                                 from "@angular/forms";
import { MasonryChildDirective }                                                                                                                                                                                                                               from "@bowstring/directives";
import { CURRENCIES }                                                                                                                                                                                                                                          from "@bowstring/injection-tokens";
import { CurrencyService }                                                                                                                                                                                                                                     from "@bowstring/services";
import { type Currencies }                                                                                                                                                                                                                                     from "@bowstring/types";
import { ArticleComponent, AsideComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, MasonryContainerComponent, SectionComponent, SymbolComponent } from "../../../../../../../";
import { ShopChildRouteComponent }                                                                                                                                                                                                                             from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ArticleComponent,
      AsideComponent,
      ButtonComponent,
      CurrencyPipe,
      DecimalPipe,
      DividerComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      LabelComponent,
      LinkComponent,
      MasonryChildDirective,
      MasonryContainerComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
    ],
    styleUrl:        "ItemShopChildRouteComponent.sass",
    templateUrl:     "ItemShopChildRouteComponent.html",

    standalone: true,
  },
)
export class ItemShopChildRouteComponent
  extends ShopChildRouteComponent {

  protected readonly currencies: Currencies           = inject<Currencies>(CURRENCIES);
  protected readonly currencyService: CurrencyService = inject<CurrencyService>(CurrencyService);
  protected readonly itemId$: InputSignal<string>     = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
