import { Component, input, type InputSignal, signal, type WritableSignal }                                                                                               from "@angular/core";
import { ReactiveFormsModule }                                                                                                                                           from "@angular/forms";
import { ScrollStackItemDirective }                                                                                                                                      from "@standard/directives";
import { ArticleComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, ScrollStackComponent, SectionComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                           from "../../../child route/ChildRouteComponent";


@Component(
  {
    imports: [
      ArticleComponent,
      DividerComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ReactiveFormsModule,
      ScrollStackComponent,
      ScrollStackItemDirective,
      SectionComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "ItemChildRouteComponent.sass",
    ],
    templateUrl: "ItemChildRouteComponent.html",
  },
)
export class ItemChildRouteComponent
  extends ChildRouteComponent {

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.webp",
      "/assets/photos/2.webp",
      "/assets/photos/3.webp",
    ],
  );
  protected readonly itemId$: InputSignal<string>            = input.required<string>(
    {
      alias: "itemId",
    },
  );

}
