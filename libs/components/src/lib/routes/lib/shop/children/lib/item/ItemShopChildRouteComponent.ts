import { ChangeDetectionStrategy, Component, input, type InputSignal }                                                                                                                                                                                         from "@angular/core";
import { ReactiveFormsModule }                                                                                                                                                                                                                                 from "@angular/forms";
import { MasonryChildDirective }                                                                                                                                                                                                                               from "@standard/directives";
import { ArticleComponent, AsideComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, MasonryContainerComponent, SectionComponent, SymbolComponent } from "../../../../../../../";
import { ShopChildRouteComponent }                                                                                                                                                                                                                             from "../../../child/ShopChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:     [
      ArticleComponent,
      AsideComponent,
      ButtonComponent,
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
    styleUrls:   [
      "ItemShopChildRouteComponent.sass",
    ],
    templateUrl: "ItemShopChildRouteComponent.html",

    standalone: true,
  },
)
export class ItemShopChildRouteComponent
  extends ShopChildRouteComponent {

  protected readonly itemId$: InputSignal<string> = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
