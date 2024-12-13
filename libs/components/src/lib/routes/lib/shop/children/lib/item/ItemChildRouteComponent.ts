import { ChangeDetectionStrategy, Component, input, type InputSignal }                                                                                                                                                                                         from "@angular/core";
import { ReactiveFormsModule }                                                                                                                                                                                                                                 from "@angular/forms";
import { MasonryChildDirective }                                                                                                                                                                                                                               from "@standard/directives";
import { ArticleComponent, AsideComponent, ButtonComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, LabelComponent, LinkComponent, MasonryContainerComponent, SectionComponent, SymbolComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                                                                                                                 from "../../../child/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
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
    styleUrls:       [
      "ItemChildRouteComponent.sass",
    ],
    templateUrl:     "ItemChildRouteComponent.html",

    standalone: true,
  },
)
export class ItemChildRouteComponent
  extends ChildRouteComponent {

  protected readonly itemId$: InputSignal<string> = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
