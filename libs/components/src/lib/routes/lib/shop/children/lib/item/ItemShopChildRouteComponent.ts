import { CurrencyPipe, DecimalPipe }                                                                                                                                                                                                                           from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, type InputSignal }                                                                                                                                                                                 from "@angular/core";
import { ReactiveFormsModule }                                                                                                                                                                                                                                 from "@angular/forms";
import type * as currenciesLib                                                                                                                                                                                                                                 from "@bowstring/currencies";
import { MasonryChildDirective }                                                                                                                                                                                                                               from "@bowstring/directives";
import { CURRENCIES }                                                                                                                                                                                                                                          from "@bowstring/injection-tokens";
import { ExchangeService }                                                                                                                                                                                                                                     from "@bowstring/services";
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

  protected readonly currencies: typeof currenciesLib = inject<typeof currenciesLib>(CURRENCIES);
  protected readonly exchangeService: ExchangeService = inject<ExchangeService>(ExchangeService);
  protected readonly itemId$: InputSignal<string>     = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
