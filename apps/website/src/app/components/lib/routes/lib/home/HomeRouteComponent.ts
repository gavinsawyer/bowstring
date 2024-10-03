import { Component, signal, type WritableSignal }                                                                                                                                                    from "@angular/core";
import { ArticleComponent, AsideComponent, BoxComponent, DividerComponent, FlexboxContainerComponent, HeaderComponent, HeadingGroupComponent, ImageComponent, RouteComponent, ScrollStackComponent } from "@standard/components";
import { ScrollStackItemDirective }                                                                                                                                                                  from "@standard/directives";


@Component(
  {
    imports: [
      ArticleComponent,
      AsideComponent,
      BoxComponent,
      FlexboxContainerComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ImageComponent,
      ScrollStackComponent,
      ScrollStackItemDirective,
      DividerComponent,
    ],
    standalone:  true,
    styleUrls:   [
      "HomeRouteComponent.sass",
    ],
    templateUrl: "HomeRouteComponent.html",
  },
)
export class HomeRouteComponent
  extends RouteComponent {

  protected readonly imageSources$: WritableSignal<string[]> = signal<string[]>(
    [
      "/assets/photos/1.webp",
      "/assets/photos/2.webp",
      "/assets/photos/3.webp",
    ],
  );

}
